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
    if (promoError && promoError !== prevErrorRef.current)
      toast.error(promoError);
    if (promoDiscount > 0 && prevDiscountRef.current <= 0)
      toast.success("Coupon applied successfully 🎉");

    prevErrorRef.current = promoError;
    prevDiscountRef.current = promoDiscount;
  }, [promoError, promoDiscount]);

  // --- HANDLE SPIN REWARD LOGIC ---
  const getDiscountedPrice = (item) => {
    let price = item.price; // base price after existing product discount

    if (item.spinApplied && item.spinValue) {
      if (item.spinValue.includes("%")) {
        const match = item.spinValue.match(/(\d+)%/);
        if (match) {
          const discount = parseInt(match[1], 10);
          price = price * (1 - discount / 100);
        }
      }

      if (item.spinValue === "Free Product") {
        price = 0;
      }
    }

    return price;
  };

  const isFreeShipping = items.some(
    (item) => item.spinValue === "Free Shipping",
  );

  // Totals
  const itemsOriginalTotal = items.reduce(
    (sum, item) => sum + item.price * item.qty,
    0,
  );
  const itemsDiscountedTotal = items.reduce(
    (sum, item) => sum + getDiscountedPrice(item) * item.qty,
    0,
  );
  // const totalSpinDiscount = itemsOriginalTotal - itemsDiscountedTotal;

  const gst = itemsDiscountedTotal * 0.025;
  const originalShipping = itemsOriginalTotal > 0 ? 20 : 0;
  const shipping = isPromoApplied || isFreeShipping ? 0 : originalShipping;
  const total = itemsDiscountedTotal + gst + shipping - promoDiscount;

  return (
    <>
      {items.length > 0 && (
        <div
          className={`w-full ${width < 1091 ? "max-w-full" : "max-w-lg"} bg-gray/60 rounded-10 sm:border border-dark-blue sm:p-3.5 md:p-6 h-fit sticky top-30 text-white`}
        >
          <h2 className="text-xl lg:text-3xl font-semibold mb-4 text-dark-blue">
            Order Summary
          </h2>

          {/* Wheel Reward Notification */}
          {items.some(
            (item) =>
              item.spinApplied &&
              item.spinValue &&
              item.spinValue !== "Free Shipping",
          ) && (
            <div className="mb-4 p-2 rounded bg-green-100 text-green-700 font-semibold">
              You got a reward from the wheel!
            </div>
          )}

          <div className="space-y-3 text-base">
            {/* Items */}
            {items.map((item) => {
              const discountedPrice = getDiscountedPrice(item);
              const isDiscounted = discountedPrice < item.price;

              return (
                <div
                  key={item.id}
                  className="flex justify-between items-center text-gray-500"
                >
                  <div className="flex flex-col">
                    <span className="text-lg">
                      {item.title} x {item.qty}
                    </span>
                    {" "}
                    {item.spinApplied &&
                      item.spinValue &&
                      item.spinValue !== "Free Product" &&
                      item.spinValue !== "Free Shipping" && (
                        <span className="text-green-500 text-sm font-semibold">
                          {item.spinValue} applied
                        </span>
                      )}
                    {item.spinApplied && item.spinValue === "Free Product" && (
                      <span className="text-green-500 text-sm font-semibold">
                        Free Product!
                      </span>
                    )}
                  </div>

                  <span className="text-lg text-dark-button-blue font-medium">
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
                      <>₹{(item.price * item.qty).toFixed(2)}</>
                    )}
                  </span>
                </div>
              );
            })}

            {/* Shipping */}
            <div className="flex justify-between text-gray-500 mt-2">
              <span className="text-lg">Shipping Rate</span>
              <div className="text-dark-button-blue font-medium flex items-center gap-2">
                {shipping === 0 && !isPromoApplied ? (
                  <span className="text-green-500 font-semibold">Free</span>
                ) : isPromoApplied ? (
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

            {/* GST */}
            <div className="flex justify-between text-gray-500">
              <span className="text-lg">GST (2.5%)</span>
              <span className="text-dark-button-blue font-medium">
                + ₹{gst.toFixed(2)}
              </span>
            </div>

            {/* Spin Discount */}
            {/* {totalSpinDiscount > 0 && (
              <div className="flex justify-between text-gray-500">
                <span className="text-lg">Wheel Discount</span>
                <span className="text-green-500 font-semibold">
                  - ₹{totalSpinDiscount.toFixed(2)}
                </span>
              </div>
            )} */}

            {/* Coupon Discount */}
            {promoDiscount > 0 && (
              <div className="flex justify-between text-gray-500">
                <span className="text-lg">Coupon Discount</span>
                <span className="text-green-500 font-semibold">
                  - ₹{promoDiscount.toFixed(2)}
                </span>
              </div>
            )}
          </div>

          {/* Total */}
          <div className="flex justify-between items-center mt-5 mb-6 border-t border-dark-blue pt-4">
            <span className="text-lg font-semibold text-black">
              Total Price
            </span>
            <span className="text-xl font-bold text-green-600">
              ₹{total.toFixed(2)}
            </span>
          </div>

          {/* Coupon Input */}
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
                className="bg-dark-button-blue hover:bg-blue-900 transition text-white font-semibold px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
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
                className="bg-red-600 hover:bg-red-700 transition text-white font-semibold px-6 py-3 cursor-pointer"
                onClick={() => dispatch(removePromo())}
              >
                Remove
              </button>
            )}
          </div>

          <button
            className="w-full bg-dark-button-blue hover:bg-blue-900 transition text-white font-semibold py-1.5 md:py-3 rounded-lg text-lg cursor-pointer"
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
