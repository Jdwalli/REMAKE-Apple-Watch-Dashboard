import React, { FunctionComponent, useState, useEffect } from "react";
import { Workout, Default } from "../../types/Workout";
import ControlHeader from "../common/ControlHeader";
import Map from "../common/Map";
import { SelectedBreakdown } from "./Breakdowns";
import { convertTimestamp } from "../../helpers/Formats";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/types";
import GraphArea from "./GraphArea";

interface Props {
  index?: number;
  data: Workout[];
}

const WorkoutOutputs: FunctionComponent<Props> = (props: Props) => {
  const [activeButton, setActiveButton] = useState("speed");

  const [index, setIndex] = useState(0);

  const globalIndex = useSelector((state: RootState) => state.workoutIndex.index);

  useEffect(() => {
    if (globalIndex > props.data.length ){
      setIndex(0)
    }
    else {
      setIndex(globalIndex);
    }
  }, [globalIndex]);

  return (
    <div className="w-4/5 flex flex-col h-full bg-gray-600">
      <ControlHeader
        disabled={props.data.length <= 0 ? true : false}
        maxIndex={props.data.length - 1}
        workoutName={`[${index + 1}/${props.data.length}] ${
          props.data[index].workoutActivityType
        } ${convertTimestamp(props.data[index].creationDate ?? "")}`}
      />
      <div className="bg-gray-700 h-2/5 p| undefined-1 m-1 border overflow-hidden">
        <Map
          lat={props.data[index].WorkoutGPX.Latitude}
          long={props.data[index].WorkoutGPX.Longitude}
          center={props.data[index].WorkoutGPX.Center}
          zoom={props.data[index].WorkoutGPX.Zoom}
        />
      </div>
      <div className="bg-gray-800 h-[8%] p-4 m-1 border">
        <SelectedBreakdown data={props.data[index]} />
      </div>
      <div className="bg-gray-900 h-3/6 m-1 border overflow-hidden">
        <GraphArea
          data={props.data[index].WorkoutGPX.Mapping}
          vitalsData={props.data[index].WorkoutGPX.Vitals}
        />
      </div>
    </div>
  );
};

export default WorkoutOutputs;
