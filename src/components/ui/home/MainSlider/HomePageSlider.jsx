import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Autoplay } from "swiper/modules";

import background1 from "../../../../assets/HomeSliderImages/background1.svg";
import prada from "../../../../assets/HomeSliderImages/prada1.svg";
import "./HomeSlider.css";

// Slides data (same images, just wrapped in objects with text)
const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    brand: prada,
    title1: "Big Fashion Festival",
    title2: "50% - 80% off",
    button: "Explore",
  },
  {
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    brand: prada,
    title1: "Luxury Week Sale",
    title2: "Up to 60% off",
    button: "Shop Now",
  },
  {
    image:
      "https://plus.unsplash.com/premium_photo-1664202526559-e21e9c0fb46a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    brand: prada,
    title1: "New Season Arrivals",
    title2: "Fresh Styles 2026",
    button: "Discover",
  },
  {
    image:
      "https://images.unsplash.com/photo-1529720317453-c8da503f2051?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    brand: prada,
    title1: "Street Style Edit",
    title2: "Trending Now",
    button: "View Collection",
  },
  {
    image:
      "https://images.unsplash.com/photo-1507553532144-b9df5e38c8d1?q=80&w=1213&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    brand: prada,
    title1: "Exclusive Deals",
    title2: "Limited Time Only",
    button: "Grab Now",
  },
];

const HomePageSlider = () => {
  return (
    <div className="slider-wrapper">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{
          el: ".custom-pagination",
          clickable: true,
          bulletClass: "custom-bullet",
          bulletActiveClass: "custom-bullet-active",
        }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop={true}
        className="w-full h-[796px] home-slider"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="flex w-full h-[796px] cursor-grab">
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
                className="w-full lg:w-1/2 h-full bg-cover bg-center flex items-center justify-center"
                style={{ backgroundImage: `url(${background1})` }}
              >
                <div className="flex flex-col items-center gap-8.5">
                  <div>
                    <img src={slide.brand} loading="lazy" alt="brand logo"  className="w-xs h-xs d:h-full md:w-full"/>
                  </div>
                  <div className="text-center flex flex-col gap-5.5">
                    <p className="text-2xl lg:text-5xl font-bold text-mid-dark-gray">
                      {slide.title1}
                    </p>
                    <p className="text-2xl lg:text-5xl font-bold text-mid-dark-gray">
                      {slide.title2}
                    </p>
                  </div>
                  <button className="border border-mid-gray py-1 px-9 rounded-[10px] cursor-pointer font-normal text-xl lg:text-2xl">
                    {slide.button}
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="custom-pagination mt-[17px] flex justify-center gap-3" />
    </div>
  );
};

export default HomePageSlider;
