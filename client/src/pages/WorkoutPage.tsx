import React, { useEffect, useState, FunctionComponent } from "react";
import { RecordsRequest } from "../helpers/DataRequests";
import { WorkoutEvents } from "../types/Calendar";
import { WorkoutsStatisticsProps } from "../types/Workout";
import WorkoutControls from "../components/workout/WorkoutControls";
import WorkoutOutputs from "../components/workout/WorkoutOutputs";

const WorkoutPage: FunctionComponent = (props) => {
  const [workoutEvents, setWorkoutEvents] = useState<WorkoutEvents[]>([]);
  const [workoutStatistics, setWorkoutStatistics] = useState<
    WorkoutsStatisticsProps[]
  >([]);

  useEffect(() => {
    RecordsRequest("workouts", "events").then((response) => {
      if (response) {
        const workoutEvents = response as WorkoutEvents[];
        setWorkoutEvents(workoutEvents);
      }
    });
  }, []);

  useEffect(() => {
    RecordsRequest("workouts", "statistics").then((response) => {
      if (response) {
        const activityStats = response as WorkoutsStatisticsProps[];
        setWorkoutStatistics(activityStats);
      }
    });
  }, []);

  return (
    <div className="flex h-screen">
      <WorkoutControls breakdownData={workoutStatistics} workoutCalendarEvents={workoutEvents}  /> 
      {/* workoutEvents={workoutEvents} */}
      <WorkoutOutputs  />
    </div>
  );
};

export default WorkoutPage;
