import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeHolder?: string;
  type?: string;
  className?: string;
  id?: string;
  name?: string;
  label: string;
  labelClassName?: string;
}

const Input = ({
    placeHolder,
    className,
    type,
    id,
    name,
    label,
    labelClassName,
    ...props
  }: InputProps, ref: any) => {
  return (
    <>
      <label
        htmlFor={name}
        className={`block text-sm font-medium leading-6 text-gray-900 ${labelClassName}`}
      >
        {label}
      </label>
      <input
        className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${className}`}
        type={type}
        placeholder={placeHolder}
        id={id}
        name={name}
        ref={ref}
        {...props}
      />
    </>
  );
};

const MyInput = React.forwardRef(Input);

export default MyInput;
