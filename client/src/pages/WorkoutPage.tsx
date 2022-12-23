import React, { useEffect, useState, FunctionComponent } from "react";
import { RecordsRequest, WorkoutRequest } from "../helpers/DataRequests";
import { WorkoutEvents } from "../types/Calendar";
import { WorkoutsStatisticsProps, Workout, Default } from "../types/Workout";
import WorkoutControls from "../components/workout/WorkoutControls";
import WorkoutOutputs from "../components/workout/WorkoutOutputs";
import { useSelector } from "react-redux";
import { RootState } from "../redux/types";

const WorkoutPage: FunctionComponent = (props) => {
  const [workoutEvents, setWorkoutEvents] = useState<WorkoutEvents[]>([]);
  const [workoutStatistics, setWorkoutStatistics] = useState<
    WorkoutsStatisticsProps[]
  >([]);
  const [workoutData, setWorkoutData] = useState<Workout[]>(Default);

  const selectedWorkoutDate = useSelector(
    (state: RootState) => state.workoutDate
  );

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

  useEffect(() => {
    WorkoutRequest(selectedWorkoutDate).then((response) => {
      if (response) {
        const data = response as Workout[];
        setWorkoutData(data);
      }
    });
  }, [selectedWorkoutDate]);

  return (
    <div className="flex h-screen">
      <WorkoutControls
        breakdownData={workoutStatistics}
        workoutCalendarEvents={workoutEvents}
      />
      <WorkoutOutputs data={workoutData} />
    </div>
  );
};

export default WorkoutPage;
