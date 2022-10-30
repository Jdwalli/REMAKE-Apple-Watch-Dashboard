from asyncore import read
import os, re
import pandas as pd
import xml.etree.ElementTree as ET
from config.settings import EXCLUSION_LIST
import shutil

# Performance Imports
from tests.Timer import Timer

class Export:
    def __init__(self, exportPath: str, uploadPath: str):
        self.exportPath = exportPath
        self.uploadPath = uploadPath
        self.export_path = os.path.join(exportPath, "apple_health_export", "export.xml")
        self.ecg_path = os.path.join(exportPath, "apple_health_export", "electrocardiograms")
        self.workout_path = os.path.join(exportPath, "apple_health_export", "workout-routes")
        self.root = self._create_tree_root()

    def _create_tree_root(self):
        """
        Returns the root from the xml tree if the export path exist
        """
        try:
            t = Timer()
            t.start()
            tree = ET.parse(self.export_path)
            t.stop('XML parsing completed in')
            return tree.getroot()
        except SyntaxError:
            print("Any export with IOS version 16 will not work. Reference: https://discussions.apple.com/thread/254202523")
            return False 
    
    def _originates_from_watch(self, sourceName: str) -> bool:
        """
        Determines if the sourceName of the data contains the word 'watch'
        :param sourceName: Source of the data
        :type sourceName: str
        :returns: True or False
        :rtype: boolean
        """
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
        return True
    
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
            df = pd.DataFrame.from_dict(data[key]) 
            df.to_csv(os.path.join(self.uploadPath, "Record", f"{key}.csv"), index = False, header=True)
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
            df = pd.DataFrame.from_dict(data[key]) 
            df.to_csv(os.path.join(self.uploadPath, "Record", f"Activity{key}.csv"), index = False, header=True)
        
        t.stop('Activity summary loading completed in')
    
    def _load_workout_records(self) -> dict:
        t = Timer()
        t.start()
        data = {}
        workouts = self.root.findall('Workout')
        
        for workout in workouts:
            data['Workout'] = []
        
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
                            WorkoutPath = element.attrib["path"]
                if child.tag == "MetadataEntry":
                    MetadataEntry.append(child.attrib)
                if child.tag == "WorkoutEvent":
                    WorkoutEvent.append(child.attrib)
            MetadataEntry = str(MetadataEntry)
            WorkoutEvent = str(WorkoutEvent)
            try:
                data['Workout'].append((key, duration, unit, totalDistance, totalDistanceUnit, totalEnergyBurned, totalEnergyBurnedUnit, creationDate, startDate, endDate, MetadataEntry, WorkoutEvent, WorkoutPath))
            except Exception as e:
                print(e)
        for key in data.keys():
            data[key] = pd.DataFrame(data[key], columns=["workoutActivityType", "duration", "unit", "totalDistance", "totalDistanceUnit", "totalEnergyBurned", "totalEnergyBurnedUnit", 'creationDate','startDate', 'endDate', 'MetadataEntry', 'WorkoutEvent', 'WorkoutPath'])

        df = pd.DataFrame.from_dict(data[key]) 
        df.to_csv(os.path.join(self.uploadPath, "Workouts", f"Workout.csv"), index = False, header=True)

            
        t.stop('Workout record loading completed in')
    
    def load_health_data(self):
        if self.root != False:
            t = Timer()
            t.start()
            if self._is_active_path('export'): 
                self._load_records()
                self._load_activity_summaries()
                self._load_workout_records()
            if self._is_active_path('workout-routes'): self._load_gpx_data()
            if self._is_active_path('electrocardiograms'): self._load_ecg_data()
            t.stop("Total time taken to load all data")

    def get_filenames(self, path: str):
        filenames = os.listdir(path)
        filenames = [f for f in filenames if os.path.isfile(
            os.path.join(path, f)) and not f.startswith(".")]
        return filenames
    
    def _load_gpx_path(self, path:str):
        with open(os.path.join(self.workout_path, path), "rb") as f:
            route = ET.parse(f, parser=ET.XMLParser(encoding="utf-8")).getroot()
        return route

    def _load_gpx_data(self) -> dict: #IMPLEMENT
        t = Timer()
        t.start()
        data = {}

        for path in self.get_filenames(self.workout_path):
            data[path] = []
        
        for path in self.get_filenames(self.workout_path):
            ns = {"gpx": "http://www.topografix.com/GPX/1/1"}
            tracks = self._load_gpx_path(path).findall('gpx:trk', ns)
            for track in tracks:
                track_segments = track.findall('gpx:trkseg', ns)
                for track_segment in track_segments:
                    track_points = track_segment.findall('gpx:trkpt', ns)
                    for track_point in track_points:

                        elevation = track_point.find('gpx:ele', ns).text
                        time = track_point.find('gpx:time', ns).text
                        extension = track_point.find('gpx:extensions', ns)

                        lon = track_point.get("lon")
                        lat = track_point.get("lat")
                        speed = extension.find('gpx:speed', ns).text
                        course = extension.find('gpx:course', ns).text
                        hAcc = extension.find('gpx:hAcc', ns).text
                        vAcc = extension.find('gpx:vAcc', ns).text

                        try:
                            data[path].append((lon, lat, elevation, time, speed, course, hAcc, vAcc))
                        except KeyError:
                            print("error")

        for key in data.keys():
            data[key] = pd.DataFrame(data[key], columns=['lon', 'lat', 'elevation', 'time', 'speed', 'course', 'hAcc', 'vAcc'])
            df = pd.DataFrame.from_dict(data[key]) 
            df.to_csv(os.path.join(self.uploadPath, "Workouts", 'workout-routes', f"{key}.csv"), index = False, header=True)
        
        t.stop('GPX Route record loading completed in')        


    def _load_ecg_data(self):
        t = Timer()
        t.start()

        for file in self.get_filenames(self.ecg_path):
            shutil.copyfile(os.path.join(self.ecg_path, file), os.path.join(self.uploadPath, "ECG", f"{file}"))
        t.stop('ECG loading completed in')

    

    
