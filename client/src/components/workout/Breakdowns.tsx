import React, { FunctionComponent } from "react";
import { WorkoutsStatisticsProps } from "../../types/Workout";
import { WorkoutIconMapping } from "./WorkoutIcons";

interface BreakdownProps {
  data: WorkoutsStatisticsProps[];
}

interface WorkoutCardProps {
  data: WorkoutsStatisticsProps;
}

const WorkoutCard: FunctionComponent<WorkoutCardProps> = (
  props: WorkoutCardProps
) => {
  const formattedWorkout = props.data.WorkoutType.substring(21).replace(
    /([a-z])([A-Z])/g,
    "$1 $2"
  ) as string;

  return (
    <div className="border rounded mb-2">
      <div className="border-b px-4 py-2 bg-gray-200">
        <p className="flex items-center justify-center text-md font-bold text-center">
          <div className="rounded mr-2">
          {
            WorkoutIconMapping[
              formattedWorkout as keyof typeof WorkoutIconMapping
            ]
          }{" "}
          </div>
          <span>{formattedWorkout}</span>
        </p>
      </div>
      <div className="px-4 py-3 bg-white">
        <div className="flex justify-between">
          <span className="font-semibold text-sm">Max Duration:</span>{" "}
          <span className="font-bold text-indigo-600 text-sm">
            {props.data.MaxDuration}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold text-sm">
            Max Total Energy Burned:
          </span>{" "}
          <span className="font-bold text-indigo-600 text-sm">
            {props.data.MaxTotalEnergyBurned}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold text-sm">
            Min Total Energy Burned:
          </span>{" "}
          <span className="font-bold text-indigo-600 text-sm">
            {props.data.MinTotalEnergyBurned}
          </span>
        </div>

        {props.data.MaxTotalDistance > 0 ? (
          <>
            <div className="flex justify-between">
              <span className="font-semibold text-sm">Max Distance:</span>{" "}
              <span className="font-bold text-indigo-600 text-sm">
                {props.data.MaxTotalDistance}{" "}
              </span>
            </div>
          </>
        ) : null}
        {props.data.MinTotalDistance > 0 ? (
          <>
            <div className="flex justify-between">
              <span className="font-semibold text-sm">Min Distance:</span>{" "}
              <span className="font-bold text-indigo-600 text-sm">
                {" "}
                {props.data.MinTotalDistance}{" "}
              </span>
            </div>
          </>
        ) : null}
        {props.data.MinDuration > 0 ? (
          <p>
            <div className="flex justify-between">
              <span className="font-semibold text-sm">Min Duration:</span>{" "}
              <span className="font-bold text-indigo-600 text-sm">
                {" "}
                {props.data.MinDuration}{" "}
              </span>
            </div>
          </p>
        ) : null}
      </div>
    </div>
  );
};

const Breakdowns: FunctionComponent<BreakdownProps> = (
  props: BreakdownProps
) => {
  return (
    <div className="h-3/5 bg-gray-700 overflow-y-auto p-2">
      {props.data.map((workout) => {
        return <WorkoutCard data={workout} />;
      })}
    </div>
  );
};

export default Breakdowns;
