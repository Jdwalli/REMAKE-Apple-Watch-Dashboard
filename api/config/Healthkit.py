AUDIO_FILES = [
    "HKCategoryTypeIdentifierHeadphoneAudioExposureEvent",       "HKQuantityTypeIdentifierEnvironmentalAudioExposure", 
    "HKQuantityTypeIdentifierHeadphoneAudioExposure", 
    "HKQuantityTypeIdentifierEnvironmentalAudioExposureEvent"
]

AUDIO_EXPOSURE_EVENTS = [
    "HKCategoryTypeIdentifierHeadphoneAudioExposureEvent",
    "HKQuantityTypeIdentifierEnvironmentalAudioExposureEvent"
]

SWIMMING_LOCATIONS = { 
    0: "Unknown", 
    1: "Pool", 
    2: "Open Water"
}

STROKE_STYLES = {
    0: "Unknown", 
    1: "Mixed", 
    2: "Freestyle",
    3: "Backstroke", 
    4: "Breaststroke", 
    5: "Butterfly"
}

WORKOUT_METADATA_KEYS = {
    "HKIndoorWorkout" : {
        0 : "Outdoor",
        1 : "Indoor"
    },
    "HKGroupFitness" : {
        0 : "Solo Fitness",
        1 : "Group Fitness"
    },
    "HKCoachedWorkout" : {
        0: "Solo Workout",
        1: "Coached Fitness"
    }
}