import os, re
import pandas as pd
import xml.etree.ElementTree as ET
from multiprocessing import Process

# Performance Imports
from tests.Timer import Timer

EXCLUSION_LIST = ["HKCategoryTypeIdentifierMindfulSession", 'HKCategoryTypeIdentifierHighHeartRateEvent', ]

class Export:
    def __init__(self, path: str):
        self.path = path
        self.export_path = os.path.join(path, "apple_health_export", "export.xml")
        self.ecg_path = os.path.join(path, "apple_health_export", "electrocardiograms")
        self.workout_path = os.path.join(path, "apple_health_export", "workout-routes")
        self.root = self._create_tree_root()

    def _create_tree_root(self):
        """
        Returns the root from the xml tree if the export path exist
        """
        if self._is_active_path("export"):
            try:
                t = Timer()
                t.start()
                tree = ET.parse(self.export_path)
                t.stop('XML parsing completed in')
                return tree.getroot()
            except SyntaxError:
                print("Any export with IOS version 16 will not work. Reference: https://discussions.apple.com/thread/254202523")
                return False 
        else:
            print('This is not a valid export path!')
            return False
    
    def _originates_from_watch(self, sourceName: str) -> bool:
        return bool(re.search("Watch", sourceName))

    def _is_active_path(self, data: str) -> bool:
        """
        Determines if the specified data is present in the upload file

        :param data: The specified data file [export, workout-routes, electrocardiograms] to check for
        :type data: str
        :returns: True or False
        :rtype: boolean
        """
        if data == "export": return os.path.exists(self.export_path)
        if data == "workout-routes": return os.path.exists(self.workout_path)
        if data == "electrocardiograms": return os.path.exists(self.ecg_path)
    
    def _load_export_data(self):
        if self.root != False:
            self.nodes = list(self.root)

    def _load_records(self) -> dict:
        t = Timer()
        t.start()
        data = {}
        records = self.root.findall('Record')

        for record in records:
            if self._originates_from_watch(record.get('sourceName')): 
                if record.get('type') not in EXCLUSION_LIST:
                    data[record.get("type")] = []

        for record in records:
            key = record.get("type")
            value = record.get("value")
            unit = record.get('unit')
            startDate = record.get('startDate')
            endDate = record.get('endDate')
            if key in EXCLUSION_LIST:
                pass
            else:
                try:
                    data[key].append((key, value, unit, startDate, endDate))
                except KeyError:
                    pass

        for key in data.keys():
            data[key] = pd.DataFrame(data[key], columns=["type", "value", "unit", "startDate", "endDate"])
        t.stop('Record loading completed in')

        return data

    def _load_activity_summaries(self) -> dict:
        t = Timer()
        t.start()
        data = {}
        summaries = self.root.findall('ActivitySummary')
        for summary in summaries:
            data['Summary'] = []

        for summary in summaries:
            dateComponents = summary.get("dateComponents")
            activeEnergyBurned = summary.get("activeEnergyBurned")
            activeEnergyBurnedGoal = summary.get('activeEnergyBurnedGoal')
            activeEnergyBurnedUnit = summary.get('activeEnergyBurnedUnit')
            appleMoveTime = summary.get('appleMoveTime')
            appleMoveTimeGoal = summary.get("appleMoveTimeGoal")
            appleExerciseTime = summary.get('appleExerciseTime')
            appleExerciseTimeGoal = summary.get('appleExerciseTimeGoal')
            appleStandHours = summary.get('appleStandHours')
            appleStandHoursGoal = summary.get('appleStandHoursGoal')
            try:
                data['Summary'].append((dateComponents, activeEnergyBurned,activeEnergyBurnedGoal,activeEnergyBurnedUnit,appleMoveTime,appleMoveTimeGoal,appleExerciseTime,appleExerciseTimeGoal,appleStandHours,appleStandHoursGoal))
            except KeyError:
                pass
        for key in data.keys():
            data[key] = pd.DataFrame(data[key], columns=['dateComponents', 'activeEnergyBurned','activeEnergyBurnedGoal','activeEnergyBurnedUnit','appleMoveTime','appleMoveTimeGoal','appleExerciseTime','appleExerciseTimeGoal','appleStandHours','appleStandHoursGoal'])
        t.stop('Activity summary loading completed in')


        return data
    
    def _load_workout_records(self) -> dict:
        t = Timer()
        t.start()
        data = {}
        workouts = self.root.findall('Workout')
        
        for workout in workouts:
            data[workout.get("workoutActivityType")] = []
        
        for workout in workouts:
            MetadataEntry = []
            WorkoutEvent = []
            WorkoutPath = ""
            key = workout.get("workoutActivityType")
            duration = workout.get("duration")
            unit = workout.get('durationUnit')
            totalDistance = workout.get('totalDistance')
            totalDistanceUnit = workout.get('totalDistanceUnit')
            totalEnergyBurned = workout.get("totalEnergyBurned")
            totalEnergyBurnedUnit = workout.get('totalEnergyBurnedUnit')
            creationDate = workout.get("creationDate")
            startDate = workout.get("startDate")
            endDate = workout.get("endDate")
            node_children = list(workout)
            for child in node_children:
                if len(child) > 0:
                    additional_children = list(child)
                    for element in additional_children:
                        if element.tag == "FileReference":
                            WorkoutRoute = element.attrib["path"]
                if child.tag == "MetadataEntry":
                    MetadataEntry.append(child.attrib)
                if child.tag == "WorkoutEvent":
                    WorkoutEvent.append(child.attrib)
            MetadataEntry = str(MetadataEntry)
            WorkoutEvent = str(WorkoutEvent)
            try:
                data[key].append((key, duration, unit, totalDistance, totalDistanceUnit, totalEnergyBurned, totalEnergyBurnedUnit, creationDate, startDate, endDate, MetadataEntry, WorkoutEvent, WorkoutPath))
            except Exception as e:
                print(e)
        for key in data.keys():
            data[key] = pd.DataFrame(data[key], columns=["workoutActivityType", "duration", "unit", "totalDistance", "totalDistanceUnit", "totalEnergyBurned", "totalEnergyBurnedUnit", 'creationDate','startDate', 'endDate', 'MetadataEntry', 'WorkoutEvent', 'WorkoutPath'])
        t.stop('Workout record loading completed in')


        return data
    
    def load_health_data(self):
        if self.root != False:
            self._load_records()
            self._load_workout_records()
            self._load_activity_summaries()

