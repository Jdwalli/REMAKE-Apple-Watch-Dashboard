import React, { useState, useEffect, FunctionComponent } from "react";
import ActivityMetricsRow from "./ActivityMetricsRow";

import {
  FaHome,
  FaRunning,
  FaHeartbeat,
  FaDumbbell,
  FaBed,
  FaChartPie,
} from "react-icons/fa";

import { RecordsRequest } from "../../helpers/DataRequests";

// Lifetime workout data, 194 total miles, 120 hours, 160,545 elevation gain ft, 25 total workouts, top mph longest hours, highest temp, lowest temp,
// Make use of grids
// (Switches) on interval between total, average per day, average per month, //most in a day
// Total Steps Taken,
// Total Steps Climbed
// Calories
// Exercise minutes
// (Cycle) Highest Hr, Lowest HR< Average

// Workout Breakdown
// Contains how many times a workout has been done
// Pie chart

// Metric, Metric Text, // Change

const HomePage: FunctionComponent = (props) => {
  return (
    <div className="h-screen">
      <ActivityMetricsRow />
      <div className="grid grid-cols-4 mt-4 gap-4 h-1/2">
        <div className="bg-red-500 col-span-3"></div>
        <div className="bg-yellow-500 col-span-1"></div>
      </div>
    </div>
  );
};

export default HomePage;
