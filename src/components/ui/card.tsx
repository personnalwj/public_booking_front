import React from "react";

type CardProps = {
  title: string;
  description: string;
  button?: string;
  link?: string;
  className?: string;
};

function Card({ title, description, button, link, className }: CardProps) {
  return (
    <div
      className={`p-1 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ${className}`}
    >
      <h5 className="mb-2 md:text-base tracking-tight text-gray-900 dark:text-white text-sm">
        {title}
      </h5>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-xs">
        {description}
      </p>
      {button && link && (
        <a
          href={link}
          className="block w-full px-4 py-2 text-center font-semibold text-white transition-colors duration-200 transform bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500"
        >
          {button}
        </a>
      )}
    </div>
  );
}

export default Card;
