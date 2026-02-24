const CustomCheckbox = ({
  checked,
  onChange,
  label,
  count,
  boxSize = "h-6 w-6",
  checkSize = 7,
}) => {
  return (
    <label className="flex items-center gap-2 cursor-pointer select-none">
      <div className="relative inline-flex items-center justify-center">
        {/* Hidden Input */}
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="peer sr-only"
        />

        {/* Background Box */}
        <div
          className={`
            ${boxSize}
            border border-gray-400 bg-white
            transition-all duration-150
            peer-checked:border-dark-gray
            peer-checked:bg-dark-gray
            w-[14px] h-[14px]
          `}
        />

        {/* Checkmark */}
        <svg
          className="
            absolute text-white pointer-events-none
            transition-transform duration-200
            scale-0 peer-checked:scale-100
          "
          width={checkSize}
          height={checkSize}
          viewBox="0 0 10 8"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M1.5 4 L4 6.5 L8.5 1" />
        </svg>
      </div>

      {/* Label */}
      {label && (
        <span className="text-light-black text-lg font-normal">{label}</span>
      )}

      {/* Count */}
      {count !== undefined && (
        <span className="text-dark-gray text-lg font-normal">({count})</span>
      )}
    </label>
  );
};

export default CustomCheckbox;
