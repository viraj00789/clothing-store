const Button = ({
  title,
  buttonType = "button",
  onClick,
  className = "",
  buttonPadding = "px-2 lg:px-3 py-3.5",
  disabled = false,
}) => {
  return (
    <button
      type={buttonType}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center rounded-md text-md font-bold transition cursor-pointer bg-dark-blue hover:bg-dark-gray-500 text-white w-full ${buttonPadding} ${className}`}
    >
      {title}
    </button>
  );
};

export default Button;
