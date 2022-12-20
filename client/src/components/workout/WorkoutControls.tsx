import React, { FunctionComponent } from "react";
import Calendar from "../common/Calendar";
import { AllBreakdowns } from "./Breakdowns";
import { WorkoutsStatisticsProps } from "../../types/Workout";
import { CalendarProps, WorkoutEvents } from "../../types/Calendar";


interface Props {
  workoutCalendarEvents: WorkoutEvents[]
  breakdownData: WorkoutsStatisticsProps[]
}
// Should take in the calendar events and all workouts 

const WorkoutControls: FunctionComponent<Props> = (props: Props) => {
  return (
    <div className="w-1/5 bg-gray-400 h-full overflow-hidden p-2 mr-3 flex flex-col">
      <div className="h-2/5 overflow-hidden bg-gray-600 mb-2">
        <Calendar workoutEvents={props.workoutCalendarEvents} />
      </div>
      <AllBreakdowns data={props.breakdownData} />
    </div>
  );
};

export default WorkoutControls;
