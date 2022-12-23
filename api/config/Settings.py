EXCLUSION_LIST = [
    "HKCategoryTypeIdentifierMindfulSession", 
    "HKCategoryTypeIdentifierHighHeartRateEvent"
]

HOME_PAGE_ACTIVITIES = [
    "HKQuantityTypeIdentifierStepCount", 
    "HKQuantityTypeIdentifierActiveEnergyBurned", 
    "HKQuantityTypeIdentifierAppleExerciseTime", 
    "HKQuantityTypeIdentifierFlightsClimbed", 
    "HKQuantityTypeIdentifierAppleStandTime"
]

HOME_PAGE_ACTIVITIES_DESCRIPTIONS = {
    "Step Count" : "Steps Recorded",
    "Active Energy Burned" : "Active Energy Calories Burned",
    "Apple Exercise Time" : "Recorded Exercise Minutes",
    "Apple Stand Time" : "Recorded Standing Minutes",
    "Flights Climbed" : "Recorded Flights Climbed"
}

METADATA_EXCLUSION_LIST = [
  'HKTimeZone', 
  'HKIndoorWorkout'
]


STANDARD_MAP = {
            'Latitude': [],
            'Longitude': [],
            'Center': [33.07, 10.59],
            'Zoom': 2,
            'Mapping': []
    }

EMPTY_WORKOUT = [{
    'WorkoutGPX' : STANDARD_MAP,
    'workoutActivityType': "No Workout",
}]
