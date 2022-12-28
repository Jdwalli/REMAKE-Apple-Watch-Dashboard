from config.Settings import *
from service.Helper import *
from config.Healthkit import *
import json
from math import log

def convert():
    return NotImplementedError


def determine_midpoint(lat, lon):
    return [lat[len(lat) // 2], lon[len(lon) // 2]]

def determine_zoom(longitudes, latitudes):
    """
    The logarithm function is used to determine the zoom level for a map so that all points are visible because the logarithm function can be used to calculate the zoom level needed to fit a set of coordinates within a given area. This is useful for maps because it allows you to calculate the zoom level needed to fit a set of coordinates within the visible area of the map, which ensures that all points are visible. This can be useful when you have a large number of points that you want to display on a map, as it allows you to zoom out to a level where all points are visible without having to manually adjust the zoom level.
    """
    min_longitude = min(longitudes)
    max_longitude = max(longitudes)
    min_latitude = min(latitudes)
    max_latitude = max(latitudes)

    width = max_longitude - min_longitude
    height = max_latitude - min_latitude

    return int(round(log(360 / width, 2))) - 1


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
    workout_data["Zoom"] = determine_zoom(workout_data['Latitude'], workout_data['Longitude'])
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
        remove_tag(workout_data['workoutActivityType']),
    )