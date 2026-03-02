import { FaCheck } from "react-icons/fa";

export default function Timeline({ steps = [], currentStep = 0 }) {
  const progress =
    steps.length > 1 ? (currentStep / (steps.length - 1)) * 100 : 0;

  return (
    <div className="w-full">
      <div className="relative w-full">
        {/* Line */}
        <div className="absolute left-1 right-[7px] md:right-1 top-5 md:top-6 h-[3px]">
          <div className="w-full h-full bg-gray-300 rounded-full" />
          <div
            className="absolute top-0 -left-px right-1 h-full bg-blue-800 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Steps */}
        <div className="flex justify-between relative z-9">
          {steps.map((step, index) => {
            const isCompleted = index < currentStep;
            const isActive = index === currentStep;
            const Icon = step.icon;

            return (
              <div key={step.label} className="flex flex-col items-center">
                {/* Circle */}
                <div
                  className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full border-2 transition-all
                    ${
                      isCompleted
                        ? "bg-blue-800 border-blue-800 text-white"
                        : isActive
                          ? "border-blue-800 text-blue-800 bg-white"
                          : "border-gray-300 text-gray-400 bg-white"
                    }
                  `}
                >
                  {isCompleted ? <FaCheck size={16} /> : <Icon size={18} />}
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
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
