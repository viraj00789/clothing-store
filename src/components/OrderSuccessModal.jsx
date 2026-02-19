const OrderSuccessModal = ({ isOpen, onClose, orderId, amount }) => {
  if (!isOpen) return null;

  const now = new Date();
  const formattedDate = now.toLocaleDateString();
  const formattedTime = now.toLocaleTimeString();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md">
      <div
        className="bg-white w-[95%] sm:w-[400px] lg:w-[500px]
        rounded-3xl shadow-2xl p-4 xl:p-10 text-center animate-scaleIn"
      >
        {/* 🔥 BIG Premium Animation */}
        <div className="flex justify-center mb-6">
          <lottie-player
            src="https://assets2.lottiefiles.com/packages/lf20_s2lryxtd.json"
            background="transparent"
            speed="1"
            style={{ width: "200px", height: "200px" }}
            autoplay
          ></lottie-player>
        </div>

        <h2 className="text-3xl font-bold text-green-600">
          Payment Successful 🎉
        </h2>

        <p className="text-gray-600 mt-3 text-lg">
          Your order has been placed successfully.
        </p>

        {/* Order Details Box */}
        <div className="mt-4 xl:mt-6 text-left bg-gray-50 rounded-xl p-6 space-y-3 text-base">
          <div className="flex justify-between">
            <span className="text-gray-500">Order ID:</span>
            <span className="font-semibold">{orderId}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Amount Paid:</span>
            <span className="font-bold text-green-600 text-lg">
              ₹{amount || "0.00"}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Date:</span>
            <span>{formattedDate}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Time:</span>
            <span>{formattedTime}</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-8 w-full bg-dark-button-blue hover:bg-blue-900 
          text-white py-3 rounded-xl text-lg font-semibold transition cursor-pointer"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default OrderSuccessModal;
