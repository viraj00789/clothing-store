import { useId, useRef } from "react";

const Input = ({
  label,
  error,
  id,
  className = "",
  onChange,
  icon,
  ...props
}) => {
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

  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium">
          {label} {props.required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="relative">
        {/* Left icon (only if provided) */}
        {icon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 bottom-0.5">
            {icon}
          </div>
        )}

        <input
          ref={inputRef}
          id={inputId}
          {...props}
          onChange={handleChange}
          onClick={handleClick}
          className={`
            block w-full rounded-[5px]
            border
            py-3.5
            ${error ? "border-red-400" : "border-light-gray-2"}
            ${icon ? "pl-10" : "pl-3"} 
            focus:outline-none
            ${error ? "focus:ring-red-300" : "focus:ring-primary"}
            transition
            placeholder:text-dark-gray
            text-dark-gray
            font-normal
            text-sm
            ${className}
          `}
        />
      </div>

      {error && (
        <p className="text-xs text-red-500 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};

export default Input;
