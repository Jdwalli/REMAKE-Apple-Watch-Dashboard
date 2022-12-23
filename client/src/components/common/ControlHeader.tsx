import React, { FunctionComponent } from "react";
import { ArrowButton } from "./ArrowButton";
import { updateIndex } from "../../redux/features/workoutIndexSlice";
import { RootState } from "../../redux/store";
import { useSelector, useDispatch } from "react-redux";

interface Props {
  workoutName: string;
  disabled: boolean;
  maxIndex: number;
}

const ControlHeader: FunctionComponent<Props> = (props: Props) => {
  const index = useSelector((state: RootState) => state.workoutIndex.index);
  const dispatch = useDispatch();

  const Increment = () => {
    if (index < props.maxIndex) {
      handleIndexChange(index + 1);
    }
  };

  const Decrement = () => {
    if (index > 0) {
      handleIndexChange(index - 1);
    }
  };

  const handleIndexChange = (newIndex: number) => {
    dispatch(updateIndex(newIndex));
  };

  return (
    <div className="bg-gray-800 h-1/10 p-2 m-1 mb-0 border">
      <div className="flex items-center justify-between">
        <ArrowButton
          variant="primary"
          direction="left"
          disabled={props.disabled}
          onClick={Decrement}
        />
        <span className="ml-2 text-white text-2xl"> {props.workoutName} </span>
        <ArrowButton
          variant="primary"
          direction="right"
          disabled={props.disabled}
          onClick={Increment}
        />
      </div>
    </div>
  );
};

export default ControlHeader;
