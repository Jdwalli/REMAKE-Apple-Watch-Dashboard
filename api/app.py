from flask import Flask, Response, request, jsonify
import os
from zipfile import ZipFile

""" Global Variables """
app = Flask(__name__)

@app.route("/api/upload", methods=["POST"])
def upload_export():
   return NotImplementedError

@app.route("/api/records", methods=["GET"])
def send_records():
    return NotImplementedError

@app.route("/api/workoutRecords", methods=["GET"])
def send_workout_records():
    return NotImplementedError

@app.route("/api/summaryRecords", methods=["GET"])
def send_summary_records():
    return NotImplementedError

@app.route("/api/ecgFiles", methods=["GET"])
def send_ecg_file_data():
    return NotImplementedError

@app.route("/api/workoutFiles", methods=["GET"])
def send_workout_file_data():
    return NotImplementedError

if __name__ == "__main__":
    app.run(debug=True)