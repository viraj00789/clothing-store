import { useNavigate } from "react-router";
import { useWindow } from "../hooks/useWidth";
import ContainerLayout from "../layout/ContainerLayout";
import {
  addToWishlist,
  removeFromWishlist,
} from "../store/slices/wishlistSlice";
import { useDispatch, useSelector } from "react-redux";
import { isAuthenticatedFromStorage } from "../utils/Auth";
import PinkHeart from "../assets/Icons/Home/pink-heart.svg";
import Heart from "../assets/Icons/Home/GrayIcons/home-heart.svg";
import { useCallback, useState } from "react";
import { formattedDate, formattedTime } from "../utils/date";
import { IoArrowBack } from "react-icons/io5";
import { cancelOrderItem } from "../store/slices/orderSlice";
import { RxCross2 } from "react-icons/rx";
import { FaChevronDown } from "react-icons/fa";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";

const Orders = () => {
  const width = useWindow();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated = false } = isAuthenticatedFromStorage();
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [reason, setReason] = useState("");
  const [customReason, setCustomReason] = useState("");
  const [errors, setErrors] = useState({
    reason: "",
    customReason: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const isInWishlist = useCallback(
    (id) => wishlistItems.some((item) => item.id === id),
    [wishlistItems],
  );
  const orders = useSelector((state) => {
    return state.order?.orders;
  });

  const handleWishlist = (product) => {
    if (!isAuthenticated) {
      navigate("/sign-in");
      return;
    }
    if (isInWishlist(product.id)) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  const openCancelModal = (orderId, itemId) => {
    setSelectedOrderId(orderId);
    setSelectedItemId(itemId);
    setShowModal(true);
  };

  if (orders.length === 0) {
    return (
      <ContainerLayout>
        <div className="pb-30 pt-40">
          {width >= 768 && (
            <div className="flex flex-col items-start justify-center max-w-md mx-auto">
              <div className="mb-4">
                <IoArrowBack
                  size={30}
                  onClick={() => navigate(-1)}
                  className="cursor-pointer"
                />
              </div>
            </div>
          )}
          <div className="text-center text-xl text-gray-600 flex flex-col items-center justify-center gap-10">
            <img
              src={
                "https://img.freepik.com/premium-vector/concept-disconetchion-sad-box-character-sits-with-disappointed-look-his-face-page-file-found-connection-error_705714-515.jpg?semt=ais_user_personalization&w=740&q=80"
              }
              loading="lazy"
              width={250}
              height={250}
            />
            <div className="font-bold text-2xl xl:text-3xl">
              Your Order is empty.
            </div>
          </div>
        </div>
      </ContainerLayout>
    );
  }

  return (
    <ContainerLayout>
      <div className="w-full flex flex-col px-3 md:px-25 lg:px-20 xl:px-45 2xl:px-85 pt-20 lg:pt-30 pb-15 lg:pb-20 space-y-6 xl:space-y-12">
        <div className="flex items-center gap-3">
          {width >= 768 && (
            <IoArrowBack
              size={30}
              onClick={() => navigate(-1)}
              className="cursor-pointer"
            />
          )}
          <h1 className="text-xl md:text-2xl lg:text-4xl font-bold ">
            My Orders{" "}
            {orders?.length > 0 && (
              <span className="text-dark-blue">({orders?.length} items)</span>
            )}
          </h1>
        </div>
        <div className="space-y-4">
          <div className="w-full space-y-0 lg:space-y-8 max-w-full ">
            {orders?.map((order) =>
              order.items.map((item) => (
                <div
                  className="flex items-center gap-3 w-full sm:rounded-10 sm:p-3 lg:p-4 
      lg:shadow-[0px_0px_10px_0px_#0000001A]
      border-b last:border-0 lg:border-none border-light-gray-2 py-2 max-w-full flex-wrap sm:flex-nowrap"
                  key={`${order.id}-${item.id}`}
                >
                  {/* IMAGE */}
                  <div className="flex gap-1.5 md:gap-4 items-center">
                    <div className="w-full md:w-60 lg:w-40 sm:h-80 xl:h-60 md:shrink-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        className="w-full h-full rounded-[5px] object-cover cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(item.link);
                        }}
                      />
                    </div>
                  </div>

                  {/* DETAILS */}
                  <div className="flex items-start justify-between w-full flex-col lg:flex-row gap-2">
                    <div className="flex flex-col space-y-1 sm:space-y-2">
                      <p
                        className={`text-light-black font-bold text-lg md:text-xl xl:text-2xl 
            ${width < 375 ? "max-w-21" : "max-w-[150px]"} 
            sm:max-w-full truncate`}
                        title={item.title}
                      >
                        {item.title}
                      </p>

                      <p className="font-semibold text-md text-dark-gray flex gap-2 whitespace-nowrap max-w-100 truncate">
                        <span className="text-light-black">Brand Name:</span>
                        <span>{item.brand}</span>
                      </p>

                      <p className="font-bold text-lg lg:text-xl text-dark-button-blue">
                        <span className="text-lg">₹</span> {item.price}
                      </p>
                      {item.cancelInfo && (
                        <p className="text-red-500 font-semibold mt-2">
                          {item.cancelInfo.refundStatus}
                        </p>
                      )}

                      <p className="font-semibold text-md text-dark-gray flex gap-2 items-center">
                        <span className="text-light-black whitespace-nowrap">
                          Ship To:
                        </span>
                        <span className="text-sm sm:text-md">
                          {order.address?.street}, {order.address?.city}
                        </span>
                      </p>
                    </div>

                    {/* ORDER INFO */}
                    <div className="flex flex-col items-center gap-3 truncate w-full sm:w-fit">
                      <div className="space-y-1.5 lg:space-y-2 w-full md:w-fit">
                        <p className="font-semibold text-md text-dark-gray flex gap-2 whitespace-nowrap max-w-full sm:max-w-60 truncate">
                          <span className="text-light-black">Order ID:</span>
                          <span
                            className="max-w-full text-sm sm:text-md whitespace-nowrap overflow-visible text-clip md:truncate"
                            title={order.id}
                          >
                            {order.id}
                          </span>
                        </p>

                        <p className="font-semibold text-md text-dark-gray flex gap-2 ">
                          <span className="text-light-black">Order Date:</span>
                          <span className="text-sm sm:text-md">
                            {formattedDate} - {formattedTime}
                          </span>
                        </p>

                        {/* WISHLIST */}
                        <div className="flex items-center gap-3 flex-wrap w-full">
                          <div
                            onClick={() => handleWishlist(item)}
                            className="w-full sm:w-35 h-10 sm:h-12 border border-dark-gray rounded-10 
              cursor-pointer flex items-center justify-center gap-5 group"
                          >
                            <button className="font-normal text-lg text-light-black">
                              WishList
                            </button>

                            <img
                              src={isInWishlist(item.id) ? PinkHeart : Heart}
                              alt="WishList"
                              width={20}
                              height={20}
                              className={`transition-all duration-200 
                ${isInWishlist(item.id) ? "scale-125" : "scale-100"}`}
                            />
                          </div>
                          {/* CANCEL BUTTON */}
                          {!item.cancelInfo && (
                            <div
                              onClick={() => openCancelModal(order.id, item.id)}
                              className="w-full sm:w-35 h-10 sm:h-12 border border-red-500 text-red-500 
    rounded-10 cursor-pointer flex items-center justify-center 
    font-semibold hover:bg-red-500 hover:text-white transition-all duration-300"
                            >
                              Cancel Order
                            </div>
                          )}
                        </div>
                        {/* EXCHANGE BUTTON */}
                        {!item.cancelInfo && (
                          <div
                            onClick={() =>
                              navigate(`/exchange/${order.id}/${item.id}`)
                            }
                            className="w-full h-10 sm:h-12 border border-blue-500 text-blue-500 
    rounded-10 cursor-pointer flex items-center justify-center 
    font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300"
                          >
                            Exchange
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )),
            )}
          </div>
        </div>
      </div>
      {/* <div className="mb-20">
        <SimilarProduct products={products} title="Trending Products" />
      </div> */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 50 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-[90%] max-w-2xl p-4 md:p-6 rounded-2xl shadow-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-left">Cancel Order</h2>
                <RxCross2
                  size={22}
                  className="cursor-pointer"
                  onClick={() => setShowModal(false)}
                />
              </div>

              {/* Select Reason */}
              <div className="mb-4 relative">
                <div
                  onClick={() => setIsOpen((prev) => !prev)}
                  className={`w-full border p-2 rounded-lg cursor-pointer flex justify-between items-center ${
                    errors.reason ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <span className={`${!reason && "text-gray-400"}`}>
                    {reason || "Select Reason"}
                  </span>

                  <FaChevronDown
                    className={`transition-transform duration-300 ${
                      isOpen ? "rotate-180" : "rotate-0"
                    }`}
                    size={14}
                  />
                </div>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg"
                    >
                      {[
                        "Ordered by mistake",
                        "Found cheaper",
                        "Delivery delay",
                        "Changed mind",
                        "Other",
                      ].map((option) => (
                        <div
                          key={option}
                          onClick={() => {
                            setReason(option);
                            setErrors((prev) => ({ ...prev, reason: "" }));
                            setIsOpen(false);
                          }}
                          className="px-3 py-2 hover:bg-gray-100 cursor-pointer transition"
                        >
                          {option}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                {errors.reason && (
                  <p className="text-red-500 text-sm mt-1">{errors.reason}</p>
                )}
              </div>

              {/* Textarea */}
              <div className="mb-4">
                <textarea
                  placeholder="Write your reason here..."
                  value={customReason}
                  onChange={(e) => {
                    setCustomReason(e.target.value);
                    setErrors((prev) => ({ ...prev, customReason: "" }));
                  }}
                  rows={3}
                  className={`w-full border p-2 rounded-lg resize-none focus:outline-none ${
                    errors.customReason ? "border-red-500" : "border-gray-300"
                  }`}
                />

                {errors.customReason && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.customReason}
                  </p>
                )}
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowModal(false);
                    setReason("");
                    setCustomReason("");
                    setErrors({ reason: "", customReason: "" });
                  }}
                  className="w-full border py-2 rounded-lg cursor-pointer"
                >
                  Close
                </button>

                <button
                  onClick={() => {
                    let newErrors = {
                      reason: "",
                      customReason: "",
                    };

                    if (!reason) {
                      newErrors.reason = "Please select a reason.";
                    }

                    if (!customReason.trim()) {
                      newErrors.customReason =
                        "Please write the cancellation reason.";
                    }

                    setErrors(newErrors);

                    if (newErrors.reason || newErrors.customReason) return;

                    dispatch(
                      cancelOrderItem({
                        orderId: selectedOrderId,
                        itemId: selectedItemId,
                        reason: customReason,
                      }),
                    );

                    setShowModal(false);
                    setReason("");
                    setCustomReason("");
                    setErrors({ reason: "", customReason: "" });
                  }}
                  className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition cursor-pointer"
                >
                  Confirm
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </ContainerLayout>
  );
};

export default Orders;
