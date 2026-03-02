import { useParams, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useState } from "react";
import ContainerLayout from "../layout/ContainerLayout";
import { IoArrowBack } from "react-icons/io5";
import { FaCheckCircle, FaBoxOpen, FaTruck, FaHome } from "react-icons/fa";
import Timeline from "../components/ui/ExchangeTimline";
import { useWindow } from "../hooks/useWidth";

const reasonsList = [
  "Size too small",
  "Size too large",
  "Received wrong item",
  "Quality issue",
  "Other",
];

const ExchangeFlow = () => {
  const { orderId, itemId } = useParams();
  const navigate = useNavigate();
  const orders = useSelector((state) => state.order.orders);
  const width = useWindow();

  const order = orders.find((o) => o.id === orderId);
  const item = order?.items.find((i) => i.id === Number(itemId));

  const [step, setStep] = useState(1);
  const [reason, setReason] = useState("");
  const [newSize, setNewSize] = useState("");

  const sizes = [
    { label: "S", stock: true },
    { label: "M", stock: true },
    { label: "L", stock: false },
    { label: "XL", stock: true },
    { label: "XXL", stock: true },
  ];
  const isSizeExchange =
    reason === "Size too small" || reason === "Size too large";

  const dynamicSteps = isSizeExchange
    ? [
        { label: "Reason", icon: FaBoxOpen },
        { label: "Size", icon: FaTruck },
        { label: "Review", icon: FaHome },
        { label: "Success", icon: FaCheckCircle },
      ]
    : [
        { label: "Reason", icon: FaBoxOpen },
        { label: "Review", icon: FaHome },
        { label: "Success", icon: FaCheckCircle },
      ];

  if (!item) return <div>Item not found</div>;

  return (
    <ContainerLayout>
      <div className="w-full flex flex-col px-3 md:px-25 lg:px-20 xl:px-75 2xl:px-85 pt-20 lg:pt-30 pb-15 lg:pb-20 space-y-6 xl:space-y-12">
        {/* HEADER */}
        {width >= 768 && (
          <div className="flex items-center gap-4 mb-10">
            <IoArrowBack
              size={26}
              onClick={() => navigate(-1)}
              className="cursor-pointer text-gray-600 hover:text-black"
            />
            <h1 className="text-3xl font-bold text-gray-800">
              Exchange Product
            </h1>
          </div>
        )}

        {/* STEPPER */}
        <div className="mb-6 md:mb-10">
          <Timeline
            steps={dynamicSteps}
            currentStep={
              isSizeExchange
                ? step - 1
                : step === 1
                  ? 0
                  : step === 3
                    ? 1
                    : step === 4
                      ? 2
                      : 0
            }
          />
        </div>

        {/* MAIN CARD */}
        <div className="bg-white shadow-none md:shadow-2xl rounded-2xl p-0 md:p-4 lg:p-8 md:border md:border-gray-100">
          {/* STEP 1 */}
          {step === 1 && (
            <>
              <div className="flex items-center gap-2  mb-6">
                <h2 className="text-lg md:text-2xl font-semibold">
                  Why are you exchanging?
                </h2>
              </div>

              <div className="space-y-3">
                {reasonsList.map((r) => (
                  <label
                    key={r}
                    className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition
                    ${
                      reason === r
                        ? "border-dark-blue bg-blue-100 "
                        : "border-gray-200 hover:border-dark-blue"
                    }`}
                  >
                    <input
                      type="radio"
                      value={r}
                      checked={reason === r}
                      onChange={(e) => setReason(e.target.value)}
                    />
                    <span className="font-medium">{r}</span>
                  </label>
                ))}
              </div>

              <button
                disabled={!reason}
                onClick={() => {
                  if (
                    reason === "Size too small" ||
                    reason === "Size too large"
                  ) {
                    setStep(2);
                  } else {
                    setStep(3);
                  }
                }}
                className={`mt-8 w-full bg-dark-blue text-white py-3 rounded-xl font-semibold disabled:opacity-70 ${
                  reason
                    ? "bg-dark-blue cursor-pointer hover:bg-blue-800"
                    : "cursor-not-allowed"
                }`}
              >
                Continue
              </button>
            </>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <>
              <div className="flex items-center gap-2  mb-6">
                <IoArrowBack
                  size={26}
                  onClick={() => setStep(1)}
                  className="cursor-pointer text-gray-600 hover:text-black"
                />
                <h2 className="text-lg md:text-2xl font-semibold">
                  Select New Size{" "}
                </h2>
              </div>

              <div className="flex gap-4 flex-wrap">
                {sizes.map((size) => (
                  <button
                    key={size.label}
                    disabled={!size.stock}
                    onClick={() => setNewSize(size.label)}
                    className={`px-3 py-2 lg:px-6 lg:py-3 rounded-xl border font-semibold transition
                      ${
                        !size.stock
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : newSize === size.label
                            ? "bg-dark-blue text-white shadow-md cursor-pointer"
                            : "border-gray-300 hover:border-dark-blue cursor-pointer"
                      }`}
                  >
                    {size.label}
                  </button>
                ))}
              </div>

              <button
                disabled={!newSize}
                onClick={() => setStep(3)}
                className={`mt-8 w-full bg-dark-blue text-white py-3 rounded-xl font-semibold shadow-md disabled:opacity-40 ${
                  newSize
                    ? "bg-dark-blue cursor-pointer hover:bg-blue-800"
                    : "cursor-not-allowed"
                }`}
              >
                Continue
              </button>
            </>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <>
              <div className="flex items-center gap-2  mb-6">
                <IoArrowBack
                  size={26}
                  onClick={() => {
                    if (
                      reason === "Size too small" ||
                      reason === "Size too large"
                    ) {
                      setStep(2);
                    } else {
                      setStep(1);
                    }
                  }}
                  className="cursor-pointer text-gray-600 hover:text-black"
                />
                <h2 className="text-lg md:text-2xl font-semibold">
                  Review Exchange{" "}
                </h2>
              </div>

              <div className="flex gap-6 p-3 bg-gray-50 rounded-xl border">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-28 h-28 object-cover rounded-xl"
                />
                <div className="space-y-2">
                  <p className="font-bold text-lg">{item.title}</p>
                  <p className="text-gray-600">Old Size: M</p>
                  <p className="text-gray-600">New Size: {newSize || "M"}</p>
                  <p className="text-gray-600">Reason: {reason}</p>
                  <p className="text-green-600 font-bold">
                    Price Difference: ₹0
                  </p>
                </div>
              </div>

              <button
                onClick={() => setStep(4)}
                className="mt-8 w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-semibold shadow-md cursor-pointer"
              >
                Confirm Exchange
              </button>
            </>
          )}

          {/* STEP 4 - BEAUTIFUL TIMELINE */}
          {step === 4 && (
            <>
              <div className="flex items-center gap-2">
                <IoArrowBack
                  size={26}
                  onClick={() => setStep(3)}
                  className="cursor-pointer text-gray-600 hover:text-black"
                />
              </div>
              <div className="text-center space-y-12 sm:space-y-10">
                <div>
                  <h2 className="text-lg md:text-3xl font-bold text-green-600 mb-2">
                    Exchange Requested 🎉
                  </h2>
                  <p className="text-gray-500 text-sm md:text-2xl">
                    Your exchange process has started.
                  </p>
                </div>

                <div className="relative max-w-full sm:max-w-md mx-auto">
                  <div className="absolute left-4.5 top-5 bottom-5 w-1 bg-gray-200"></div>

                  <div className="space-y-12 text-left">
                    <div className="flex items-start gap-4 relative">
                      <div className="z-10 bg-green-500 text-white p-3 rounded-full">
                        <FaBoxOpen />
                      </div>
                      <div>
                        <h3 className="font-semibold">Pickup Scheduled</h3>
                        <p className="text-gray-500 text-sm">
                          Our courier will pick up your item soon.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 relative">
                      <div className="z-10 bg-gray-300 text-white p-3 rounded-full">
                        <FaTruck />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-400">
                          Item In Transit
                        </h3>
                        <p className="text-gray-400 text-sm">
                          Replacement will be shipped after pickup.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 relative">
                      <div className="z-10 bg-gray-300 text-white p-3 rounded-full">
                        <FaHome />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-400">
                          Replacement Delivered
                        </h3>
                        <p className="text-gray-400 text-sm">
                          New item will be delivered to your address.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => navigate("/orders")}
                  className="bg-dark-blue text-white px-8 py-3 rounded-xl font-semibold shadow-md hover:bg-blue-800 cursor-pointer"
                >
                  Go to Orders
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </ContainerLayout>
  );
};

export default ExchangeFlow;
