import React from "react";

const CustomInput = ({ forLabel, type, id, placeholder, title, onChange }) => {
  return (
    <>
      <span className="block text-xl font-medium text-white dark:text-black">
        {title}
      </span>
      <div
        htmlFor={forLabel}
        className="block bg-white overflow-hidden dark:text-white rounded-md border dark:bg-slate-500 border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
      >
        <input
          type={type}
          id={id}
          name={id}
          className="dark:text-white w-full placeholder:text-white dark:bg-slate-500 border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
          onChange={onChange}
          required
        />
      </div>
    </>
  );
};

export default CustomInput;
