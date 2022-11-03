import React, { useEffect, useState, FunctionComponent } from "react";
import Calendar from "../components/common/Calendar";
import Breakdowns from "../components/workout/Breakdowns";
import { RecordsRequest } from "../helpers/DataRequests";
import { WorkoutEvents } from "../types/Calendar"
import {WorkoutsStatisticsProps} from '../types/Workout'
const WorkoutPage: FunctionComponent = (props) => {

  

  const [workoutEvents, setWorkoutEvents] = useState<WorkoutEvents[]>([])
  const [workoutStatistics, setWorkoutStatistics] = useState<WorkoutsStatisticsProps[]>([])

  useEffect(() => {
    RecordsRequest('workouts', 'events').then((response) => {
      if (response) {
        const workoutEvents = response as WorkoutEvents[]
        setWorkoutEvents(workoutEvents)
      }
    });
  }, [])

  useEffect(() => {
    RecordsRequest('workouts', 'statistics').then((response) => {
      if (response) {
        const activityStats = response as WorkoutsStatisticsProps[]
        setWorkoutStatistics(activityStats)
      }
    });
  }, [])



  return (
    <>
      <section className="w-1/3 p-2 h-screen max-w-xs overflow-hidden shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
        <Calendar workoutEvents={workoutEvents} />
        <p className='p-2 text-sm'> Statistics </p>
        <Breakdowns data={workoutStatistics} />
      </section>            
          
      {/* <div className="w-1/4 h-vh bg-gray-100">
        <Calendar workoutEvents={workoutEvents}/>
        <Breakdowns data={workoutStatistics} />
        
        {/* Left side Calendar should go here and this should be where the breakdown cards should go  */}
      {/* </div> */}
      {/* // <aside></aside> */}
    
    </>
  );
};

export default WorkoutPage;
