import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import levis from "../../../../assets/HomeSliderImages/levis.svg";

import "swiper/css";
import "swiper/css/navigation";
import "./Offers.css";
const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNsb3RoZXN8ZW58MHx8MHx8fDA%3D",
    brand: levis,
    subtitle: "Min 60% Off",
  },
  {
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop",
    brand: levis,
    subtitle: "Min 50% Off",
  },
  {
    image:
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    brand: levis,
    subtitle: "Min 40% Off",
  },
];

const OfferSlider = () => {
  return (
    <div className="px-3.75 2xl:px-0  pb-2 space-y-3 lg:space-y-[27px] mt-6 lg:mt-[85px]">
      <h3 className="xl:px-12.5 text-light-black font-bold text-2xl lg:text-4xl">
        Trending Offers
      </h3>

      <Swiper
        modules={[Navigation]}
        slidesPerView={1}
        centeredSlides={false}
        speed={800}
        navigation
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          1200: {
            slidesPerView: 1,
            centeredSlides: false,
          },
          1450: {
            slidesPerView: 1.888,
            centeredSlides: true,
          },
        }}
        className="offer-triple-slider"
      >
        {slides.map((slide, index) => (
          <SwiperSlide
            key={index}
            className=" flex items-center justify-center flex-col"
          >
            <div className="flex shadow-[0_0_12px_0_rgba(0,0,0,0.1)] h-100 lg:h-[587px] w-full items-center justify-between rounded-[10px] overflow-hidden bg-white">
              {/* LEFT CONTENT */}
              <div className="flex items-center justify-center flex-col w-full lg:min-w-[542px] space-y-5 xl:space-y-[65.27px]">
                <img src={slide.brand} alt="brand" className="w-[175px]" />
                <div className="flex justify-center flex-col items-center gap-4 xl:gap-10">
                  <p className="font-bold text-lg md:text-2xl lg:text-3xl xl:text-5xl">
                    {slide.subtitle}
                  </p>
                  <button className="border border-mid-gray py-1 px-9 rounded-[10px] cursor-pointer font-normal text-xl lg:text-2xl hover:bg-black hover:text-white transition ease-in-out duration-300 max-w-[172px]">
                    Explore
                  </button>
                </div>
              </div>

              {/* RIGHT IMAGE */}
              <img
                src={slide.image}
                alt="offer"
                className="hidden lg:inline xl:max-w-[calc(100vw-600px)] 2xl:min-w-[604px] h-full object-cover"
                loading="lazy"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default OfferSlider;
