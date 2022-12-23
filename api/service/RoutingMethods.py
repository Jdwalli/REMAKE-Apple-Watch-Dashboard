import os
import json
import pandas as pd
from flask import Response, request, jsonify
from zipfile import ZipFile
from tools.ExportParser import Export
from config.Healthkit import *
from config.Settings import *
from service.Analysis import determine_trends
from service.Helper import round_value, remove_tag
from service.Workout import *
from flask_caching import Cache
cache = Cache()

DATA_FILE = os.path.join(os.getcwd(), "data")


def create_data_files():
    if not os.path.isdir(DATA_FILE):
        os.mkdir(DATA_FILE)
        directories = ["Record", "Workouts", 'ECG']
        for directory in directories:
            path = os.path.join(os.getcwd(), "data", directory)
            if not os.path.isdir(path):
                os.mkdir(path)
        os.mkdir(os.path.join(os.getcwd(), "data",
                 'Workouts', 'workout-routes'))


def upload_health_export(fileObject):
    if len(fileObject) == 0:
        return jsonify({'Error': 'No file was uploaded'}), 500

    uploadedFile = fileObject["file"]
    with ZipFile(uploadedFile, "r") as zipFile:
        try:
            zipFile.extractall(DATA_FILE)
            Data = Export(DATA_FILE, DATA_FILE)
            Data.load_health_data()
            return jsonify({'Response': 'File successfully uploaded and parsed'}), 200
        except Exception:
            return jsonify({'Error': 'This is not a Apple Health Export'}), 400


def read_healthkit_data(dataType: str, dataName: str):
    var_path = os.path.join(os.getcwd(), "data", dataType, f'{dataName}.csv')
    if os.path.exists(var_path):
        return jsonify(pd.read_csv(var_path, low_memory=True).to_json(orient='records')), 200
    return jsonify({'Error': f'File associated with {dataName} not found'}), 500


def read_workout_events():
    var_path = os.path.join(os.getcwd(), "data", 'Workouts', 'Workout.csv')
    if os.path.exists(var_path):
        df = pd.read_csv(var_path, low_memory=True, usecols=[
                         'workoutActivityType', 'startDate'])
        df['startDate'] = pd.to_datetime(df['startDate']).dt.date.astype(str)
        return df.to_json(orient='records'), 200
    return jsonify({'Error': 'File associated with Workouts not found'}), 500


def read_workout_route_data(route: str):
    var_path = os.path.join(os.getcwd(), "data", 'Workouts',
                            'workout-routes', f'{route}.csv')
    if os.path.exists(var_path):
        return jsonify(pd.read_csv(var_path, low_memory=True).to_json(orient='records')), 200
    return jsonify({'Error': 'Route {route} not found'}), 500


def read_specific_workout_data(date):
    var_path = os.path.join(os.getcwd(), "data", 'Workouts', 'Workout.csv')
    if os.path.exists(var_path):

        data = format_numbers(query_by_date(pd.read_csv(
            var_path), 'startDate', date).to_dict('records'))

        for index in range(len(data)):
            if not isinstance(data[index]['MetadataEntry'], float):
                data[index]['MetadataEntry'] = json.loads(
                    data[index]['MetadataEntry'].replace("'", '"'))

                data[index]['workoutActivityType'] = format_workout_name(
                    data[index])

                data[index]['MetadataEntry'] = remove_metadata(data[index])
            else:
                del data[index]['MetadataEntry']

            if (
                not isinstance(data[index]['WorkoutEvent'], float)
                and data[index]['WorkoutEvent'] == '[]'
            ):
                data[index]['WorkoutEvent'] = json.loads(
                    data[index]['WorkoutEvent'].replace("'", '"'))
            else:
                del data[index]['WorkoutEvent']

            if not isinstance(data[index]['WorkoutPath'], float):
                data[index]['WorkoutGPX'] = package_gpx_data(pd.read_csv(os.path.join(
                    os.getcwd(), "data", 'Workouts', f"{data[index]['WorkoutPath'][1:]}.csv")))
                data[index]['WorkoutGPX']['Vitals'] = get_vitals_by_data('Heart Rate', pd.to_datetime(data[index]['startDate']).strftime(
                    "%Y-%m-%d %H:%M:%S %z"), pd.to_datetime(data[index]['endDate']).strftime("%Y-%m-%d %H:%M:%S %z"))
            else:
                data[index]['WorkoutGPX'] = STANDARD_MAP
            del data[index]['WorkoutPath']
    return jsonify(EMPTY_WORKOUT) if len(data) == 0 else jsonify(data)


def read_workout_statistics():
    var_path = os.path.join(os.getcwd(), "data", 'Workouts', 'Workout.csv')
    if os.path.exists(var_path):
        df = pd.read_csv(var_path, low_memory=True, usecols=[
                         'workoutActivityType', 'duration', 'unit',  'totalDistance', 'totalDistanceUnit', 'totalEnergyBurned', 'totalEnergyBurnedUnit', 'startDate'])
        max_result = df.groupby('workoutActivityType')[
            ['duration', 'totalDistance', 'totalEnergyBurned']].agg('max').reset_index()
        max_result = max_result.rename(columns={'workoutActivityType': 'WorkoutType', 'duration': 'MaxDuration',
                                       'totalDistance': 'MaxTotalDistance', 'totalEnergyBurned': 'MaxTotalEnergyBurned'})
        min_result = df.groupby('workoutActivityType')[
            ['duration', 'totalDistance', 'totalEnergyBurned']].agg('min').reset_index()
        min_result = min_result.rename(columns={'workoutActivityType': 'WorkoutType', 'duration': 'MinDuration',
                                       'totalDistance': 'MinTotalDistance', 'totalEnergyBurned': 'MinTotalEnergyBurned'})
        joined_results = pd.merge(max_result, min_result)
        return joined_results.to_json(orient='records'), 200
    return jsonify({'Error': 'File associated with Workouts not found'}), 500


def read_activity_statistics():
    activity_statistics = []
    for activity in HOME_PAGE_ACTIVITIES:
        var_path = os.path.join(os.getcwd(), "data",
                                'Record', f'{activity}.csv')
        if os.path.exists(var_path):
            df = pd.read_csv(var_path, low_memory=True, usecols=['value'])
            activity_statistics.append({
                'metricName': remove_tag(activity),
                'value': int(df.sum()),
                'metricText': HOME_PAGE_ACTIVITIES_DESCRIPTIONS[remove_tag(activity)],
                'change': round_value(determine_trends(df['value'].tolist()) * 100),
            })
    return jsonify(activity_statistics), 200


def grab_audio_statistics():
    audio_statistics = {
        'ExposureEvents': 0
    }
    for file in AUDIO_FILES:
        var_path = os.path.join(os.getcwd(), "data", 'Record', f'{file}.csv')
        if os.path.exists(var_path):
            if file in AUDIO_EXPOSURE_EVENTS:
                df = pd.read_csv(var_path, low_memory=True, usecols=['value'])
                audio_statistics['ExposureEvents'] += len(df)
            else:
                df = pd.read_csv(var_path, low_memory=True, usecols=['value'])
                audio_statistics[f'Highest {remove_tag(file)}'] = float(
                    df.max())
    return jsonify(audio_statistics), 200


def get_vitals_by_data(record, start_date, end_date):
    """
    Returns a dataframe of the heart rate data recorded between the start date and end date
        Parameter(s):
            start_date (str): Starting timestamp
            end_date (str): Ending timestamp
        Returns:
            Dataframe of heart rate information fitting between the start and ending timestamps
    """

    if record == "Heart Rate":
        var_path = os.path.join(
            os.getcwd(), "data", 'Record', 'HKQuantityTypeIdentifierHeartRate.csv')
        df = pd.read_csv(
            var_path, usecols=['startDate',  'endDate', 'value', 'unit'],
            dtype={'value': 'float64'})

        df = df.loc[
            (
                (df['startDate'] > start_date) &
                (df["endDate"] <= end_date)
            )
        ]
        df = df.drop(columns=["endDate"])

        return json.loads(df.to_json(orient='records'))
