import { useParams } from "react-router";
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
import Heart from "../assets/Icons/Home/GrayIcons/home-heart.svg";
import ProductSpecification from "../components/ProductDetails/ProductSpecification";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import Share from "../assets/Icons/ProductDetails/share.svg";
import WhiteBag from "../assets/Icons/Home/white-bag.svg";

import "swiper/css";
import "swiper/css/pagination";
import { useWindow } from "../hooks/useWidth";
import ProductDetailsPin from "../components/ProductDetails/ProductDetailsPin";

const ProductDetails = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));
  const [activeImage, setActiveImage] = useState(product?.allImages?.[0]);
  const [isSizePopupOpen, setIsSizePopupOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(ProductColors[0]);
  const [liked, setLiked] = useState(false);
  const width = useWindow();

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

  if (!product) {
    return <div className="p-10 text-xl">Product not found ❌</div>;
  }
  return (
    <ContainerLayout>
      {" "}
      <div className="pt-15 lg:pt-[100px] bg-light-gray-3">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 2xl:gap-24">
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
                      className="w-full h-[450px] object-cover rounded"
                      loading="lazy"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="product-pagination flex justify-center items-center gap-1.25 p-0 mt-2" />
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
                    className={`object-cover rounded-10 cursor-pointer border ${
                      activeImage === img
                        ? "border-blue-300 border-3 w-[180px] h-[180px]"
                        : "border-gray-200 w-[165px] h-[165px]"
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
                  className="w-[837px] h-[885px] object-cover rounded"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* ================= RIGHT: DETAILS ================= */}
          <div className="flex flex-col gap-5 xl:gap-7.5 px-3.75 lg:pr-3.75 xl:pr-12">
            <div className="flex justify-between">
              <div className="flex flex-col gap-2.5 xl:gap-4.5">
                <h1 className="text-xl md:text-2xl xl:text-4xl font-bold text-light-black">
                  {product.title}
                </h1>
                <p className="text-light-black font-normal text-lg md:text-2xl">
                  {product.brand}
                </p>
                <p className="text-light-black font-normal text-lg">
                  Sold By: {product.soldBy}
                </p>
              </div>
              <div>
                <img
                  src={Share}
                  alt="heart"
                  className="cursor-pointer flex lg:hidden"
                  onClick={() => setLiked(!liked)}
                  loading="lazy"
                />
              </div>
            </div>

            {/* ================= Seller: DETAILS ================= */}

            <div className="flex items-center gap-2.5 sm:gap-4.5">
              <div className="flex items-center gap-2">
                {[...Array(4)].map((_, i) => (
                  <img key={i} src={BlackStar} loading="lazy" />
                ))}
                <img src={WhiteStar} loading="lazy" />
                <span className="font-normal text-lg text-light-black">
                  {product.rating}
                </span>
              </div>
              <p clasname="font-normal text-lg text-light-black">36 Reviews</p>
            </div>

            {/* ================= Price: DETAILS ================= */}

            <div className="flex items-center gap-4">
              <span className="text-2xl font-bold text-light-black">
                Rs. {product.price}
              </span>
              <span className="line-through text-mid-dark-gray text-lg font-normal">
                Rs. {product.oldPrice}
              </span>
              <span className="font-normal text-product-green">
                ({product.discount})
              </span>
            </div>

            {/* ================= Size: DETAILS ================= */}

            <div className="flex flex-col justify-center gap-3 xl:gap-4 pt-4 md:py-0 ">
              <div className="gap-4 flex flex-row xl:flex-col justify-between xl:justify-start ">
                <p className="font-bold text-lg xl:text-2xl text-light-black">
                  Select Size
                </p>
                <div
                  className="flex items-center gap-2.5 cursor-pointer"
                  onClick={() => setIsSizePopupOpen(true)}
                >
                  <p className="font-normal text-md xl:text-lg text-dark-blue hover:text-blue-700 whitespace-nowrap">
                    Size Chart
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
              <div className="flex gap-3 lg:gap-4.75 overflow-auto trending-scroll">
                {sizes.map((size) => {
                  const isSelected = selectedSize === size.label;

                  return (
                    <button
                      key={size.label}
                      disabled={size.disabled}
                      onClick={() => setSelectedSize(size.label)}
                      className={`
              relative min-w-13 min-h-13 lg:min-w-14 lg:min-h-14 rounded-none lg:rounded-full border flex items-center justify-center text-lg font-normal
              transition shadow-[0px_0px_15px_0px_#0000000D] lg:shadow-none
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
                        <span className="absolute w-18 lg:w-14 h-px bg-gray-300 rotate-[-45deg] lg:rotate-[-45deg]" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ================= Color: DETAILS ================= */}

            <div className="flex flex-col justify-center gap-4 pt-4 lg:py-0">
              <p className="font-bold text-lg xl:text-2xl text-light-black">
                Color
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
                        className={`text-xs font-normal ${
                          isSelected
                            ? "text-black/90 ring-light-gray-1 font-semibold"
                            : "text-gray-700"
                        }`}
                      >
                        {color.label}
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
              <p className="font-bold text-lg xl:text-2xl text-light-black">
                Best Offers
              </p>
              {OfferDetails.map((item) => (
                <>
                  <div className="space-y-3.75 text-light-black">
                    <p>
                      <span className="font-bold text-lg">
                        {item.offerName}{" "}
                      </span>
                      <span className="font-normal text-lg">
                        {item.offPercent}{" "}
                      </span>
                      <span className="font-normal text-lg">
                        {item.onOffer}
                      </span>{" "}
                      <span className="font-normal text-lg text-dark-blue">
                        {item.terms}
                      </span>
                    </p>
                  </div>
                </>
              ))}
            </div>

            <div className="flex w-full gap-4.5">
              {width > 1024 ? (
                <>
                  <div className="w-full max-w-full md:max-w-42 h-12 bg-dark-button-blue text-white rounded-10 cursor-pointer flex items-center justify-center hover:bg-blue-900 transition duration-100 ease-in-out">
                    <button className="font-normal text-lg text-white cursor-pointer ">
                      Add to bag
                    </button>
                  </div>
                  <div
                    onClick={() => setLiked(!liked)}
                    className="rounded-10 cursor-pointer flex items-center justify-center gap-[23.23px] group transition-all duration-150"
                  >
                    <img
                      src={liked ? PinkHeart : Heart}
                      alt="WishList"
                      loading="lazy"
                      width={25.38}
                      height={22.21}
                      className={`transition-all duration-200 ease-out group-hover:scale-120 active:scale-120 ${liked ? "scale-145" : "scale-100"}`}
                    />
                  </div>
                </>
              ) : (
                <div className="py-4 flex w-full gap-4">
                  <div className="w-full h-12 bg-dark-button-blue text-white rounded-10 cursor-pointer flex items-center justify-center gap-[23.23px]">
                    <button className="font-normal text-lg text-white">
                      Add to bag
                    </button>
                    <img
                      src={WhiteBag}
                      alt="WishList"
                      loading="lazy"
                      width={18}
                      height={18}
                    />
                  </div>
                  <div
                    onClick={() => setLiked(!liked)}
                    className="w-full h-12 border border-dark-button-blue rounded-10 cursor-pointer flex items-center justify-center gap-[23.23px] group transition-all duration-15"
                  >
                    <button className="font-normal text-lg text-light-black">
                      WishList
                    </button>

                    <img
                      src={liked ? PinkHeart : Heart}
                      alt="WishList"
                      loading="lazy"
                      width={20}
                      height={20}
                      className={`transition-all duration-200 ease-out group-hover:scale-120 active:scale-120 ${liked ? "scale-145" : "scale-100"}`}
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
        <SimilarProduct title="Customer also like" />
      </div>
      {/* ================= Pop Up ================= */}
      <PopUp
        isOpen={isSizePopupOpen}
        onClose={() => setIsSizePopupOpen(false)}
        buttonTitle="Done"
      >
        <h2 className="text-xl font-bold mb-4">Size Guide</h2>
        <div className="flex gap-3 flex-wrap min-h-100">
          <img src={sizeChart} alt="Size chart" loading="lazy" />
        </div>
      </PopUp>
    </ContainerLayout>
  );
};

export default ProductDetails;
