import os 
import pandas as pd
from flask import Response, request, jsonify
from zipfile import ZipFile
from tools.ExportParser import Export

DATA_FILE = os.path.join(os.getcwd(), "data")

def create_data_files():
    if not os.path.isdir(DATA_FILE):
        os.mkdir(DATA_FILE)
        directories = ["Record", "Workouts", 'ECG']
        for directory in directories:
            path = os.path.join(os.getcwd(), "data", directory)
            if not os.path.isdir(path):
                os.mkdir(path)
        os.mkdir(os.path.join(os.getcwd(), "data", 'Workouts', 'workout-routes'))


def upload_health_export(fileObject):
    if len(fileObject) == 0:
        return jsonify({'Error' : f'No file was uploaded'}), 500
    
    uploadedFile = fileObject["file"]
    with ZipFile(uploadedFile, "r") as zipFile:
        try:
            zipFile.extractall(DATA_FILE)
            Data = Export(DATA_FILE, DATA_FILE)
            Data.load_health_data()
            return jsonify({'Response' : f'File successfully uploaded and parsed'}), 200
        except Exception:
            return jsonify({'Error' : f'This is not a Apple Health Export'}), 400

def read_healthkit_data(dataType: str, dataName: str):
    var_path = os.path.join(os.getcwd(), "data", dataType, f'{dataName}.csv')
    if os.path.exists(var_path):
        return jsonify(pd.read_csv(var_path, low_memory=True).to_json()), 200
    return jsonify({'Error' : f'File associated with {dataName} not found'}), 500

def read_workout_route_data(route: str):
    var_path = os.path.join(os.getcwd(), "data", 'Workouts', 'workout-routes', f'{route}.csv')
    if os.path.exists(var_path):
        return jsonify(pd.read_csv(var_path, low_memory=True).to_json()), 200
    return jsonify({'Error' : 'Route {route} not found'}), 500