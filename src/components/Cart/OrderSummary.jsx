import { useState, useEffect, useRef, useEffectEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { applyPromo, removePromo } from "../../store/slices/cartSlice";
import { useWindow } from "../../hooks/useWidth";
import toast from "react-hot-toast";
import AvailableOffers from "./AvailableOffers";

const OrderSummary = ({ checkOut }) => {
  const { items, promoDiscount, promoCode, promoError } = useSelector(
    (state) => state.cart,
  );

  const [coupon, setCoupon] = useState(promoCode || "");
  const dispatch = useDispatch();
  const width = useWindow();

  const isPromoApplied = promoDiscount > 0;

  const coupounEvent = useEffectEvent(() => {
    setCoupon(promoCode || "");
  });

  useEffect(() => {
    coupounEvent();
  }, [promoCode]);

  const prevDiscountRef = useRef(promoDiscount);
  const prevErrorRef = useRef(promoError);

  useEffect(() => {
    if (promoError && promoError !== prevErrorRef.current) {
      toast.error(promoError);
    }

    if (promoDiscount > 0 && prevDiscountRef.current <= 0) {
      toast.success("Coupon applied successfully 🎉");
    }

    prevErrorRef.current = promoError;
    prevDiscountRef.current = promoDiscount;
  }, [promoError, promoDiscount]);

  const itemsTotal = items.reduce(
    (sum, item) => sum + item.price * item.qty,
    0,
  );

  const gst = itemsTotal * 0.025;
  const originalShipping = itemsTotal > 0 ? 20 : 0;
  const shipping = isPromoApplied ? 0 : originalShipping;
  const total = itemsTotal + gst + shipping - promoDiscount;

  return (
    <>
      {items.length > 0 && (
        <div
          className={`w-full ${
            width < 1091 ? "max-w-full" : "max-w-lg"
          } bg-gray/60 rounded-10  border border-dark-blue
          p-3.5 md:p-6 h-fit sticky top-30 text-white`}
        >
          <h2 className="text-xl lg:text-3xl font-semibold mb-4 text-dark-blue">
            Order Summary
          </h2>

          <div className="space-y-3 text-base">
            <div className="flex justify-between text-gray-500">
              <span className="text-lg">Total Price ({items.length})</span>
              <span className=" text-lg text-dark-button-blue font-medium">
                ₹{itemsTotal.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between text-gray-500">
              <span className="text-lg">Shipping Rate</span>

              <div className="text-dark-button-blue font-medium flex items-center gap-2">
                {isPromoApplied ? (
                  <>
                    <span className="line-through text-gray-400">
                      ₹{originalShipping.toFixed(2)}
                    </span>
                    <span className="text-dark-blue font-semibold">0.00</span>
                  </>
                ) : (
                  <span>+ ₹{originalShipping.toFixed(2)}</span>
                )}
              </div>
            </div>

            <div className="flex justify-between text-gray-500">
              <span className="text-lg">GST (2.5%)</span>
              <span className="text-dark-button-blue font-medium">
                + ₹{gst.toFixed(2)}
              </span>
            </div>

            {/* Coupon Input */}
          </div>

          <div className="flex justify-between items-center mt-5 mb-6 border-t border-dark-blue pt-4">
            <span className="text-lg font-semibold text-black">
              Total Price
            </span>
            <span className="text-xl font-bold text-green-600">
              ₹{total.toFixed(2)}
            </span>
          </div>

          <div className="w-full flex items-center border border-gray-200 rounded-lg overflow-hidden mb-4">
            <input
              type="text"
              placeholder="Enter Coupon Code"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              disabled={isPromoApplied}
              className={`px-4 py-3 outline-none text-gray-600 placeholder-gray-400 w-full ${
                isPromoApplied ? "bg-gray-100 cursor-not-allowed" : ""
              }`}
            />

            {!isPromoApplied ? (
              <button
                className="bg-dark-button-blue hover:bg-blue-900 transition 
                  text-white font-semibold px-6 py-3 
                  disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!coupon.trim()}
                onClick={() => {
                  if (!coupon.trim()) {
                    toast.error("Please enter a coupon code");
                    return;
                  }
                  dispatch(applyPromo(coupon));
                }}
              >
                Apply
              </button>
            ) : (
              <button
                className="bg-red-600 hover:bg-red-700 transition 
                  text-white font-semibold px-6 py-3"
                onClick={() => dispatch(removePromo())}
              >
                Remove
              </button>
            )}
          </div>
          <button
            className="w-full bg-dark-button-blue 
            hover:bg-blue-900 transition 
            text-white font-semibold 
            py-1.5 md:py-3 rounded-lg text-lg cursor-pointer"
            onClick={checkOut}
          >
            Check Out
          </button>
          <div className="w-full border-t border-dashed border-gray-600 mt-4"></div>
          <AvailableOffers />
        </div>
      )}
    </>
  );
};

export default OrderSummary;
