import { useDispatch, useSelector } from "react-redux";
import { applyPromo } from "../../store/slices/cartSlice";

const AvailableOffers = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);

  const itemsTotal = items.reduce(
    (sum, item) => sum + item.price * item.qty,
    0,
  );

  const offers = [
    {
      code: "SAVE100",
      discount: 100,
      minAmount: 1000,
      expires: "31st December 2026 | 11:59 PM",
      recommended: true,
    },
    {
      code: "OFF500",
      discount: 500,
      minAmount: 2000,
      expires: "31st December 2026 | 11:59 PM",
      recommended: false,
    },
  ];

  return (
    <div className="bg-white p-6 rounded-lg border border-light-blue md:shadow-lg max-w-full">
      <h2 className="text-xl font-semibold text-light-black mb-3">
        Available offers
      </h2>

      {offers.map((offer, index) => {
        const eligible = itemsTotal >= offer.minAmount;
        const missingAmount = offer.minAmount - itemsTotal;

        return (
          <div key={index} className="mb-0">
            {offer.recommended && (
              <p className="text-lg font-medium text-light-black mb-2">
                Recommended
              </p>
            )}

            {/* Coupon Row */}
            <div className="flex items-center justify-between">
              <div className="border border-dashed border-dark-gray px-6 py-2 text-light-black font-normal tracking-wide">
                {offer.code}
              </div>

              <button
                disabled={!eligible}
                onClick={() => dispatch(applyPromo(offer.code))}
                className={`text-sm font-medium transition cursor-pointer ${
                  eligible
                    ? "text-dark-button-blue"
                    : "text-gray-400 cursor-not-allowed"
                }`}
              >
                Apply
              </button>
            </div>

            {/* Offer Details */}
            <div className="mt-3 space-y-1 text-gray-700">
              <p>Save Rs {offer.discount}</p>
              <p>
                Rs. {offer.discount} off on minimum purchase of RS.{" "}
                {offer.minAmount}.
              </p>
              <p className="text-gray-600 text-sm">
                Expires on: {offer.expires}
              </p>
            </div>

            {/* Not Eligible Message */}
            {!eligible && itemsTotal > 0 && (
              <p className="text-red-500 mt-2 text-sm">
                Add items worth Rs {missingAmount} to apply this offer
              </p>
            )}

            {index !== offers.length - 1 && (
              <div className="border-t border-light-gray-5 my-4"></div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default AvailableOffers;
