import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContainerLayout from "../layout/ContainerLayout";
import { FaPaypal, FaMoneyBillWave } from "react-icons/fa";
import { FaGooglePay } from "react-icons/fa6";
import { IoCardOutline } from "react-icons/io5";
import toast from "react-hot-toast";
import { FiTrash2, FiEdit2 } from "react-icons/fi";
import {
  addCard,
  deleteCard,
  editCard,
  selectCard,
  selectMethod,
} from "../store/slices/paymentSlice";
import { useNavigate } from "react-router";
import { useWindow } from "../hooks/useWidth";
import { IoArrowBackSharp } from "react-icons/io5";

const iconMap = {
  card: <IoCardOutline size={22} />,
  paypal: <FaPaypal size={22} />,
  cod: <FaMoneyBillWave size={22} />,
  gpay: <FaGooglePay size={22} />,
};

const PaymentPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const width = useWindow();
  const { methods, selectedMethod, cards, selectedCard } = useSelector(
    (state) => state.payment,
  );
  const [showForm, setShowForm] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    holder: "",
    cardName: "",
  });
  const [editingId, setEditingId] = useState(null);

  const items = useSelector((state) => state.cart.items);

  useEffect(() => {
    if (items.length === 0) {
      toast.error("Please review your cart before payment.");
      navigate("/cart", { replace: true });
    }
  }, [location.key, navigate]);

  // ✅ Validation
  const validate = () => {
    const err = {};

    if (!/^\d{16}$/.test(form.cardNumber))
      err.cardNumber = "Card number must be 16 digits.";

    if (!/^\d{2}\/\d{2}$/.test(form.expiry))
      err.expiry = "Expiry must be MM/YY.";

    if (!/^\d{3}$/.test(form.cvv)) err.cvv = "CVV must be 3 digits.";

    if (!form.holder.trim()) err.holder = "Card holder name required.";

    if (!form.cardName.trim()) err.cardName = "Card name required.";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleAddCard = () => {
    setIsSubmitted(true);

    if (!validate()) return;

    if (editingId) {
      dispatch(editCard({ id: editingId, data: form }));
      toast.success("Card updated successfully");
    } else {
      dispatch(addCard(form));
      toast.success("Card added successfully");
    }

    setShowForm(false);
    setForm({
      cardNumber: "",
      expiry: "",
      cvv: "",
      holder: "",
      cardName: "",
    });

    setEditingId(null);
    setErrors({});
    setIsSubmitted(false);
  };

  const handleEdit = (card) => {
    setForm({
      cardNumber: card.cardNumber,
      expiry: card.expiry,
      cvv: card.cvv,
      holder: card.holder,
      cardName: card.cardName,
    });

    setEditingId(card.id);
    setShowForm(true);
    setIsSubmitted(false);
  };

  const handleContinue = () => {
    if (!selectedMethod) {
      toast.error("Please select a payment method.");
      return;
    }

    if (selectedMethod === "card") {
      if (cards.length === 0) {
        toast.error("Please add a card first.");
        return;
      }

      if (!selectedCard) {
        toast.error("Please select a saved card.");
        return;
      }
    }

    toast.success("Payment method selected successfully.");

    // navigate to review page
    navigate("/final-summary");
  };

  useEffect(() => {
    if (selectedMethod === "card") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShowForm(true);
    } else {
      setShowForm(false);
    }
  }, [selectedMethod]);

  useEffect(() => {
    if (cards.length > 0) {
      dispatch(selectCard(cards[0].id));
    } else {
      dispatch(selectCard(null));
    }
  }, [cards]);

  return (
    <ContainerLayout>
      {items.length > 0 && (
        <div className="w-full flex flex-col px-3 md:px-25 lg:px-20 xl:px-10 2xl:px-85 pt-20 lg:pt-30 pb-15 lg:pb-20 space-y-6 xl:space-y-12">
          <div className="flex items-center gap-3">
            {width >= 768 && (
              <IoArrowBackSharp
                size={30}
                className="cursor-pointer"
                onClick={() => navigate("/address")}
              />
            )}
            <h1 className="text-xl md:text-2xl lg:text-4xl font-bold">
              Choose Payment
            </h1>
          </div>

          <div className="flex flex-col lg:flex-row gap-4">
            {/* ✅ Payment Methods */}
            <div className="space-y-3 w-full">
              {methods.map((method) => (
                <div
                  key={method.id}
                  onClick={() => {
                    dispatch(selectMethod(method.id));
                    setErrors({});
                    setEditingId(null);
                    setForm({
                      cardNumber: "",
                      expiry: "",
                      cvv: "",
                      holder: "",
                      cardName: "",
                    });

                    if (method.id === "card") {
                      setShowForm(true);
                    } else {
                      setShowForm(false);
                    }
                  }}
                  className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer
                ${
                  selectedMethod === method.id
                    ? "bg-blue-100 border-dark-button-blue"
                    : "border-gray-300"
                }`}
                >
                  {iconMap[method.icon]}
                  <span className="font-medium">{method.label}</span>
                </div>
              ))}
            </div>

            {/* Card Form */}
            {showForm && (
              <div className="space-y-2 border p-4 lg:p-6 rounded-lg w-full bg-white shadow-sm border-gray-300">
                {/* Card Number */}
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">
                    Card Number
                  </label>
                  <input
                    type="text"
                    value={form.cardNumber}
                    maxLength={16}
                    className={`w-full p-3 rounded transition-colors duration-200 border ${
                      isSubmitted && errors.cardNumber
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-dark-button-blue"
                    }`}
                    onChange={(e) => {
                      setForm({
                        ...form,
                        cardNumber: e.target.value.replace(/\D/g, ""),
                      });
                      setErrors({ ...errors, cardNumber: "" });
                    }}
                  />
                  {isSubmitted && errors.cardNumber && (
                    <p className="text-red-500 text-sm">{errors.cardNumber}</p>
                  )}
                </div>

                {/* Expiry + CVV */}
                <div className="flex gap-4">
                  <div className="w-full space-y-1">
                    <label className="text-sm font-medium text-gray-700">
                      Expiry (MM/YY)
                    </label>
                    <input
                      type="text"
                      value={form.expiry}
                      maxLength={5}
                      className={`w-full p-3 rounded transition-colors duration-200 border ${
                        isSubmitted && errors.expiry
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:ring-dark-button-blue"
                      }`}
                      onChange={(e) => {
                        setForm({ ...form, expiry: e.target.value });
                        setErrors({ ...errors, expiry: "" });
                      }}
                    />
                    {isSubmitted && errors.expiry && (
                      <p className="text-red-500 text-sm">{errors.expiry}</p>
                    )}
                  </div>

                  <div className="w-full space-y-1">
                    <label className="text-sm font-medium text-gray-700">
                      CVV
                    </label>
                    <input
                      type="password"
                      value={form.cvv}
                      maxLength={3}
                      className={`w-full p-3 rounded transition-colors duration-200 border ${
                        isSubmitted && errors.cvv
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:ring-dark-button-blue"
                      }`}
                      onChange={(e) => {
                        setForm({
                          ...form,
                          cvv: e.target.value.replace(/\D/g, ""),
                        });
                        setErrors({ ...errors, cvv: "" });
                      }}
                    />
                    {isSubmitted && errors.cvv && (
                      <p className="text-red-500 text-sm">{errors.cvv}</p>
                    )}
                  </div>
                </div>

                {/* Card Holder */}
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">
                    Card Holder Name
                  </label>
                  <input
                    type="text"
                    value={form.holder}
                    className={`w-full p-3 rounded transition-colors duration-200 border ${
                      isSubmitted && errors.holder
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-dark-button-blue"
                    }`}
                    onChange={(e) => {
                      setForm({ ...form, holder: e.target.value });
                      setErrors({ ...errors, holder: "" });
                    }}
                  />
                  {isSubmitted && errors.holder && (
                    <p className="text-red-500 text-sm">{errors.holder}</p>
                  )}
                </div>

                {/* Card Name */}
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">
                    Card Name (e.g. My Visa)
                  </label>
                  <input
                    type="text"
                    value={form.cardName}
                    className={`w-full p-3 rounded transition-colors duration-200 border ${
                      isSubmitted && errors.cardName
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-dark-button-blue"
                    }`}
                    onChange={(e) => {
                      setForm({ ...form, cardName: e.target.value });
                      setErrors({ ...errors, cardName: "" });
                    }}
                  />
                  {isSubmitted && errors.cardName && (
                    <p className="text-red-500 text-sm">{errors.cardName}</p>
                  )}
                </div>

                {/* Buttons */}
                <div className="flex gap-4 pt-2">
                  <button
                    onClick={handleAddCard}
                    className="w-full bg-dark-button-blue text-white py-3 rounded font-semibold cursor-pointer"
                  >
                    Save Card
                  </button>

                  <button
                    onClick={() => {
                      setShowForm(false);
                      setErrors({});
                      setForm({});
                      setIsSubmitted(false);
                      setEditingId(null);
                    }}
                    className="w-full border border-gray-300 py-3 rounded font-semibold cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* ✅ If Card Selected */}
          <div className="space-y-4 mt-6">
            {/* ===== CARD ONLY SECTION ===== */}

            {/* Saved Cards */}
            {cards.length > 0 && (
              <>
                <p className="text-xl font-bold mt-5">Saved Cards</p>

                <div className="space-y-3">
                  {cards.map((card) => (
                    <div
                      key={card.id}
                      onClick={() => {
                        dispatch(selectCard(card.id));
                      }}
                      className={`border p-4 rounded-lg cursor-pointer flex justify-between items-center
        ${
          selectedCard === card.id
            ? "border-dark-button-blue bg-blue-50"
            : "border-gray-300"
        }`}
                    >
                      <div className="flex items-center gap-3">
                        <IoCardOutline size={25} />
                        <div>
                          <p className="font-medium">
                            **** **** **** {card.cardNumber.slice(-4)}
                          </p>
                          <p className="text-sm text-gray-500">{card.holder}</p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <FiEdit2
                          size={20}
                          className="cursor-pointer text-blue-600"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(card);
                          }}
                        />

                        <FiTrash2
                          size={20}
                          className={`cursor-pointer ${
                            editingId === card.id
                              ? "text-gray-400 cursor-not-allowed"
                              : "text-red-600"
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();

                            if (editingId === card.id) return; // 🚫 Prevent delete while editing

                            dispatch(deleteCard(card.id));
                            toast.success("Card deleted successfully");
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* ===== CONTINUE BUTTON (ALWAYS VISIBLE WHEN METHOD SELECTED) ===== */}
            {selectedMethod && width >= 1024 && (
              <div className="flex gap-4">
                {/* Add New Payment Button */}
                <button
                  onClick={() => {
                    setEditingId(null); // ✅ new card mode
                    setShowForm(true);
                    setErrors({});
                    setIsSubmitted(false);
                    setForm({
                      cardNumber: "",
                      expiry: "",
                      cvv: "",
                      holder: "",
                      cardName: "",
                    });
                  }}
                  className="w-full bg-dark-button-blue text-white py-3 rounded font-bold cursor-pointer"
                >
                  + Add New Payment
                </button>
                <button
                  onClick={handleContinue}
                  className={`w-full py-3 rounded font-bold bg-white text-dark-blue border border-dark-blue cursor-pointer ${
                    selectedMethod === "card" ? "" : ""
                  }`}
                >
                  Continue
                </button>
              </div>
            )}
          </div>
          <div
            className="fixed bottom-0 left-0 right-0 z-13 h-[65px] bg-white border-t border-gray-200 flex lg:hidden justify-center items-center gap-1 px-1 w-full shadow-[0_-1px_6px_rgba(0,0,0,0.06)]
        "
          >
            {selectedMethod && (
              <div className="flex gap-2 w-full">
                {/* Add New Payment Button */}
                <button
                  onClick={() => {
                    setEditingId(null); // ✅ new card mode
                    setShowForm(true);
                    setErrors({});
                    setIsSubmitted(false);
                    setForm({
                      cardNumber: "",
                      expiry: "",
                      cvv: "",
                      holder: "",
                      cardName: "",
                    });
                  }}
                  className="w-full bg-dark-button-blue text-white py-3 rounded font-bold cursor-pointer"
                >
                  + Add New Payment
                </button>
                <button
                  onClick={handleContinue}
                  className={`w-full py-3 rounded font-bold bg-white text-dark-blue border border-dark-blue cursor-pointer ${
                    selectedMethod === "card" ? "" : ""
                  }`}
                >
                  Continue
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </ContainerLayout>
  );
};

export default PaymentPage;
