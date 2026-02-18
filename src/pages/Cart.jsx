import { useCallback, useState } from "react";
import PinkHeart from "../assets/Icons/Home/pink-heart.svg";
import { formattedDate } from "../utils/date";
import { getItem } from "../utils/localStorage";
import { generateOrderNumber } from "../utils/RandomOrderNumber";
import { FiMinus, FiPlus } from "react-icons/fi";
import Delete from "../assets/Icons/ProductDetails/delete.svg";
import OrderSummary from "../components/Cart/OrderSummary";
import { useWindow } from "../hooks/useWidth";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseQty,
  deleteFromCart,
  increaseQty,
} from "../store/slices/cartSlice";
import Heart from "../assets/Icons/Home/GrayIcons/home-heart.svg";
import {
  addToWishlist,
  removeFromWishlist,
} from "../store/slices/wishlistSlice";
import { useNavigate } from "react-router";
import { isAuthenticatedFromStorage } from "../utils/Auth";
import EmptyCart from "../assets/Cart/empty-cart.webp";
import ContainerLayout from "../layout/ContainerLayout";

const Cart = () => {
  const width = useWindow();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userName = getItem("auth")?.name;
  const [orderNumber] = useState(generateOrderNumber());
  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const isInWishlist = useCallback(
    (id) => wishlistItems.some((item) => item.id === id),
    [wishlistItems],
  );
  const { isAuthenticated = false } = isAuthenticatedFromStorage();

  const toggleLike = useCallback(
    (product) => {
      if (!isAuthenticated) {
        navigate("/sign-in");
        return;
      }
      if (isInWishlist(product.id)) {
        dispatch(removeFromWishlist(product.id));
      } else {
        dispatch(addToWishlist(product));
      }
    },
    [isAuthenticated, isInWishlist, navigate, dispatch],
  );

  if (cartItems?.length === 0) {
    return (
      <ContainerLayout>
        <div className="pb-30 pt-40 text-center text-xl text-gray-600 flex flex-col items-center justify-center gap-10">
          <img src={EmptyCart} loading="lazy" width={200} height={200} />
          <div className="font-bold text-2xl xl:text-3xl">
            Your Cart is empty 🛒
          </div>
        </div>
      </ContainerLayout>
    );
  }

  return (
    <>
      <ContainerLayout>
        <div className="w-full flex flex-col px-3 md:px-25 lg:px-20 xl:px-10 2xl:px-40 pt-20 lg:pt-30 pb-15 lg:pb-20 space-y-6 xl:space-y-12">
          <h1 className="text-xl md:text-2xl lg:text-4xl font-bold ">
            My Cart{" "}
            {cartItems?.length > 0 && (
              <span className="text-dark-blue">
                ({cartItems?.length} items)
              </span>
            )}
          </h1>
          <div className="space-y-4">
            <div
              className={`flex w-full gap-6 grow ${width < 1091 && "flex-col"}`}
            >
              <div
                className={`w-full ${width < 1091 ? "max-w-full" : "max-w-5xl"}`}
              >
                {cartItems?.map((product) => (
                  <div
                    className={`flex items-center gap-3 w-full justify-between sm:p-3 lg:p-4 border-b last:border-b-0 border-dark-blue
                       p-2 ${width < 1091 ? "max-w-full" : "max-w-5xl"}`}
                    key={product.id}
                  >
                    <div className="flex gap-1.5 md:gap-4 items-center">
                      <div className="w-19 sm:w-[120px] lg:w-[150px] xl:w-[223px] flex-shrink-0">
                        <img
                          src={product.image}
                          alt={product.title}
                          loading="lazy"
                          className=" w-19 sm:w-[120px] lg:w-[150px] xl:w-[223px] h-21 sm:h-[120px] lg:h-[200px] xl:h-[248px] rounded-[5px] object-cover cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/${product.link}`);
                          }}
                        />
                      </div>
                      <div className="flex flex-col space-y-0.5 sm:space-y-2.5 ">
                        <p
                          className={`text-light-black font-bold text-sm md:text-xl xl:text-2xl ${width < 375 ? "max-w-21" : "max-w-[150px]"}   sm:max-w-full truncate`}
                          title={product.title}
                        >
                          {product.title}
                        </p>
                        <p className="font-normal text-sm md:text-lg text-light-black">
                          {product.brand}
                        </p>
                        <p className="font-bold text-lg lg:text-xl text-dark-button-blue">
                          <span className="text-lg">₹</span> {product.price}
                        </p>
                        <p className="font-normal text-md text-dark-gray hidden-lg-flex flex gap-2">
                          <span className="text-light-black">Order Date:</span>
                          <span>{formattedDate}</span>
                        </p>

                        <p className="font-normal text-md text-dark-gray hidden-lg-flex flex gap-2">
                          <span className="text-light-black">Ship To:</span>
                          <span>{userName}</span>
                        </p>

                        <p className="font-normal text-md text-dark-gray hidden-lg-flex flex gap-2 whitespace-nowrap">
                          <span className="text-light-black whitespace-nowrap">
                            Order Number:
                          </span>
                          <span className="whitespace-nowrap">
                            {orderNumber}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center  sm:items-start justify-between">
                      <div className="flex flex-col items-center gap-3 w-full">
                        <div className="flex items-center border border-dark-blue rounded-md overflow-hidden h-10 w-23 lg:w-[120px] lg:h-[40px]">
                          {/* Minus */}
                          <button
                            onClick={() => dispatch(decreaseQty(product.id))}
                            className="flex-1 h-full flex items-center justify-center text-dark-blue hover:bg-light-blue/30 transition cursor-pointer"
                          >
                            <FiMinus />
                          </button>

                          {/* Value */}
                          <div className="flex-1 h-full flex items-center justify-center text-dark-button-blue/50 font-medium border-l border-r text-white bg-dark-blue">
                            {product.qty}
                          </div>

                          {/* Plus */}
                          <button
                            onClick={() => dispatch(increaseQty(product.id))}
                            className="flex-1 h-full flex items-center justify-center text-dark-blue hover:bg-light-blue/30 transition cursor-pointer"
                          >
                            <FiPlus />
                          </button>
                        </div>
                        <div className="flex items-center gap-3">
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              if (!isAuthenticated) {
                                navigate("/sign-in");
                                return;
                              }
                              toggleLike(product);
                            }}
                            className="rounded-10 cursor-pointer flex items-center justify-center group transition-all duration-150"
                          >
                            <div className="w-[26px] h-[26px] flex items-center justify-center">
                              <img
                                src={
                                  isInWishlist(product.id) ? PinkHeart : Heart
                                }
                                alt="WishList"
                                loading="lazy"
                                className={`
                               transition-transform duration-200 ease-out transform-gpu
                               group-hover:scale-110 active:scale-110
                               ${isInWishlist(product.id) ? "scale-145" : "scale-100"}
                             `}
                              />
                            </div>
                          </div>

                          <div
                            className="cursor-pointer"
                            onClick={() => dispatch(deleteFromCart(product.id))}
                          >
                            <img
                              src={Delete}
                              alt="Delete"
                              size={32}
                              loading="lazy"
                              className="cursor-pointer"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <OrderSummary />
            </div>
          </div>
        </div>
      </ContainerLayout>
    </>
  );
};

export default Cart;
