import React, { FunctionComponent } from 'react';

interface Props {
  variant: 'primary' | 'secondary' | 'disabled';
  type?: 'button' | 'submit' | 'reset' | undefined;
  text: string;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}

const primaryStyles =
  'text-sm text-white bg-aquamarine-700 px-5 py-2 mx-2 rounded hover:bg-aquamarine border-2 border-aquamarine-500';
const secondaryStyles =
  'text-sm text-purple-500 bg-black-500 text-primary px-5 py-2 mx-2 rounded hover:bg-gray border-2 border-purple-500';
const disabled =
  'text-sm text-blue-500 bg-black-400 text-primary  px-5 py-2 mx-2 rounded opacity-70 cursor-not-allowed border-2 border-blue-500';

const styles = {
  primary: primaryStyles,
  secondary: secondaryStyles,
  disabled: disabled,
};

const Button: FunctionComponent<Props> = (props: Props) => {
  const classes = `${styles[props.variant]} ${props.className ? props.className : ''}`;
  const type = props.type ? props.type : 'button';

  return (
    <button
      className={classes}
      onClick={props.onClick}
      type={type}
      disabled={props.disabled ?? false}
    >
      {props.text}
    </button>
  );
};

export { Button };