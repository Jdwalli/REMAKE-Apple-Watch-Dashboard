import React, { FunctionComponent, useState } from "react";
import {  Workout } from "../../types/Workout";
import ControlHeader from "../common/ControlHeader";
import Map from "../common/Map";
import { SelectedBreakdown } from "./Breakdowns";

import GraphArea from "./GraphArea";

interface Props {
  index?: number,
  data: Workout[]
} 

const WorkoutOutputs: FunctionComponent<Props> = (props:Props) => {
  const [activeButton, setActiveButton] = React.useState('speed');
  const [index, setIndex] = useState(0);

    return (
      <div className="w-4/5 flex flex-col h-full bg-gray-600">
        <ControlHeader disabled={true} workoutName={props.data[index].workoutActivityType} />
        <div className="bg-gray-700 h-2/5 p| undefined-1 m-1 border overflow-hidden">
          <Map
            lat={ props.data[index].WorkoutGPX.Latitude }
            long={ props.data[index].WorkoutGPX.Longitude  }
            center={ props.data[index].WorkoutGPX.Center  }
            zoom={ props.data[index].WorkoutGPX.Zoom }
          />
        </div>
        <div className="bg-gray-800 h-[8%] p-4 m-1 border">
          <SelectedBreakdown data={props.data[index]} />
        </div>
        <div className="bg-gray-900 h-3/6 m-1 border overflow-hidden">
        <GraphArea data={props.data[index].WorkoutGPX.Mapping} vitalsData={props.data[index].WorkoutGPX.Vitals} />  
        </div>
      </div>
    );
  };
  

  export default WorkoutOutputs;
  