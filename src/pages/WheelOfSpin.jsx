import { useNavigate } from "react-router";
import { useWindow } from "../hooks/useWidth";
import ContainerLayout from "../layout/ContainerLayout";
import { IoArrowBackSharp } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import { COLORS, rewards } from "../../data/WheelOfSpinData";
import "../wheel.css";
import { Confetti } from "./Confetti";
import { getItem, setItem } from "../utils/localStorage";
import toast from "react-hot-toast";
import { products } from "../../data/ProductDetailsData";
import { addToCart } from "../store/slices/cartSlice";
import { useDispatch } from "react-redux";

const WheelOfSpin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const width = useWindow();
  const [spinning, setSpinning] = useState(false);
  const [winner, setWinner] = useState(null);
  console.log("🚀 ~ WheelOfSpin ~ winner:", winner);
  const [showModal, setShowModal] = useState(false);
  const [spinCount, setSpinCount] = useState(0);
  const canvasRef = useRef(null);
  const currentRotation = useRef(0);
  const [eligibleProducts, setEligibleProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  console.log("🚀 ~ WheelOfSpin ~ selectedProduct:", selectedProduct);
  const [showEligible, setShowEligible] = useState(false);
  const isSpinValue = getItem("spinned");
  const [isClaimed, setIsClaimed] = useState(false);

  const numSegments = rewards.length;
  const segmentAngle = (2 * Math.PI) / numSegments;

  const drawWheel = (rot = 0) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const size = canvas.width;
    const cx = size / 2;
    const cy = size / 2;
    const radius = size / 2 - 8;

    ctx.clearRect(0, 0, size, size);

    // Outer ring glow
    ctx.save();
    ctx.shadowColor = "#fff";
    ctx.shadowBlur = 18;
    ctx.beginPath();
    ctx.arc(cx, cy, radius + 4, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(255,255,255,0.15)";
    ctx.lineWidth = 6;
    ctx.stroke();
    ctx.restore();

    rewards.forEach((label, i) => {
      const startAngle = rot + i * segmentAngle;
      const endAngle = startAngle + segmentAngle;

      // Segment fill
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = COLORS[i];
      ctx.fill();

      // Segment border
      ctx.strokeStyle = "rgba(0,0,0,0.25)";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Label - centered in segment, readable orientation
      ctx.save();
      ctx.translate(cx, cy);
      const midAngle = startAngle + segmentAngle / 2;
      ctx.rotate(midAngle);

      const fontSize = size < 340 ? 10 : size < 420 ? 12 : 14;
      ctx.font = `bold ${fontSize}px 'Syne', sans-serif`;
      ctx.fillStyle = "#fff";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.shadowColor = "rgba(0,0,0,0.6)";
      ctx.shadowBlur = 4;

      // Place text at ~65% of radius from center
      const textRadius = radius * 0.62;

      // Split long labels into two lines
      const words = label.split(" ");
      if (words.length === 1) {
        ctx.fillText(label, textRadius, 0);
      } else {
        const line1 = words[0];
        const line2 = words.slice(1).join(" ");
        const lineHeight = fontSize * 1.3;
        ctx.fillText(line1, textRadius, -lineHeight / 2);
        ctx.fillText(line2, textRadius, lineHeight / 2);
      }

      ctx.restore();
    });

    // // Center circle
    // const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 38);
    // grad.addColorStop(0, "#2a2a3e");
    // grad.addColorStop(1, "#1a1a2e");
    // ctx.beginPath();
    // ctx.arc(cx, cy, 36, 0, Math.PI * 2);
    // ctx.fillStyle = grad;
    // ctx.fill();
    // ctx.strokeStyle = "rgba(255,255,255,0.2)";
    // ctx.lineWidth = 3;
    // ctx.stroke();

    // Center logo
    // ctx.font = "bold 16px 'Syne', sans-serif";
    // ctx.textAlign = "center";
    // ctx.fillStyle = "#fff";
    // ctx.shadowColor = "rgba(255,255,255,0.6)";
    // ctx.shadowBlur = 8;
    // ctx.fillText("SPIN", cx, cy + 6);
    // ctx.shadowBlur = 0;
  };

  useEffect(() => {
    drawWheel(currentRotation.current);
  }, []);

  useEffect(() => {
    if (getItem("spinned") === new Date().toISOString().split("T")[0]) {
      toast("You have already spin the wheel today! 🎉");
      navigate("/"); // redirect to home or another page
      // return; // stop rendering the wheel
    }
  }, [navigate]);
  const today = new Date().toISOString().split("T")[0];

  const spin = () => {
    if (spinning) return;

    if (getItem("spinned") === today) {
      toast.error("You have already spinned the wheel today.");
      return;
    }

    setSpinning(true);
    setWinner(null);
    setShowModal(false);
    setItem("spinned", today);

    const extraSpins = (5 + Math.random() * 5) * 2 * Math.PI;
    const stopOffset = Math.random() * 2 * Math.PI;
    const totalRotation = currentRotation.current + extraSpins + stopOffset;

    const duration = 4000 + Math.random() * 1000;
    const startTime = performance.now();
    const startRot = currentRotation.current;

    const easeOut = (t) => 1 - Math.pow(1 - t, 4);

    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOut(progress);
      const rot = startRot + (totalRotation - startRot) * eased;
      currentRotation.current = rot;
      drawWheel(rot);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        currentRotation.current = totalRotation;
        drawWheel(totalRotation);

        // Determine winner: pointer is at top (angle = -PI/2 or 3PI/2)
        // The pointer points to the right (0 deg = right), but visually we want top
        // Pointer at top = -Math.PI/2 offset
        // Normalize rotation
        const normalized =
          ((totalRotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

        // Pointer is at top → subtract 90deg (Math.PI / 2)
        const pointerAngle = (normalized + Math.PI / 2) % (2 * Math.PI);

        // Reverse direction because wheel rotates clockwise visually
        const corrected = (2 * Math.PI - pointerAngle) % (2 * Math.PI);

        const winnerIndex = Math.floor(corrected / segmentAngle) % numSegments;

        setWinner(rewards[winnerIndex]);
        setSpinning(false);
        setSpinCount((c) => c + 1);
        setTimeout(() => setShowModal(true), 300);
      }
    };

    requestAnimationFrame(animate);
  };
  const handleClaimReward = () => {
    setShowModal(false);

    // Filter products that match wheel winner value
    const matchedProducts = products.filter(
      (product) => product.spinValue === winner,
    );

    setEligibleProducts(matchedProducts);
    setShowEligible(true);
  };

  return (
    <ContainerLayout>
      <div className="w-full flex flex-col px-3 md:px-25 lg:px-20 xl:px-10 2xl:px-85 pt-20 lg:pt-30 pb-15 lg:pb-20 space-y-6 xl:space-y-12">
        {/* Header */}
        <div className="flex items-center gap-3">
          {width >= 768 && (
            <IoArrowBackSharp
              size={30}
              className="cursor-pointer"
              onClick={() => navigate(-1)}
            />
          )}
          <h1 className="text-xl md:text-2xl lg:text-4xl font-bold">
            Wheel Of Spin
          </h1>
        </div>
        <div className="flex items-center justify-center">
          <div className="container">
            <div className="title-wrap">
              {/* <div className="title">Spin & Win</div>
            <div className="subtitle">Try your luck today</div> */}
            </div>

            <div
              className="wheel-wrap"
              style={{ width: "min(88vw, 500px)", height: "min(88vw, 500px)" }}
            >
              <div className="wheel-glow" />
              <canvas
                ref={canvasRef}
                width={420}
                height={420}
                style={{ width: "100%", height: "100%" }}
              />
              <div className="pointer-wrap">
                <div className="pointer" />
              </div>
            </div>

            {!isSpinValue && (
              <button className="spin-btn" onClick={spin} disabled={spinning}>
                {spinning ? "Spinning..." : "🎰 Spin Now"}
              </button>
            )}

            {/* <div className="rewards-row">
            {rewards.map((r, i) => (
              <div
                key={i}
                className={`reward-chip ${winner === r ? "active" : ""}`}
              >
                {r}
              </div>
            ))}
          </div> */}
          </div>
        </div>

        {showEligible && (
          <div className="eligible-products mt-6 max-w-full mx-auto">
            <h3 className="text-lg md:text-xl font-semibold mb-3">
              Select One Product Of{" "}
              <span className="text-green-600">({winner})</span>
            </h3>

            {eligibleProducts.length === 0 ? (
              <p>No products available for this reward.</p>
            ) : (
              <div className="flex gap-3">
                {eligibleProducts.map((product) => {
                  const isSelected = selectedProduct?.id === product.id;
                  const isDisabled =
                    isClaimed || (selectedProduct && !isSelected);

                  return (
                    <div
                      key={product.id}
                      onClick={() => {
                        if (!isDisabled) setSelectedProduct(product);
                      }}
                      className={`border p-2 rounded ${
                        isSelected ? "border-green-500" : "border-gray-300"
                      } ${isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                    >
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-75 h-75 object-cover rounded"
                      />
                      <p className="text-lg mt-2 font-medium">
                        {product.title}
                      </p>
                      <p className="text-lg font-bold">₹{product.price}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
        {eligibleProducts.length > 0 && winner && !isClaimed && (
          <button
            className={`mt-4 px-4 py-2 rounded bg-green-500 text-white ${
              !selectedProduct
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer"
            } spin-btn max-w-fit mx-auto `}
            onClick={() => {
              if (!selectedProduct) return;

              const productWithSpin = {
                ...selectedProduct,
                spinApplied: true, // <-- mark this product as having spin applied
              };

              dispatch(addToCart(productWithSpin));
              setIsClaimed(true); // 🔒 Lock everything
              setShowEligible(false);
              // Optional: hide products
              navigate("/cart");
            }}
            disabled={!selectedProduct}
          >
            Claim Product
          </button>
        )}

        {showModal && winner && (
          <>
            <Confetti />
            <div className="modal-overlay">
              <div className="modal" onClick={(e) => e.stopPropagation()}>
                <span className="modal-icon">🎉</span>
                <div className="modal-label text-lg">
                  Congratulations! You won
                </div>
                <div className="modal-reward">{winner}</div>
                <button className="modal-btn" onClick={handleClaimReward}>
                  Claim Reward →
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </ContainerLayout>
  );
};

export default WheelOfSpin;
