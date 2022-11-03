import React, { FunctionComponent } from "react";
import WorkoutStatisticCard from "./StatisticsCard";
import { WorkoutsStatisticsProps } from "../../types/Workout";

interface Props {
  data:  WorkoutsStatisticsProps[]
} 

const Breakdowns: FunctionComponent<Props> = (props:Props) => {
    return (
      <div className='h-screen max-w-xs overflow-auto shadow-md bg-black hover:shadow-xl transition-shadow duration-300 ease-in-out'>
      {props.data.map(workout => {
        return (
          <WorkoutStatisticCard data={workout} />
        );
      })}
      <div className="h-96"></div>
    </div>
    );
  };
  

  export default Breakdowns;
  