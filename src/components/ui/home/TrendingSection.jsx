import star from "../../../assets/star.svg";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import { useWindow } from "../../../hooks/useWidth";
import { useEffect, useEffectEvent, useState } from "react";
import Heart from "../../../assets/Icons/Home/GrayIcons/home-heart.svg";
import PinkHeart from "../../../assets/Icons/Home/pink-heart.svg";
import WhiteBag from "../../../assets/Icons/Home/white-bag.svg";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router";
import { products } from "../../../../data/ProductDetailsData";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../store/slices/wishlistSlice";
import { isAuthenticatedFromStorage } from "../../../utils/Auth";
import {
  addToCart,
  decreaseQty,
  increaseQty,
} from "../../../store/slices/cartSlice";

const TrendingSection = () => {
  const width = useWindow();
  const [open, setOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const isInWishlist = (id) => wishlistItems.some((item) => item.id === id);
  const { isAuthenticated = false } = isAuthenticatedFromStorage();
  const cartItems = useSelector((state) => state.cart.items);

  const getCartItem = (id) => cartItems.find((item) => item.id === id);

  const toggleLike = (product) => {
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

  const handleIncrease = (id, e) => {
    e.stopPropagation();

    if (!isAuthenticated) {
      navigate("/sign-in");
      return;
    }

    dispatch(increaseQty(id));
  };

  const handleDecrease = (id, e) => {
    e.stopPropagation();

    if (!isAuthenticated) {
      navigate("/sign-in");
      return;
    }
    dispatch(decreaseQty(id));
  };

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  const openEvent = useEffectEvent(() => {
    setOpen(false);
  });

  useEffect(() => {
    if (width > 768) {
      openEvent();
    }
  }, [open, width]);

  return (
    <>
      <div className="px-3.75 xl:px-12.5 space-y-3 lg:space-y-[27px] mt-3 lg:mt-[80px]">
        <h3 className="text-light-black font-bold text-2xl lg:text-4xl">
          Trending Now
        </h3>

        {width > 768 ? (
          <Swiper
            spaceBetween={width > 1025 ? 38.5 : 12}
            slidesPerView="auto"
            className="cursor-pointer"
          >
            {products.map((product) => (
              <SwiperSlide
                key={product.id}
                className="!w-80 lg:!w-[414px] mx-px mb-4 cursor-pointer shadow-[0px_0px_30px_0px_#0000000D] overflow-visible rounded-10"
                onClick={() => {
                  navigate(`/${product.link}`);
                }}
              >
                <div className="bg-white rounded-b-2xl">
                  <div className="relative">
                    <button
                      className="absolute top-3 right-3 z-10 
             bg-white/30 backdrop-blur-md 
             rounded-full p-2 
             shadow-md
             hover:scale-110 transition cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLike(product);
                      }}
                    >
                      <img
                        src={isInWishlist(product.id) ? PinkHeart : Heart}
                        alt="WishList"
                        width={20}
                        height={20}
                        className="transition-all duration-200 ease-out"
                      />
                    </button>
                  </div>
                  <img
                    className="h-[301px] w-full object-cover rounded-t-[10px]"
                    src={product.image}
                    alt={product.title}
                    loading="lazy"
                  />

                  <div className="px-5 py-2.5 space-y-1 rounded-b-2xl">
                    <div className="font-bold text-xl lg:text-[24px] text-light-black">
                      {product.title}
                    </div>

                    <div className="flex gap-7.5 items-center">
                      <p className="text-lg font-normal text-light-black">
                        {product.brand}
                      </p>
                      <div className="flex items-center justify-center gap-2">
                        <p className="text-dark-gray text-lg">
                          {product.rating}
                        </p>
                        <img
                          src={star}
                          alt=""
                          className="w-[18px] h-[17px]"
                          loading="lazy"
                        />
                      </div>
                    </div>

                    <div className="flex gap-3 truncate">
                      <p className="font-bold text-lg lg:text-2xl whitespace-nowrap text-light-black">
                        Rs. {product.price}
                      </p>
                      <p className="text-dark-gray line-through text-lg font-normal">
                        Rs. {product.oldPrice}
                      </p>
                      <p className="text-green text-lg font-bold">({product.discount})</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <>
            {products?.map((product) => (
              <div
                className="space-y-4 cursor-pointer"
                key={product.id}
                onClick={() => navigate(`${product?.link}`)}
              >
                <div className="grid grid-cols-3 gap-2.5 h-[220px] md:h-[226px]">
                  {/* Left big image */}
                  <div
                    className="col-span-2 row-span-2 rounded-xl bg-cover bg-center"
                    style={{ backgroundImage: `url(${product.allImages[0]})` }}
                  />

                  {/* Top right */}
                  <div
                    className="rounded-xl bg-cover bg-center"
                    style={{ backgroundImage: `url(${product.allImages[1]})` }}
                  />

                  {/* Bottom right with +2 */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImages(product.allImages);
                      setOpen(true);
                    }}
                    className="relative rounded-xl bg-cover bg-center overflow-hidden"
                    style={{ backgroundImage: `url(${product.allImages[2]})` }}
                  >
                    {product.allImages.length - 3 > 0 && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer">
                        <span className="text-white text-4xl font-bold">
                          + {product.allImages.length - 3}
                        </span>
                      </div>
                    )}
                  </button>
                </div>
                <div className="space-y-1 rounded-b-[10px]">
                  <div className="font-medium text-xl text-light-black">
                    {product.title}
                  </div>

                  <div className="flex gap-7.5 items-center">
                    <p className="text-lg font-normal text-light-black">
                      {product.brand}
                    </p>
                  </div>

                  <div className="flex gap-[17px] truncate">
                    <p className="text-dark-gray line-through text-lg font-normal ">
                      Rs. {product.oldPrice}
                    </p>
                    <p className="font-normal text-xl whitespace-nowrap text-light-black">
                      Rs. {product.price}
                    </p>
                    <p className="text-lg text-green-off">
                      ({product.discount})
                    </p>
                  </div>
                </div>
                <div className="flex justify-between w-full gap-[13px]">
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!isAuthenticated) {
                        navigate("/sign-in");
                        return;
                      }
                      toggleLike(product);
                    }}
                    className="w-full h-10 border border-dark-button-blue rounded-10 cursor-pointer flex items-center justify-center gap-3 sm:gap-[23.23px] group transition-all duration-150"
                  >
                    <button className="font-normal text-sm text-light-black">
                      WishList
                    </button>

                    <img
                      src={isInWishlist(product.id) ? PinkHeart : Heart}
                      alt="WishList"
                      loading="lazy"
                      width={14.73}
                      height={13.04}
                      className={`transition-all duration-200 ease-out group-hover:scale-120 active:scale-120 ${isInWishlist(product.id) ? "scale-145" : "scale-100"}`}
                    />
                  </div>

                  {getCartItem(product.id) ? (
                    <div className="w-full h-10 bg-white text-dark-blue rounded-10 flex items-center justify-center gap-3 px-4 border border-dark-blue">
                      <button
                        onClick={(e) => handleDecrease(product.id, e)}
                        className="text-lg font-bold cursor-pointer w-full text-center bg-white text-dark-blue"
                      >
                        −
                      </button>

                      <span className="text-sm font-medium p-2.5 border-l border-r w-full text-center bg-dark-blue text-white">
                        {getCartItem(product.id).qty}
                      </span>

                      <button
                        onClick={(e) => handleIncrease(product.id, e)}
                        className="text-lg font-bold cursor-pointer w-full text-center bg-white text-dark-blue"
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <div
                      className="w-full h-10 bg-dark-button-blue text-white rounded-10 cursor-pointer flex items-center justify-center gap-3 sm:gap-[23.23px]"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!isAuthenticated) {
                          navigate("/sign-in");
                          return;
                        }
                        dispatch(addToCart(product));
                      }}
                    >
                      <button className="font-normal text-sm text-white cursor-pointer!">
                        Add to Bag
                      </button>
                      <img
                        src={WhiteBag}
                        alt="WishList"
                        loading="lazy"
                        width={14.88}
                        height={17}
                        className="cursor-pointer"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      {open && (
        <div className="fixed inset-0 z-100 bg-black flex flex-col">
          {/* Close button */}
          <div className="px-2 py-6 flex justify-start items-center">
            <IoIosArrowBack
              onClick={() => setOpen(false)}
              className="text-white text-2xl font-bold"
            />
            <p className="text-white text-xl font-bold">Trending Now</p>
          </div>

          {/* Scrollable images */}
          <div className="flex-1 overflow-y-auto px-2 pb-4 space-y-5 trending-scroll">
            {selectedImages.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`collection-${i}`}
                className="w-full rounded-lg object-cover max-h-[600px] h-full bg-top"
                loading="lazy"
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default TrendingSection;
