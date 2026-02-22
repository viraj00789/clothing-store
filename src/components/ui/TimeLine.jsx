import { useLocation, Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa";

export default function Timeline({ steps = [] }) {
  const location = useLocation();

  const currentIndex = steps.findIndex(
    (step) => step.path === location.pathname,
  );

  const adjustedProgress =
    currentIndex >= 0 ? (currentIndex / (steps.length - 1)) * 100 - 2 : 0;

  const progress = Math.min(adjustedProgress, 100);

  return (
    <div className="w-full px-3">
      <div className="max-w-5xl mx-auto relative w-full">
        <div className="absolute top-3 sm:top-6 left-0 right-0 mx-[25px] sm:mx-6 h-[3px]">
          <div className="w-full h-full bg-gray-300 rounded-full" />

          <div
            className="absolute top-0 left-0 h-full bg-blue-800 rounded-full transition-all duration-700 ease-in-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Steps */}
        <div className="flex justify-between relative">
          {steps.map((step, index) => {
            const isCompleted = index < currentIndex;
            const isActive = index === currentIndex;

            return (
              <Link
                key={index}
                to={step.path}
                className="flex flex-col items-center z-2"
              >
                {/* Circle */}
                <div
                  className={`w-6 h-6 sm:w-12 sm:h-12 flex items-center justify-center rounded-full border-2 font-semibold
                    ${
                      isCompleted
                        ? "bg-blue-800 border-blue-800 text-white"
                        : isActive
                          ? "border-blue-800 text-blue-800 bg-white"
                          : "border-gray-300 text-gray-500 bg-white"
                    }
                  `}
                >
                  {isCompleted ? <FaCheck size={14} /> : index + 1}
                </div>

                {/* Label */}
                <span
                  className={`mt-3 text-sm font-medium
                    ${
                      isCompleted || isActive
                        ? "text-gray-900"
                        : "text-gray-400"
                    }
                  `}
                >
                  {step.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
