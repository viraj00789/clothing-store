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
import { useCallback } from "react";
import { formattedDate, formattedTime } from "../utils/date";

const Orders = () => {
  const width = useWindow();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated = false } = isAuthenticatedFromStorage();
  const wishlistItems = useSelector((state) => state.wishlist.items);
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

  if (orders.length === 0) {
    return (
      <ContainerLayout>
        <div className="pb-30 pt-40 text-center text-xl text-gray-600 flex flex-col items-center justify-center gap-10">
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
      </ContainerLayout>
    );
  }

  return (
    <ContainerLayout>
      <div className="w-full flex flex-col px-3 md:px-25 lg:px-20 xl:px-75 2xl:px-95 pt-20 lg:pt-30 pb-15 lg:pb-20 space-y-6 xl:space-y-12">
        <h1 className="text-xl md:text-2xl lg:text-4xl font-bold ">
          My Orders{" "}
          {orders?.length > 0 && (
            <span className="text-dark-blue">({orders?.length} items)</span>
          )}
        </h1>
        <div className="space-y-4">
          <div className="w-full space-y-0 lg:space-y-8 max-w-full">
            {orders?.map((order) =>
              order.items.map((item) => (
                <div
                  className="flex items-center gap-3 w-full sm:rounded-10 sm:p-3 lg:p-4 
      lg:shadow-[0px_0px_10px_0px_#0000001A]
      border-b last:border-0 lg:border-none border-light-gray-2 py-2 max-w-full"
                  key={`${order.id}-${item.id}`}
                >
                  {/* IMAGE */}
                  <div className="flex gap-1.5 md:gap-4 items-center">
                    <div className="w-30 md:w-40 h-60 shrink-0">
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

                      <p className="font-semibold text-md text-dark-gray flex gap-2 whitespace-nowrap">
                        <span className="text-light-black">Brand Name:</span>
                        <span>{item.brand}</span>
                      </p>

                      <p className="font-bold text-lg lg:text-xl text-dark-button-blue">
                        <span className="text-lg">₹</span> {item.price}
                      </p>

                      <p className="font-semibold text-md text-dark-gray flex gap-2 items-center">
                        <span className="text-light-black">Ship To:</span>
                        <span className="text-sm sm:text-md">
                          {order.address?.street}, {order.address?.city}
                        </span>
                      </p>
                    </div>

                    {/* ORDER INFO */}
                    <div className="flex flex-col items-center gap-3 truncate">
                      <div className="space-y-1.5 lg:space-y-2">
                        <p className="font-semibold text-md text-dark-gray flex gap-2 whitespace-nowrap">
                          <span className="text-light-black">Order ID:</span>
                          <span
                            className="max-w-25 sm:max-w-full truncate text-sm sm:text-md"
                            title={order.id}
                          >
                            {order.id}
                          </span>
                        </p>

                        <p className="font-semibold text-md text-dark-gray flex gap-2">
                          <span className="text-light-black">Order Date:</span>
                          <span className="text-sm sm:text-md">
                            {formattedDate} - {formattedTime}
                          </span>
                        </p>

                        {/* WISHLIST */}
                        <div
                          onClick={() => handleWishlist(item)}
                          className="w-35 h-10 sm:h-12 border border-dark-gray rounded-10 
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
    </ContainerLayout>
  );
};

export default Orders;
