import React from "react";

type Props = {
  children: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disabled?: boolean;
};

const Button: React.VFC<Props> = React.memo(
  ({ children, onClick, disabled }) => (
    <button
      className={`${
        disabled ? "bg-indigo-300" : "bg-indigo-600 hover:bg-indigo-700"
      } text-white font-bold py-2 px-4 rounded`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
);
export default Button;
