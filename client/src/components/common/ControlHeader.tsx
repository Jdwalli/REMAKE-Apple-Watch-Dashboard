import React, { FunctionComponent } from "react";
import { ArrowButton } from "./ArrowButton";

interface Props {
    workoutName: string
    disabled: boolean
}

const ControlHeader: FunctionComponent<Props> = (props:Props) => {
    return (
        <div className="bg-gray-800 h-1/10 p-2 m-1 mb-0 border">
            <div className="flex items-center justify-between">
                <ArrowButton variant="primary" direction="left" disabled={props.disabled}/>
                <span className="ml-2 text-white text-2xl"> {props.workoutName} </span>
                <ArrowButton variant="primary" direction="right" disabled={props.disabled} />
            </div>
            
        </div>
    );
  };
  

  export default ControlHeader;
  