import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { applyPromo, removePromo } from "../../store/slices/cartSlice";
import { useWindow } from "../../hooks/useWidth";
import toast from "react-hot-toast";
import { store } from "../../store/store.js";

const OrderSummary = () => {
  const { items, promoDiscount, promoCode } = useSelector(
    (state) => state.cart,
  );

  const [coupon, setCoupon] = useState(promoCode);
  const dispatch = useDispatch();
  const width = useWindow();
  const isPromoApplied = promoDiscount > 0;

  const itemsTotal = items.reduce(
    (sum, item) => sum + item.price * item.qty,
    0,
  );

  const gst = itemsTotal * 0.25; // 5% GST
  const shipping = itemsTotal > 0 ? 20 : 0;

  const total = itemsTotal + gst + shipping - promoDiscount;

  return (
    <>
      {items.length > 0 && (
        <div
          className={`w-full  ${width < 1091 ? "max-w-full" : "max-w-md"} bg-white rounded-10 border border-light-blue lg:shadow-[0px_0px_10px_0px_#0000001A] p-3.5 md:p-6 h-fit sticky top-30`}
        >
          <h2 className="text-xl font-semibold mb-4 text-black">
            Order Summary
          </h2>

          <div className="space-y-3 text-base">
            <div className="flex justify-between text-gray-500">
              <span>Total Price ({items.length})</span>
              <span className="text-dark-button-blue font-medium">
                ₹{itemsTotal.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between text-gray-500">
              <span>Shipping Rate</span>
              <span className="text-dark-button-blue font-medium">
                ₹{shipping.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between text-gray-500">
              <span>GST (5%)</span>
              <span className="text-dark-button-blue font-medium">
                ₹{gst.toFixed(2)}
              </span>
            </div>

            {/* <div className="flex justify-between text-gray-500 pb-4 border-b border-dashed">
          <span>Import charges</span>
          <span className="text-dark-button-blue font-medium">
            ${importCharges.toFixed(2)}
          </span>
        </div> */}
            <div className="w-full flex items-center border border-gray-200 rounded-lg overflow-hidden">
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
                  className="bg-dark-button-blue hover:bg-blue-900 transition text-white font-semibold px-6 py-3 cursor-pointer w-fit disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!coupon?.trim()}
                  onClick={() => {
                    if (!coupon?.trim()) {
                      toast.error("Please enter a coupon code");
                      return;
                    }

                    dispatch(applyPromo(coupon));

                    // Read updated state AFTER dispatch (from store)
                    const { promoError } = store.getState().cart;

                    if (promoError) {
                      toast.error(promoError);
                    } else {
                      toast.success("Coupon applied successfully 🎉");
                    }
                  }}
                >
                  Apply
                </button>
              ) : (
                <button
                  className="bg-red-600 hover:bg-red-700 transition text-white font-semibold px-6 py-3 cursor-pointer w-fit disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => {
                    setCoupon("");
                    dispatch(removePromo());
                  }}
                >
                  Remove
                </button>
              )}
            </div>
          </div>

          <div className="flex justify-between items-center mt-5 mb-6">
            <span className="text-lg font-semibold text-black">
              Total Price
            </span>
            <span className="text-xl font-bold text-green-600">
              ₹{total.toFixed(2)}
            </span>
          </div>

          <button
            className="w-full bg-dark-button-blue shadow-[0px_10px_108px_0px_#40BFFF3D]
 hover:bg-blue-900 transition text-white font-semibold py-1.5 md:py-3 rounded-lg text-lg cursor-pointer"
          >
            Check Out
          </button>
        </div>
      )}
    </>
  );
};

export default OrderSummary;
