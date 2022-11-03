import React, { FunctionComponent } from "react";
import { WorkoutIconMapping } from './WorkoutIcons'
import { WorkoutsStatisticsProps } from "../../types/Workout";

interface Props {
  data: WorkoutsStatisticsProps
}

const WorkoutStatisticCard: FunctionComponent<Props> = (props: Props) => {
  const formattedWorkout = props.data.WorkoutType.substring(21).replace(/([a-z])([A-Z])/g, '$1 $2') as string
  return (
    <div className="container mx-auto pr-4 mb-2 w-fit">
    <div className="w-72 bg-white max-w-xs mx-auto rounded-sm overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 transform hover:scale-100">
      <div className="h-10 bg-red-400 flex items-center">
        <p className="mr-0 text-white text-lg pl-5"> { WorkoutIconMapping[formattedWorkout as keyof typeof WorkoutIconMapping] } </p>
        <p className="text-white text-lg">{ formattedWorkout } </p>
      </div>
      <div className="px-3 pt-2 mb-2 text-xs text-gray-600">
        {
          props.data.MaxTotalDistance > 0 ? (
            <p>Max Distance {props.data.MaxTotalDistance} </p>
          ) : null
        }
        {
          props.data.MinTotalDistance > 0 ? (
            <p>Min Distance {props.data.MinTotalDistance} </p>
          ) : null
        }
        {
          props.data.MinDuration > 0 ? (
            <p>Min Duration {props.data.MinDuration} </p>
          ) : null
        }
        <p>Max Duration {props.data.MaxDuration} </p>
        <p>Max Total Energy Burned {props.data.MaxTotalEnergyBurned} </p>
        <p>Min Total Energy Burned {props.data.MinTotalEnergyBurned} </p>
      </div>
    </div>
  </div>
    
  );
};

export default WorkoutStatisticCard;
