import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import ContainerLayout from "../layout/ContainerLayout";
import { IoArrowBackSharp, IoCardOutline } from "react-icons/io5";
import { FaPaypal, FaGooglePay, FaMoneyBillWave } from "react-icons/fa";
import toast from "react-hot-toast";
import { useWindow } from "../hooks/useWidth";
import { useEffect, useState } from "react";
import OrderSuccessModal from "../components/OrderSuccessModal";
import { addOrder } from "../store/slices/orderSlice";
import { clearCart } from "../store/slices/cartSlice";
import { resetPayment } from "../store/slices/paymentSlice";
import { resetAddress } from "../store/slices/addressSlice";
import { nanoid } from "@reduxjs/toolkit";
import { FaAngleRight } from "react-icons/fa6";
import Timeline from "../components/ui/TimeLine";
import { checkoutSteps } from "../../data/TimeLineData";
import delTruck from "../assets/del-truck.svg";

const iconMap = {
  card: <IoCardOutline size={20} />,
  paypal: <FaPaypal size={20} />,
  cod: <FaMoneyBillWave size={20} />,
  gpay: <FaGooglePay size={20} />,
};

const FinalSummary = () => {
  const navigate = useNavigate();
  const width = useWindow();
  const dispatch = useDispatch();
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

  // 🔢 Helper: get discounted price including spin rewards
  const getDiscountedPrice = (item) => {
    let price = item.price;

    if (item.spinApplied && item.spinValue) {
      if (item.spinValue.includes("%")) {
        const match = item.spinValue.match(/(\d+)%/);
        if (match) price = price * (1 - parseInt(match[1], 10) / 100);
      }
      if (item.spinValue === "Free Product") price = 0;
    }

    return price;
  };

  // Totals
  const itemsTotal = items.reduce(
    (sum, item) => sum + getDiscountedPrice(item) * item.qty,
    0,
  );
  const isFreeShipping = items.some(
    (item) => item.spinValue === "Free Shipping",
  );
  const shipping =
    promoDiscount > 0 || isFreeShipping ? 0 : items.length > 0 ? 20 : 0;
  const gst = itemsTotal * 0.025;
  const importCharges = 128;
  const finalTotal =
    itemsTotal + shipping + importCharges - promoDiscount + gst;

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
    setShowSuccessModal(true);
  };

  const handleOrder = () => {
    const newOrder = {
      id: `ORD-${nanoid()}`,
      items,
      address: selectedAddress,
      paymentMethod: selectedMethodData,
      card:
        selectedMethod === "card" && selectedCardData
          ? selectedCardData.cardNumber.slice(-4)
          : null,
      promoCode,
      promoDiscount,
      itemsTotal,
      shipping,
      importCharges,
      total: finalTotal,
      createdAt: new Date().toISOString(),
    };
    dispatch(addOrder(newOrder));
    dispatch(clearCart());
    dispatch(resetPayment());
    dispatch(resetAddress());
    navigate("/orders");
  };

  useEffect(() => {
    if (items.length === 0) {
      toast.error("Please review your cart.");
      navigate("/cart", { replace: true });
    }
  }, [navigate, items.length]);

  return (
    <ContainerLayout>
      {items.length > 0 && (
        <div className="w-full flex flex-col px-3 md:px-25 lg:px-20 xl:px-10 2xl:px-85 pt-20 lg:pt-30 pb-15 lg:pb-20 space-y-6 xl:space-y-12">
          <Timeline steps={checkoutSteps} />
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

          {/* Delivery Estimation */}
          <div className="bg-white py-4 border-b border-light-blue lg:border-gray-300 flex items-center gap-2">
            <img src={delTruck} alt="delivery truck" loading="lazy" />
            <p className="font-normal text-sm lg:text-lg">
              Estimated Delivery by Thursday, 07 Oct
            </p>
          </div>

          {/* Order Items */}
          <div className="bg-white lg:rounded-lg lg:p-4 space-y-4 lg:border lg:border-gray-300">
            <h2 className="font-bold text-lg">Order Items</h2>

            {items.map((item) => {
              const discountedPrice = getDiscountedPrice(item);
              const isDiscounted = discountedPrice < item.price;

              return (
                <div
                  key={item.id}
                  className="flex justify-between items-center border-b border-light-blue lg:border-gray-300 pb-3 last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <div>
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-22 h-22 object-cover rounded-5"
                      />
                    </div>
                    <div>
                      <p className="font-bold text-light-black text-sm">
                        {item.title}
                      </p>
                      <p className="text-sm text-gray-500">Qty: {item.qty}</p>
                      <p className="font-bold text-lg text-dark-button-blue">
                        {isDiscounted ? (
                          <>
                            <span className="line-through text-gray-400">
                              ₹{(item.price * item.qty).toFixed(2)}
                            </span>{" "}
                            <span className="text-green-500 font-semibold">
                              ₹{(discountedPrice * item.qty).toFixed(2)}
                            </span>
                          </>
                        ) : (
                          <>₹{(discountedPrice * item.qty).toFixed(2)}</>
                        )}
                      </p>
                    </div>
                  </div>
                  <p className="font-bold text-lg text-dark-button-blue cursor-pointer">
                    <FaAngleRight
                      className="text-light-black"
                      onClick={() => navigate("/cart")}
                    />
                  </p>
                </div>
              );
            })}
          </div>

          {/* Delivery Address */}
          <div
            onClick={() => navigate("/address")}
            className="bg-white lg:rounded-lg py-4 lg:p-4 border-t lg:border border-light-blue lg:border-gray-300 cursor-pointer"
          >
            <h2 className="font-bold text-lg mb-4.5">Delivery Address</h2>
            {selectedAddress ? (
              <div className="flex justify-between w-full items-center">
                <div className="text-sm text-gray-700">
                  <p className="text-light-black text-sm lg:text-lg font-medium">
                    {selectedAddress.street}
                  </p>
                  <p className="text-light-black text-sm lg:text-lg font-medium">
                    {selectedAddress.city}, {selectedAddress.country}
                  </p>
                  <p className="text-light-black text-sm lg:text-lg font-medium">
                    ZIP: {selectedAddress.zip}
                  </p>
                  <p className="text-light-black text-sm lg:text-lg font-medium">
                    Phone: {selectedAddress.phone}
                  </p>
                </div>
                <p className="font-bold text-lg text-dark-button-blue">
                  <FaAngleRight
                    className="text-light-black"
                    onClick={() => navigate("/address")}
                  />
                </p>
              </div>
            ) : (
              <p className="text-red-500">No address selected</p>
            )}
          </div>

          {/* Payment Method */}
          <div
            onClick={() => navigate("/payment")}
            className="bg-white lg:rounded-lg py-4 lg:p-4 border-t lg:border border-light-blue lg:border-gray-300 cursor-pointer"
          >
            <h2 className="font-bold text-sm lg:text-lg text-light-black mb-4.5">
              Payment Method
            </h2>
            <div className="flex justify-between items-center">
              <div>
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
              <p className="font-bold text-sm sm:text-lg text-dark-button-blue">
                <FaAngleRight
                  className="text-light-black"
                  onClick={() => navigate("/payment")}
                />
              </p>
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="bg-white rounded-lg p-4 border border-gray-300 space-y-2">
            <div className="flex justify-between">
              <span className="text-dark-blue font-normal text-sm sm:text-lg">
                Items ({items.length})
              </span>
              <span className="text-dark-button-blue font-normal text-sm sm:text-lg">
                +₹{itemsTotal.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-dark-blue font-normal text-sm sm:text-lg">
                Shipping
              </span>
              {shipping === 0 ? (
                <span className="text-green-600 font-medium">Free</span>
              ) : (
                <span className="text-dark-button-blue font-normal text-sm sm:text-lg">
                  +₹{shipping.toFixed(2)}
                </span>
              )}
            </div>

            <div className="flex justify-between">
              <span className="text-dark-blue font-normal text-sm sm:text-lg">
                GST
              </span>
              <span className="text-dark-button-blue font-normal text-sm sm:text-lg">
                +₹{gst.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-dark-blue font-normal text-sm sm:text-lg">
                Import Charges
              </span>
              <span className="text-dark-button-blue font-normal text-sm sm:text-lg">
                +₹{importCharges.toFixed(2)}
              </span>
            </div>

            {promoDiscount > 0 && (
              <div className="flex justify-between text-green-600 font-medium mb-3">
                <span>Promo ({promoCode})</span>
                <span>- ₹{promoDiscount.toFixed(2)}</span>
              </div>
            )}

            <hr />

            <div className="flex justify-between font-bold text-lg">
              <span className="text-dark-blue font-normal text-sm sm:text-lg">
                Total
              </span>
              <span className="text-dark-button-blue font-bold text-lg">
                ₹{finalTotal.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Pay Button */}
          {width >= 1024 && (
            <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
              <div>
                <span className="text-xl font-bold text-dark-button-blue">
                  ₹{finalTotal.toFixed(2)}
                </span>
                <p
                  className="text-light-black text-sm sm:text-lg font-medium cursor-pointer"
                  onClick={() => navigate("/cart")}
                >
                  View Price Details
                </p>
              </div>

              <button
                onClick={handlePayment}
                className="bg-dark-button-blue text-white px-13 py-3 rounded font-bold cursor-pointer"
              >
                Pay Now
              </button>
            </div>
          )}

          <div className="fixed bottom-0 left-0 right-0 z-13 h-[65px] bg-gray-100 border-t border-gray-200 flex lg:hidden justify-between items-center gap-2 px-3 w-full shadow-[0_-1px_6px_rgba(0,0,0,0.06)]">
            <div>
              <span className="text-xl font-bold text-dark-button-blue">
                ₹{finalTotal.toFixed(2)}
              </span>
              <p
                className="text-light-black text-sm font-medium"
                onClick={() => navigate("/cart")}
              >
                View Price Details
              </p>
            </div>

            <button
              onClick={handlePayment}
              className="bg-dark-button-blue text-white px-15.5 py-3 rounded font-bold cursor-pointer"
            >
              Pay Now
            </button>
          </div>

          <OrderSuccessModal
            isOpen={showSuccessModal}
            onClose={() => setShowSuccessModal(false)}
            orderId={"ORD"}
            amount={finalTotal.toFixed(2)}
            onOrder={handleOrder}
          />
        </div>
      )}
    </ContainerLayout>
  );
};

export default FinalSummary;
