import { useNavigate, useParams } from "react-router";
import SimilarProduct from "../components/ui/home/SimilarProduct";
import ContainerLayout from "../layout/ContainerLayout";
import { products } from "../../data/ProductDetailsData";
import { useEffect, useState } from "react";
import BlackStar from "../assets/Icons/ProductDetails/rating-star.svg";
import WhiteStar from "../assets/Icons/ProductDetails/white-star.svg";
import BlueArrow from "../assets/Icons/ProductDetails/blue-right-arrow.svg";
import PopUp from "../components/ui/PopUp";
import sizeChart from "../assets/ProductDetails/size-chart.webp";
import { OfferDetails, ProductColors, sizes } from "../../data/SizeData";
import PinkHeart from "../assets/Icons/Home/pink-heart.svg";
import Heart from "../assets/heart.svg";
import ProductSpecification from "../components/ProductDetails/ProductSpecification";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import Share from "../assets/Icons/ProductDetails/share.svg";
import WhiteBag from "../assets/Icons/Home/white-bag.svg";
import "swiper/css";
import "swiper/css/pagination";
import { useWindow } from "../hooks/useWidth";
import ProductDetailsPin from "../components/ProductDetails/ProductDetailsPin";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishlist,
  removeFromWishlist,
} from "../store/slices/wishlistSlice";
import { increaseQty, decreaseQty, addToCart } from "../store/slices/cartSlice";
import { isAuthenticatedFromStorage } from "../utils/Auth";
import { FiMinus, FiPlus } from "react-icons/fi";
import { flyToCart } from "../utils/FlyToCart";
import { useTranslation } from "react-i18next";
import useNumberInGujarati from "../hooks/useNumberInGujarati";

const ProductDetails = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));
  const [activeImage, setActiveImage] = useState(product?.allImages?.[0]);
  const [isSizePopupOpen, setIsSizePopupOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(ProductColors[0]);
  // const [liked, setLiked] = useState(false);
  const width = useWindow();
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const isInWishlist = wishlistItems.some((p) => p.id === product.id);
  const { isAuthenticated = false } = isAuthenticatedFromStorage();
  const navigate = useNavigate();
  const { t ,i18n} = useTranslation("productDetails");
  const { formatNumber } = useNumberInGujarati();
  // Cart States
  //
  const cartItems = useSelector((state) => state.cart.items);
  const cartItem = cartItems.find((i) => i.id === product.id);
  const qty = cartItem?.qty || 0;

  const handleWishlist = () => {
    if (!isAuthenticated) {
      navigate("/sign-in");
      return;
    }
    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  useEffect(() => {
    if (isSizePopupOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isSizePopupOpen]);

  useEffect(() => {
    if (product) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveImage(product.allImages?.[0]);
      setSelectedSize(null);
      setSelectedColor(ProductColors[0]);
    }
  }, [id, product]);

  
  if (!product) {
    return <div className="p-10 text-xl">Product not found ❌</div>;
  }
  return (
    <ContainerLayout>
      {" "}
      <div className="pt-15 lg:pt-[106px] sm:bg-light-gray-3 bg-white">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 2xl:gap-[96px]">
          {/* ================= LEFT: IMAGES ================= */}
          <div className="flex gap-4">
            {/* ================= MOBILE: SWIPER (< lg) ================= */}
            <div className="block lg:hidden w-full">
              <Swiper
                modules={[Pagination, Autoplay]}
                slidesPerView={1}
                loop={true}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                pagination={{
                  el: ".product-pagination",
                  clickable: true,
                }}
                className="w-full"
              >
                {product.allImages.map((img, i) => (
                  <SwiperSlide key={i}>
                    <img
                      src={img}
                      alt=""
                      className="w-full h-[570px] object-cover rounded"
                      loading="lazy"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="product-pagination flex justify-center items-center gap-[6px] p-0 mt-[11px]" />
            </div>

            {/* ================= DESKTOP: YOUR EXISTING LAYOUT (>= lg) ================= */}
            <div className="hidden lg:flex gap-4 pl-3.75 xl:pl-12">
              {/* Thumbnails */}
              <div className="flex flex-col gap-3 h-full justify-start items-center">
                {product.allImages.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt=""
                    className={`object-cover rounded-10 cursor-pointer ${
                      activeImage === img
                        ? "w-[180px] h-[180px]"
                        : "w-[165px] h-[165px]"
                    }`}
                    onClick={() => setActiveImage(img)}
                  />
                ))}
              </div>

              {/* Main Image */}
              <div className="max-h-[900px]">
                <img
                  src={activeImage}
                  alt={product.title}
                  className="w-[837px] h-[885px] object-cover rounded-10"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* ================= RIGHT: DETAILS ================= */}
          <div className="flex flex-col gap-5 xl:gap-7.5 px-3.75 lg:pr-3.75 xl:pr-12">
            <div className="flex justify-between">
              <div className="flex flex-col gap-[5px] sm:gap-2.5 xl:gap-4.5">
                <h1 className="text-xl md:text-2xl xl:text-4xl font-medium lg:font-bold text-light-black">
                  {t(`products:${id}:title`)}
                </h1>
                <p className="text-light-black font-normal text-sm md:text-lg lg:text-2xl">
                  {t(`products:${id}:brand`)}
                </p>
                {i18n.language === "en" ? <p className="text-light-black font-normal text-sm md:text-lg">
                 Sold By: {t(`products:${id}:brand`)} </p>: <p className="text-light-black font-normal text-sm md:text-lg">
               {t(`products:${id}:soldBy`)} {t(`products:SoldBy`)}
                </p>}
              </div>
              <div>
                <img
                  src={Share}
                  alt="heart"
                  className="cursor-pointer flex lg:hidden"
                  onClick={handleWishlist}
                  loading="lazy"
                />
              </div>
            </div>

            {/* ================= Seller: DETAILS ================= */}

            <div className="flex items-center gap-2.5 sm:gap-4.5">
              <div className="flex items-center gap-2.5">
                <div className="flex items-center gap-0.5">
                  {[...Array(4)].map((_, i) => (
                    <img key={i} src={BlackStar} loading="lazy" />
                  ))}
                  <img src={WhiteStar} loading="lazy" />
                </div>
                <span className="font-normal text-lg text-light-black">
                  {formatNumber(product.rating)}
                </span>
              </div>
              <p clasname="font-normal text-lg text-light-black">{formatNumber(36)} {t(`products:Reviews`)}</p>
            </div>

            {/* ================= Price: DETAILS ================= */}

            <div className="flex items-center gap-4">
              <span className="text-2xl font-bold text-light-black">
                ₹ {formatNumber(product.price)}
              </span>
              <span className="line-through text-mid-dark-gray text-lg font-normal">
                ₹ {formatNumber(product.oldPrice)}
              </span>
              <span className="font-normal text-lg xl:text-2xl text-product-green">
                {t(`products:${id}:discount`)}
              </span>
            </div>

            {/* ================= Size: DETAILS ================= */}

            <div className="flex flex-col justify-center gap-1.5 lg:gap-3 xl:gap-4 md:py-0 ">
              <div className="gap-4 flex flex-row xl:flex-col justify-between xl:justify-start ">
                <p className="font-medium lg:font-bold text-lg xl:text-2xl text-light-black">
                  {t(`products:SelectSize`)}
                </p>
                <div
                  className="flex items-center gap-2.5 cursor-pointer"
                  onClick={() => setIsSizePopupOpen(true)}
                >
                  <p className="font-normal text-md xl:text-lg text-dark-blue hover:text-blue-700 whitespace-nowrap">
                    {t(`products:SizeChart`)}
                  </p>
                  <img
                    src={BlueArrow}
                    alt="Blue Arrow"
                    loading="lazy"
                    className="hidden lg:inline"
                    width={8}
                    height={11}
                  />
                </div>
              </div>
              {/* Sizes */}
              <div className="flex gap-3 lg:gap-[19px] overflow-auto trending-scroll">
                {sizes.map((size) => {
                  const isSelected = selectedSize === size.label;

                  return (
                    <button
                      key={size.label}
                      disabled={size.disabled}
                      onClick={() => setSelectedSize(size.label)}
                      className={`
              relative min-w-[42px] min-h-[42px] lg:min-w-14 lg:min-h-14 rounded-none lg:rounded-full border flex items-center justify-center text-lg font-normal
              transition shadow-[0px_0px_20px_0px_#0000000D] lg:shadow-none bg-white md:bg-none m-2 md:m-0
              ${
                size.disabled
                  ? "border-white lg:border-gray-300 text-gray-400 cursor-not-allowed"
                  : isSelected
                    ? "border-blue-600 text-blue-600  cursor-pointer"
                    : "border-white lg:border-size-chart text-gray-800 hover:border-blue-500 hover:text-blue-500  cursor-pointer"
              }
            `}
                    >
                      {size.label}

                      {/* Cross line for disabled (XS) */}
                      {size.disabled && (
                        <span className="absolute w-14 lg:w-14 h-px bg-gray-300 rotate-[-45deg] lg:rotate-[-45deg]" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ================= Color: DETAILS ================= */}

            <div className="flex flex-col justify-center gap-4 lg:py-0">
              <p className="font-medium lg:font-bold text-lg xl:text-2xl text-light-black">
                {t(`products:SelectColor`)}
              </p>

              <div className="flex items-center gap-5">
                {ProductColors.map((color) => {
                  const isSelected = selectedColor.label === color.label;

                  return (
                    <div
                      key={color.label}
                      className="flex flex-col gap-2.5 cursor-pointer items-center"
                      onClick={() => setSelectedColor(color)}
                    >
                      <div
                        className={`
                  w-10.5 h-10.5 bg-white rounded-full
                  shadow-[0px_0px_15px_0px_#0000000D]
                  flex items-center justify-center
                  transition
                  ${
                    isSelected
                      ? "ring-2 ring-light-gray-2"
                      : "hover:ring-2 hover:ring-gray-300"
                  }
                `}
                      >
                        <div
                          className={`w-7 h-7 ${color.color} rounded-full`}
                        />
                      </div>

                      <p
                        className={`${i18n.language === "en" ? "text-xs" : "text-md"} font-normal ${
                          isSelected
                            ? "text-black/90 ring-light-gray-1 font-semibold"
                            : "text-gray-700"
                        }`}
                      >
                        {t(`products:ProductColors:${color.label}`)}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* ================= Pin: DETAILS ================= */}
            <ProductDetailsPin />

            {/* ================= Best Offer: ================= */}
            <div className="flex flex-col justify-center gap-3">
              <p className="font-medium lg:font-bold text-lg xl:text-2xl text-light-black">
                {t("products:BestOffers")}
              </p>
              {(t("products:Offers", { returnObjects: true }) || []).map((item, index) => (
                <div className="space-y-3.75 text-light-black" key={index}>
                  <p>
                    <span className="font-normal lg:font-bold text-sm md:text-lg">
                      {item.offerName}{" "}
                    </span>
                    <span className="font-normal text-sm md:text-lg">
                      {item.offPercent}{" "}
                    </span>
                    <span className="font-normal text-sm md:text-lg">
                      {item.onOffer}
                    </span>{" "}
                    <span className="font-normal text-sm md:text-lg text-dark-blue">
                      {item.terms}
                    </span>
                  </p>
                </div>
              ))}
            </div>

            <div className="flex w-full gap-4.5">
              {width > 1024 ? (
                <>
                  {qty === 0 ? (
                    <div
                      className="w-full max-w-full md:max-w-42 h-12 bg-dark-button-blue text-white rounded-10 cursor-pointer flex items-center justify-center hover:bg-blue-900 transition duration-100 ease-in-out"
                      onClick={(e) => {
                        if (!isAuthenticated) {
                          navigate("/sign-in");
                          return;
                        }
                        flyToCart(e, product, "cart-icon"); // animate 1 image
                        dispatch(addToCart(product));
                      }}
                    >
                      <button className={`font-normal text-lg text-white cursor-pointer ${i18n.language === "gj" ? "mt-1" : "mt-0"}`}>
                        {t("products:AddToCart")}
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center bg-white border border-dark-blue rounded-md overflow-hidden w-[150px] h-12">
                      {/* Minus */}
                      <button
                        onClick={() => dispatch(decreaseQty(product.id))}
                        className="flex-1 h-full flex items-center justify-center text-light-blue-1 hover:bg-light-blue/30 transition cursor-pointer"
                      >
                        <FiMinus className="text-dark-blue bg-transparent" />
                      </button>

                      {/* Value */}
                      <div className="flex-1 h-full flex items-center justify-center text-white font-medium border-l border-r border-light-blue bg-dark-button-blue">
                        {formatNumber(qty)}
                      </div>

                      {/* Plus */}
                      <button
                        onClick={(e) => {
                          flyToCart(e, product, "cart-icon"); // animate 1 image
                          dispatch(increaseQty(product.id));
                        }}
                        className="flex-1 h-full flex items-center justify-center text-light-blue-1 hover:bg-light-blue/30 transition cursor-pointer"
                      >
                        <FiPlus className="text-dark-blue bg-transparent" />
                      </button>
                    </div>
                  )}
                  <div
                    onClick={handleWishlist}
                    className="rounded-10 cursor-pointer flex items-center justify-center gap-3 sm:gap-[23.23px] group transition-all duration-150"
                  >
                    <img
                      src={isInWishlist ? PinkHeart : Heart}
                      alt="WishList"
                      loading="lazy"
                      width={25.38}
                      height={22.21}
                      className={`transition-all duration-200 ease-out group-hover:scale-120 active:scale-120 ${isInWishlist ? "scale-145" : "scale-100"}`}
                    />
                  </div>
                </>
              ) : (
                <div className="flex w-full gap-4 items-center">
                  <div className="w-full h-12  text-white rounded-10 cursor-pointer flex items-center justify-center gap-3 sm:gap-[23.23px]">
                    {qty === 0 ? (
                      <div
                        onClick={(e) => {
                          if (!isAuthenticated) {
                            navigate("/sign-in");
                            return;
                          }
                          flyToCart(e, product, "down-icon");
                          dispatch(addToCart(product));
                        }}
                        className="w-full h-10 flex items-center justify-center gap-3 sm:gap-[23.23px] bg-dark-button-blue rounded-10 cursor-pointer hover:bg-blue-900 transition duration-100 ease-in-out"
                      >
                        <button className={`font-normal text-lg text-white ${i18n.language === "gj" ? "mt-1" : "mt-0"}`}>
                          {t("products:AddToCart")}
                        </button>
                        <img
                          src={WhiteBag}
                          alt="Bag"
                          loading="lazy"
                          width={18}
                          height={18}
                        />
                      </div>
                    ) : (
                      <div className="flex items-center justify-between rounded-10 h-10 overflow-hidden w-full lg:w-[120px] bg-dark-blue border border-dark-blue">
                        {/* Minus */}
                        <button
                          onClick={() => dispatch(decreaseQty(product.id))}
                          className="h-full flex items-center justify-center text-dark-blue bg-white transition cursor-pointer w-full text-center"
                        >
                          <FiMinus size={20} />
                        </button>

                        {/* Value */}
                        <div className="h-full flex items-center justify-center text-light-blue font-medium text-center border-l border-r w-full">
                          {formatNumber(qty)}
                        </div>

                        {/* Plus */}
                        <button
                          onClick={(e) => {
                            flyToCart(e, product, "down-icon");
                            dispatch(increaseQty(product.id));
                          }}
                          className="h-full flex items-center justify-center text-dark-blue bg-white transition cursor-pointer text-center w-full"
                        >
                          <FiPlus size={20} />
                        </button>
                      </div>
                    )}
                  </div>
                  <div
                    onClick={handleWishlist}
                    className="w-full h-10 border border-dark-button-blue rounded-10 cursor-pointer flex items-center justify-center gap-3 sm:gap-[23.23px] group transition-all duration-15"
                  >
                    <button className={`font-normal text-lg text-light-black ${i18n.language === "gj" ? "mt-1.5" : "mt-0"}`}>
                      {t("products:Wishlist")}
                    </button>

                    <img
                      src={isInWishlist ? PinkHeart : Heart}
                      alt="WishList"
                      loading="lazy"
                      width={20}
                      height={20}
                      className={`transition-all duration-200 ease-out group-hover:scale-120 active:scale-120 ${isInWishlist ? "scale-145" : "scale-100"}`}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <ProductSpecification />
      <div className="bg-light-gray-3 pb-6 lg:pb-29 space-y-6">
        <SimilarProduct />
        <SimilarProduct title={t("products:CustomersAlsoLike")} />
      </div>
      {/* ================= Pop Up ================= */}
      <PopUp
        isOpen={isSizePopupOpen}
        onClose={() => setIsSizePopupOpen(false)}
        buttonTitle={t("products:Done")}
      >
        <h2 className={`text-xl font-bold mb-4 ${i18n.language === "gj" ? "mt-1.5" : "mt-0"}`}>{t("products:SizeGuide")}</h2>
        <div className="flex gap-3 flex-wrap min-h-100">
          <img src={sizeChart} alt="Size chart" loading="lazy" />
        </div>
      </PopUp>
    </ContainerLayout>
  );
};

export default ProductDetails;
