import React, { FunctionComponent, useState } from "react";
import ParentSize from "@visx/responsive/lib/components/ParentSize";
import WorkoutLineChart from "../charts/WorkoutLineChart";
import VitalsLineChart from "../charts/VitalsLineChart";
import { GPXMapping, GPXChartOptions } from "../../types/Workout";
import { Vitals } from "../../types/Vitals";


interface Props {
  data: GPXMapping[];
  vitalsData: Vitals[];
}

const GraphArea: FunctionComponent<Props> = (props: Props) => {
  const [currentGraph, setCurrentGraph] =
    useState<GPXChartOptions>("Elevation");
  return (
    <>
      <header className="h-10 w-full bg-gray-200">
        <div className="w-3/5 h-full flex items-center justify-around">
          <button
            className={`h-full w-full text-gray-600 font-bold hover:text-black hover:border-b-2 hover:border-aquamarine-700 ${
              currentGraph === "Combined"
                ? "text-black border-b-2 border-aquamarine-700"
                : ""
            }`}
            onClick={() => setCurrentGraph("Combined")}
          >
            Combined
          </button>
          <button
            className={`h-full w-full text-gray-600 font-bold hover:text-black hover:border-b-2 hover:border-aquamarine-700 ${
              currentGraph === "Elevation"
                ? "text-black border-b-2 border-aquamarine-700"
                : ""
            }`}
            onClick={() => setCurrentGraph("Elevation")}
          >
            Elevation
          </button>
          <button
            className={`h-full w-full text-gray-600 font-bold hover:text-black hover:border-b-2 hover:border-aquamarine-700 ${
              currentGraph === "Speed"
                ? "text-black border-b-2 border-aquamarine-700"
                : ""
            }`}
            onClick={() => setCurrentGraph("Speed")}
          >
            Speed
          </button>
          <button
            className={`h-full w-full text-gray-600 font-bold hover:text-black hover:border-b-2 hover:border-aquamarine-700 ${
              currentGraph === "Heart Rate"
                ? "text-black border-b-2 border-aquamarine-700"
                : ""
            }`}
            onClick={() => setCurrentGraph("Heart Rate")}
          >
            Heart Rate
          </button>
        </div>
      </header>

      <div className="h-full">
        {currentGraph === "Heart Rate" ? (
          <ParentSize debounceTime={15}>
            {({ width: visWidth, height: visHeight }) => (
              <VitalsLineChart data={props.vitalsData} vitalType={"Heart Rate"} width={visWidth} height={visHeight} />
            )}
          </ParentSize>
        ) : (
          <ParentSize debounceTime={15}>
            {({ width: visWidth, height: visHeight }) => (
              <WorkoutLineChart
                data={props.data}
                filter={currentGraph}
                width={visWidth}
                height={visHeight}
              />
            )}
          </ParentSize>
        )}
      </div>
    </>
  );
};

export default GraphArea;
