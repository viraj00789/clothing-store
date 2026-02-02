import { useId, useRef } from "react";

const Input = ({ label, error, id, className = "", onChange, ...props }) => {
  const inputRef = useRef(null);
  const generatedId = useId();
  const inputId = id ?? generatedId;

  const handleChange = (e) => {
    if (onChange) {
      onChange(e);
    }
  };

  const handleClick = () => {
    if (props.type === "date") {
      inputRef.current?.showPicker?.();
    }
  };

  const isDateEmpty = props.type === "date" && !props.value;

  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text">
          {label} {props.required && <span className="text-red-500">*</span>}
        </label>
      )}

      <input
        ref={inputRef}
        id={inputId}
        {...props}
        onChange={handleChange}
        onClick={handleClick}
        className={`
          block w-full rounded-md
          border
          ${error ? "border-red-400" : "border-gray-300 dark:border-gray-600"}
          hover:border-gray-400
          px-3 py-2 lg:py-2 lg:px-4
          text-sm
          focus:outline-none
          focus:ring-2
          ${error ? "focus:ring-red-300" : "focus:ring-primary"}
          transition bg-gray-100 dark:bg-dark-blue
          ${isDateEmpty ? "text-gray-400" : "text-gray-900 dark:text-white"}
          ${className}
        `}
      />

      {error && (
        <p className="text-xs text-red-500 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};

export default Input;
