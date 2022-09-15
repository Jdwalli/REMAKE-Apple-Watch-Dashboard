import React, { FunctionComponent } from 'react';
import {
    FaArrowRight,
    FaArrowLeft,
  } from "react-icons/fa"; 

interface Props {
  variant: 'primary' | 'secondary' | 'disabled';
  direction: 'left' | 'right'
  type?: 'button' | 'submit' | 'reset' | undefined;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}

const primaryStyles =
  'bg-aquamarine-700 text-white h-10 w-10 flex items-center justify-center text-xl rounded-full border-2 border-aquamarine-500';
const secondaryStyles =
  'bg-purple-700 text-white h-10 w-10 flex items-center justify-center text-xl rounded-full border-2 border-purple-500';
const disabled = 
  'bg-black-400 text-blue-500 h-10 w-10 flex items-center justify-center text-xl rounded-full opacity-70 cursor-not-allowed border-2 border-blue-500';



const styles = {
  primary: primaryStyles,
  secondary: secondaryStyles,
  disabled: disabled,
};

const ArrowButton: FunctionComponent<Props> = (props: Props) => {
  const classes = `${styles[props.variant]} ${props.className ? props.className : ''}`;
  const type = props.type ? props.type : 'button';

  return (
    <button
      className={classes}
      onClick={props.onClick}
      type={type}
      disabled={props.disabled ?? false}
    >
      {props.direction === 'left' ? <FaArrowLeft /> : <FaArrowRight />}
    </button>
  );
};

export { ArrowButton };