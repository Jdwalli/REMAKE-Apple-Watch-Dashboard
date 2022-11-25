import React, { useState, FunctionComponent } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { CompactNumber } from '../../helpers/Formats'
import { ActivityIconMap } from '../common/iconMap'
interface Props {
  metricName: string;
  value: number;
  metricText: string;
  change: number;
  className?: string;
}


// If change is less than zero the change is red and negative down arrow (make components for this )


const MetricCard: FunctionComponent<Props> = (props: Props) => {
  return (
    <div className=" shadow rounded-2xl p-2 w-full bg-gray-800 text-white  relative overflow-hidden">
      <div className="flex items-center px-2 py-3 space-x-2">
        <span className="rounded-xl text-3xl p-4 mr-2 h-full bg-aquamarine-700 text-white relative">
          {ActivityIconMap[props.metricName as keyof typeof ActivityIconMap]}
        </span>
        <div>
          <div className="flex items-center">
            <p className="text-white text-3xl text-left font-bold mt-2 mr-2">
              {CompactNumber(props.value)}
            </p>
            <span className={`${props.change > 0 ? 'text-green-500' : 'text-red-500'} text-md mt-2 font-bold flex items-center`}>
              {
                props.change > 0 ? (<FaArrowUp className="h-3" />) : <FaArrowDown className="h-3" />
              }
              
              {`${props.change}%`}
            </span>
          </div>
          <span className=""> {props.metricText} </span>
        </div>
      </div>
    </div>
  );
};

export { MetricCard };
