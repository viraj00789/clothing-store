import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import forever from "../../../../assets/forever.svg";
import "./FashionSlider.css";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    brand: forever,
    title1: "Big Fashion Festival",
    title2: "50% - 80% off",
    button: "Explore Now",
    backColor: "bg-dark-green",
  },
  {
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    brand: forever,
    title1: "Luxury Week Sale",
    title2: "Up to 60% off",
    button: "Shop Now",
    backColor: "bg-rose-500",
  },
  {
    image:
      "https://plus.unsplash.com/premium_photo-1664202526559-e21e9c0fb46a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    brand: forever,
    title1: "New Season Arrivals",
    title2: "Fresh Styles 2026",
    button: "Discover",
    backColor: "bg-orange-200",
  },
  {
    image:
      "https://images.unsplash.com/photo-1507553532144-b9df5e38c8d1?q=80&w=1213&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    brand: forever,
    title1: "Exclusive Deals",
    title2: "Limited Time Only",
    button: "Grab Now",
    backColor: "bg-red-300",
  },
];

const FashionSlider = () => {
  return (
    <>
      <Swiper
        modules={[Pagination, Autoplay]}
        speed={800}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        className="w-full h-[800px] fashion-slider"
        pagination={{ clickable: true }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="pt-[67px]">
            <div className="flex w-full h-[800px] cursor-grab">
              {/* Left image */}
              <div className="hidden lg:inline w-1/2 h-full">
                <img
                  src={slide.image}
                  alt={`${slide.title1} collection`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Right side content */}
              <div
                className={`w-full lg:w-1/2 h-full bg-cover bg-center flex items-center justify-center ${slide.backColor}`}
              >
                <div className="flex flex-col items-center gap-9 lg:gap-[91px] lg:px-4">
                  <div>
                    <img
                      src={slide.brand}
                      loading="lazy"
                      alt="brand logo"
                      className="w-xs h-xs md:h-full md:w-full"
                    />
                  </div>
                  <div className="flex flex-col items-center justify-center gap-6 lg:gap-18.75">
                    <div className="text-center flex flex-col gap-5 lg:gap-9">
                      <p className="text-3xl xl:text-5xl font-bold text-white">
                        {slide.title1}
                      </p>
                      <p className="text-3xl xl:text-5xl font-bold text-white">
                        {slide.title2}
                      </p>
                    </div>
                    <button className="border-2 border-mid-gray p-3 lg:py-2.75 lg:px-5.25 rounded-[10px] cursor-pointer font-normal text-xl lg:text-2xl text-white">
                      {slide.button}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default FashionSlider;
