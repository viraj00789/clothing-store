import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import ContainerLayout from "../layout/ContainerLayout";
import { IoArrowBackSharp, IoCardOutline } from "react-icons/io5";
import { FaPaypal, FaGooglePay, FaMoneyBillWave } from "react-icons/fa";
import toast from "react-hot-toast";
import { useWindow } from "../hooks/useWidth";
import { useEffect, useState } from "react";
import OrderSuccessModal from "../components/OrderSuccessModal";

const iconMap = {
  card: <IoCardOutline size={20} />,
  paypal: <FaPaypal size={20} />,
  cod: <FaMoneyBillWave size={20} />,
  gpay: <FaGooglePay size={20} />,
};

const FinalSummary = () => {
  const navigate = useNavigate();
  const width = useWindow();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const { items, promoCode, promoDiscount } = useSelector(
    (state) => state.cart,
  );

  const { selectedMethod, methods, cards, selectedCard } = useSelector(
    (state) => state.payment,
  );

  const selectedAddress = useSelector((state) =>
    state.address.addresses.find((a) => a.id === state.address.selectedId),
  );

  // 🔢 Calculations
  const itemsTotal = items.reduce(
    (sum, item) => sum + item.price * item.qty,
    0,
  );

  const baseShipping = items.length > 0 ? 40 : 0;
  const shipping = promoDiscount > 0 ? 0 : baseShipping;
  const importCharges = 128;
  const finalTotal = itemsTotal + shipping + importCharges - promoDiscount;

  const selectedMethodData = methods.find((m) => m.id === selectedMethod);

  const selectedCardData = cards.find((c) => c.id === selectedCard);

  const handlePayment = () => {
    if (!selectedAddress) {
      toast.error("Please select address.");
      return;
    }

    if (!selectedMethod) {
      toast.error("Please select payment method.");
      return;
    }

    toast.success("Payment Successful 🎉");
    // navigate("/");

    setShowSuccessModal(true);
  };

  useEffect(() => {
    if (items.length === 0) {
      toast.error("Please review your cart.");
      navigate("/cart", { replace: true });
    }
  }, [location.key, navigate]);

  return (
    <ContainerLayout>
      <div className="w-full flex flex-col px-3 md:px-25 lg:px-20 xl:px-10 2xl:px-85 pt-20 lg:pt-30 pb-15 lg:pb-20 space-y-6 xl:space-y-12">
        <div className="flex items-center gap-3">
          {width >= 768 && (
            <IoArrowBackSharp
              size={30}
              className="cursor-pointer"
              onClick={() => navigate("/payment")}
            />
          )}
          <h1 className="text-xl md:text-2xl lg:text-4xl font-bold">
            Final Summary
          </h1>
        </div>
        {/* ===== Items ===== */}
        <div className="bg-white rounded-lg p-4 space-y-4 border border-gray-300">
          <h2 className="font-bold text-lg">Order Items</h2>

          {items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b pb-3"
            >
              <div className="flex gap-3">
                <div>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-gray-500">Qty: {item.qty}</p>
                </div>
              </div>
              <p className="font-semibold">${item.price * item.qty}</p>
            </div>
          ))}
        </div>
        {/* ===== Address ===== */}
        <div
          onClick={() => navigate("/address")}
          className="bg-white rounded-lg p-4 border border-gray-300 cursor-pointer"
        >
          <h2 className="font-bold text-lg mb-2">Delivery Address</h2>

          {selectedAddress ? (
            <div className="text-sm text-gray-700">
              <p>{selectedAddress.street}</p>
              <p>
                {selectedAddress.city}, {selectedAddress.country}
              </p>
              <p>ZIP: {selectedAddress.zip}</p>
              <p>Phone: {selectedAddress.phone}</p>
            </div>
          ) : (
            <p className="text-red-500">No address selected</p>
          )}
        </div>
        {/* ===== Payment Method ===== */}
        <div
          onClick={() => navigate("/payment")}
          className="bg-white rounded-lg p-4 border border-gray-300 cursor-pointer"
        >
          <h2 className="font-bold text-lg mb-2">Payment Method</h2>

          {selectedMethodData && (
            <div className="flex items-center gap-3">
              {iconMap[selectedMethodData.icon]}
              <span>{selectedMethodData.label}</span>
            </div>
          )}

          {selectedMethod === "card" && selectedCardData && (
            <p className="text-sm text-gray-500 mt-1">
              **** **** **** {selectedCardData.cardNumber.slice(-4)}
            </p>
          )}
        </div>
        {/* ===== Price Breakdown ===== */}
        <div className="bg-white rounded-lg p-4 border border-gray-300 space-y-2">
          <div className="flex justify-between">
            <span>Items ({items.length})</span>
            <span>+₹{itemsTotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between">
            <span>Shipping</span>
            {promoDiscount > 0 ? (
              <span className="text-green-600 font-medium">-0.00</span>
            ) : (
              <span>₹{shipping.toFixed(2)}</span>
            )}
          </div>

          <div className="flex justify-between">
            <span>Import Charges</span>
            <span> +₹{importCharges.toFixed(2)}</span>
          </div>

          {promoCode && promoDiscount > 0 && (
            <div className="flex justify-between text-green-600 font-medium mb-3">
              <span>Promo ({promoCode})</span>
              <span>- ₹{promoDiscount.toFixed(2)}</span>
            </div>
          )}

          <hr />

          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>₹{finalTotal.toFixed(2)}</span>
          </div>
        </div>
        {/* ===== Pay Button ===== */}
        {width >= 1024 && (
          <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
            <span className="text-lg font-bold">{finalTotal.toFixed(2)}</span>

            <button
              onClick={handlePayment}
              className="bg-dark-button-blue text-white px-8 py-3 rounded font-bold cursor-pointer"
            >
              Pay Now
            </button>
          </div>
        )}
        <div
          className="fixed bottom-0 left-0 right-0 z-13 h-[65px] bg-gray-100 border-t border-gray-200 flex lg:hidden justify-between items-center gap-2 px-3 w-full shadow-[0_-1px_6px_rgba(0,0,0,0.06)]
        "
        >
          <span className="text-lg font-bold">${finalTotal.toFixed(2)}</span>

          <button
            onClick={handlePayment}
            className="bg-dark-button-blue text-white px-8 py-3 rounded font-bold cursor-pointer"
          >
            Pay Now
          </button>
        </div>
        <OrderSuccessModal
          isOpen={showSuccessModal}
          onClose={() => setShowSuccessModal(false)}
          orderId={"ORD"}
          amount={finalTotal.toFixed(2)}
        />{" "}
      </div>
    </ContainerLayout>
  );
};

export default FinalSummary;
