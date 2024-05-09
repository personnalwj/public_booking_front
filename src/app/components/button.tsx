import React from "react";

type ButtonProps = {
    onClick?: () => void;
    className?: string;
    children: React.ReactNode;
    type?: "button" | "submit";
}

const Button: React.FC<ButtonProps> = ({ onClick, children, className, type = 'submit' }: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-indigo-900 hover:bg-indigo-500  focus:outline-none focus:shadow-outline text-white px-4 py-2 rounded-md mt-2 w-full mx-auto ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
