import React, { FunctionComponent } from "react";
import ControlHeader from "../common/ControlHeader";
import Map from "../common/Map";

interface Props {
  
} 

const WorkoutOutputs: FunctionComponent<Props> = (props:Props) => {
    return (
      <div className="w-4/5 flex flex-col h-full bg-gray-600">
        <ControlHeader disabled={false} workoutName={"Testing"} />
        <div className="bg-gray-700 h-2/5 p-1 m-1 border overflow-hidden">
          <Map
            lat={[]}
            long={[]}
            center={[33.07, 10.59]}
            zoom={2}
          />
        </div>
        <div className="bg-gray-800 h-1/6 p-4 m-1 border">Second row</div>
        <div className="bg-gray-900 h-2/5 p-4 m-1 border">Third row</div>
      </div>
    );
  };
  

  export default WorkoutOutputs;
  