import { useRef, useState } from "react";
import imageTest from "../../public/image_test.png";

const slices = [
  { id: 1, image: imageTest, value: "Reward 1" },
  { id: 2, image: imageTest, value: "Reward 2" },
  { id: 3, image: imageTest, value: "Reward 3" },
  { id: 4, image: imageTest, value: "Reward 4" },
  { id: 5, image: imageTest, value: "Reward 5" },
];

export default function SpinWheel() {
  const wheelRef = useRef(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState(null);

  const spinWheel = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setWinner(null);

    const sliceAngle = 360 / slices.length;

    // Random slice index
    const randomIndex = Math.floor(Math.random() * slices.length);

    // Extra full rotations (for smooth effect)
    const extraSpins = 5;

    // Calculate final rotation
    const finalRotation =
      360 * extraSpins + (360 - randomIndex * sliceAngle - sliceAngle / 2);

    wheelRef.current.style.transition =
      "transform 4s cubic-bezier(0.17, 0.67, 0.83, 0.67)";
    wheelRef.current.style.transform = `rotate(${finalRotation}deg)`;

    setTimeout(() => {
      const selectedSlice =
        wheelRef.current.querySelectorAll(".slice")[randomIndex];

      const value = selectedSlice.dataset.value;
      setWinner(value);
      setIsSpinning(false);
    }, 4000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      {/* Pointer */}
      <div className="relative">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 z-10 w-0 h-0 
                        border-l-[15px] border-r-[15px] border-b-[25px] 
                        border-l-transparent border-r-transparent border-b-red-500"
        />

        {/* Wheel */}
        <div
          ref={wheelRef}
          className="relative w-96 h-96 rounded-full border-8 border-white overflow-hidden"
        >
          {slices.map((slice, index) => {
            const sliceAngle = 360 / slices.length;
            const rotation = index * sliceAngle;

            return (
              <div
                key={slice.id}
                className="slice absolute w-full h-full flex items-center justify-center"
                data-value={slice.value}
                style={{
                  transform: `rotate(${rotation}deg) skewY(${
                    90 - sliceAngle
                  }deg)`,
                  transformOrigin: "50% 100%",
                }}
              >
                <div
                  className="absolute bottom-1/2 left-1/2 w-24 h-24 -translate-x-1/2"
                  style={{
                    transform: `skewY(-${90 - sliceAngle}deg) rotate(${
                      sliceAngle / 2
                    }deg)`,
                  }}
                >
                  <img
                    src={slice.image}
                    alt={slice.value}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Button */}
      <button
        onClick={spinWheel}
        disabled={isSpinning}
        className="mt-8 px-6 py-3 bg-yellow-500 hover:bg-yellow-400 
                   text-black font-bold rounded-lg disabled:opacity-50"
      >
        {isSpinning ? "Spinning..." : "Spin"}
      </button>

      {/* Result */}
      {winner && (
        <div className="mt-6 text-2xl font-bold text-green-400">
          🎉 Winner: {winner}
        </div>
      )}
    </div>
  );
}
