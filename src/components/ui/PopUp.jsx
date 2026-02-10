import { useEffect } from "react";

const PopUp = ({ isOpen, onClose, buttonTitle = "Close", children }) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      {/* Modal Box */}
      <div className="relative bg-white rounded-lg p-6 w-[90%] max-w-md shadow-lg z-10">
        {/* Content */}
        <div className="mb-4">{children}</div>

        {/* Action Button */}
        <div className="flex justify-end w-full">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition w-full text-lg 2xl:text-xl cursor-pointer font-bold"
          >
            {buttonTitle}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
