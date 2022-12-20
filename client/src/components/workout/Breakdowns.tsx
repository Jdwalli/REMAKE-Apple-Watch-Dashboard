import React, { FunctionComponent } from "react";
import { WorkoutsStatisticsProps, Workout } from "../../types/Workout";
import { WorkoutIconMapping } from "./WorkoutIcons";
import { FaFire } from "react-icons/fa";
import { string } from "prop-types";
import { convertUnits } from "../../helpers/Formats";

interface AllWorkoutBreakdownProps {
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

export const AllBreakdowns: FunctionComponent<AllWorkoutBreakdownProps> = (
  props: AllWorkoutBreakdownProps
) => {
  return (
    <div className="h-3/5 bg-gray-700 overflow-y-auto p-2">
      {props.data.map((workout) => {
        return <WorkoutCard data={workout} />;
      })}
    </div>
  );
};

interface SpecificBreakdownProps {
  data: Workout;
}

interface BreakdownDesc {
  name?: string;
  value?: string | number;
  unit?: string;
}

const SelectedBreakdownArea: FunctionComponent<BreakdownDesc> = (
  props: BreakdownDesc
) => {
  return (
    <div className="flex mx-2">
      <div className="">
        {WorkoutIconMapping[props.name as keyof typeof WorkoutIconMapping]}
      </div>
      <div className=" relative ml-2">
        <div className="text-md font-bold">{props.value}</div>
        <div className="">{props.unit}</div>
      </div>
    </div>
  );
};

export const SelectedBreakdown: FunctionComponent<SpecificBreakdownProps> = (
  props: SpecificBreakdownProps
) => {
  return (
    <div className="flex justify-evenly items-center">
      {
        <SelectedBreakdownArea
          name={"Duration"}
          value={props.data.duration}
          unit={props.data.unit}
        />
      }
      {
        <SelectedBreakdownArea
          name={"Distance"}
          value={props.data.totalDistance}
          unit={props.data.totalDistanceUnit}
        />
      }
      {
        <SelectedBreakdownArea
          name={"Calories"}
          value={props.data.totalEnergyBurned}
          unit={props.data.totalEnergyBurnedUnit}
        />
      }
      {props.data.MetadataEntry?.map((entry) => {
        if (entry.key === "Elevation Ascended"){
          return <SelectedBreakdownArea name={entry.key}
        value={convertUnits(entry.value, entry.unit, 'ft')}
        unit={'ft'} />;
        } else{
          return <SelectedBreakdownArea name={entry.key}
        value={entry.value}
        unit={entry.unit} />;

        }
        
      })}
    </div>
  );
};
