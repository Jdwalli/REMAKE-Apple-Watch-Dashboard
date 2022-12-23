from config.Settings import *
from service.Helper import *
from config.Healthkit import *
import json

def convert():
    return NotImplementedError


def determine_midpoint(lat, lon):
    return [lat[len(lat) // 2], lon[len(lon) // 2]]


def determine_zoom():
    return 15


def remove_metadata(metadata_list):
    try:
        return [
            {'key': remove_tag(element['key']), 'value': float(
                element['value'].split(' ')[0]), 'unit': element['value'].split(' ')[1]}
            for element in metadata_list['MetadataEntry']
            if element['key'] not in METADATA_EXCLUSION_LIST
        ]
    except Exception:
        return []


def package_gpx_data(df):
    workout_data = {
        'Longitude': df['lon'].tolist(), 'Latitude': df['lat'].tolist()}
    workout_data["Center"] = determine_midpoint(
        workout_data['Latitude'], workout_data['Longitude'])
    workout_data["Zoom"] = determine_zoom()
    df = df.drop(columns=['lon', 'lat'], axis=1)
    workout_data['Mapping'] = json.loads(df.to_json(orient='records'))
    return workout_data


def format_numbers(metadata_list):
    solution = []
    for index in range(len(metadata_list)):
        new_list = {
            key: round_value(value)
            if isinstance(value, (int, float))
            else value
            for key, value in metadata_list[index].items()
        }
        solution.append(new_list)
    return solution


def format_workout_name(workout_data):
    return next(
        (
            f"{WORKOUT_METADATA_KEYS['HKIndoorWorkout'][int(metadata['value'])]} {remove_tag(workout_data['workoutActivityType'])}"
            for metadata in workout_data['MetadataEntry']
            if metadata['key'] == 'HKIndoorWorkout'
        ),
        "",
    )