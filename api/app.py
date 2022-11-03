from flask import Flask, request, jsonify
from service.Helpers import create_data_files, read_healthkit_data, read_workout_events, read_workout_route_data, upload_health_export, read_workout_statistics

app = Flask(__name__)

@app.route("/api/upload", methods=["POST"])
def upload_export():
    return upload_health_export(request.files)

# ACTIVITY HEALTH RECORDS
@app.route("/api/records", methods=["GET"])
def send_records_information():
    return jsonify({'Error' : f'Not implemented yet'}), 500

@app.route("/api/records/StepCount", methods=["GET"])
def send_step_count_records():
    return read_healthkit_data('Record', 'HKQuantityTypeIdentifierStepCount')

@app.route("/api/records/BasalEnergyBurned", methods=["GET"])
def send_basal_energy_records():
    return read_healthkit_data('Record', 'HKQuantityTypeIdentifierBasalEnergyBurned')

@app.route("/api/records/ActiveEnergyBurned", methods=["GET"])
def send_active_energy_records():
    return read_healthkit_data('Record', 'HKQuantityTypeIdentifierActiveEnergyBurned')
    
@app.route("/api/records/FlightsClimbed", methods=["GET"])
def send_flights_climbed_records():
    return read_healthkit_data('Record', 'HKQuantityTypeIdentifierFlightsClimbed')

@app.route("/api/records/ExerciseTime", methods=["GET"])
def send_exercise_time_records():
    return read_healthkit_data('Record', 'HKQuantityTypeIdentifierAppleExerciseTime')

@app.route("/api/records/StandTime", methods=["GET"])
def send_stand_time_records():
    return read_healthkit_data('Record', 'HKQuantityTypeIdentifierAppleStandTime')
    
@app.route("/api/records/StairAscentSpeed", methods=["GET"])
def send_stair_ascent_records():
    return read_healthkit_data('Record', 'HKQuantityTypeIdentifierStairAscentSpeed')
    
@app.route("/api/records/StairDescentSpeed", methods=["GET"])
def send_stair_descent_records():
    return read_healthkit_data('Record', 'HKQuantityTypeIdentifierStairDescentSpeed')
    
@app.route("/api/records/StandHour", methods=["GET"])
def send_stand_hour_records():
    return read_healthkit_data('Record', 'HKCategoryTypeIdentifierAppleStandHour')

@app.route("/api/records/DistanceWalkingRunning", methods=["GET"])
def send_distance_walking_running_records():
    return read_healthkit_data('Record', 'HKQuantityTypeIdentifierDistanceWalkingRunning')

@app.route("/api/records/Sleep", methods=["GET"])
def send_sleep_records():
    return read_healthkit_data('Record', 'HKCategoryTypeIdentifierSleepAnalysis')
    
@app.route("/api/records/HeartRate", methods=["GET"])
def send_heart_rate_records():
    return read_healthkit_data('Record', 'HKQuantityTypeIdentifierHeartRate')
    
@app.route("/api/records/RestingHeartRate", methods=["GET"])
def send_resting_heart_rate_records():
    return read_healthkit_data('Record', 'HKQuantityTypeIdentifierRestingHeartRate')
    
@app.route("/api/records/V02Max", methods=["GET"])
def send_V02_records():
    return read_healthkit_data('Record', 'HKQuantityTypeIdentifierVO2Max')
    
@app.route("/api/records/WalkingHeartRateAverage", methods=["GET"])
def send_walking_heart_rate_records():
    return read_healthkit_data('Record', 'HKQuantityTypeIdentifierWalkingHeartRateAverage')

@app.route("/api/records/HighHeartRateEvent", methods=["GET"])
def send_high_heart_rate_records():
    return jsonify({'Error' : f'Not implemented yet'}), 500

@app.route("/api/records/HeartRateVariabilitySDNN", methods=["GET"])
def send_heart_rate_variability_records():
    return read_healthkit_data('Record', 'HKQuantityTypeIdentifierHeartRateVariabilitySDNN')
    
@app.route("/api/ecg", methods=["GET"])
def send_ecg_file_data():
    return jsonify({'Error' : f'Not implemented yet'}), 500

@app.route("/api/records/ActivitySummary", methods=["GET"])
def send_activity_summary_records():
    return read_healthkit_data('Record', 'ActivitySummary')
    
# WORKOUT RECORDS

@app.route("/api/workouts", methods=["GET"])
def send_all_workouts():
    return read_healthkit_data('Workouts', 'Workout')

@app.route("/api/workouts/statistics", methods=["GET"])
def send_workout_statistics():
    return read_workout_statistics()

@app.route("/api/workouts/events", methods=["GET"])
def send_workout_events():
    return read_workout_events()

@app.route("/api/workouts/workout-route", methods=["POST"])
def send_workout_route_record():
    return read_workout_route_data(request.get_json()['route'])

if __name__ == "__main__":
    create_data_files()
    app.run(debug=True)