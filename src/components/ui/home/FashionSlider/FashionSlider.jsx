import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./FashionSlider.css";
import {
  FashionSides,
  FashionSidesMobile,
} from "../../../../../data/FashionSlidesData";
import { useWindow } from "../../../../hooks/useWidth";
import { useNavigate } from "react-router";

const FashionSlider = () => {
  const width = useWindow();
  const navigate = useNavigate();
  return (
    <>
      <Swiper
        modules={[Pagination, Autoplay]}
        speed={800}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        className="w-full h-[414px] lg:h-[892px] fashion-slider"
        pagination={{ clickable: true }}
      >
        {(width > 768 ? FashionSides : FashionSidesMobile).map(
          (slide, index) => (
            <SwiperSlide key={index} className="pt-0 lg:pt-[67px]">
              <div className="flex w-full h-[414px] lg:h-[892px] cursor-grab">
                {/* Left image */}
                <div className="hidden lg:inline w-[53%] h-full">
                  <img
                    src={slide.image}
                    alt={`${slide.title1} collection`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Right side content */}
                <div
                  className={`w-full lg:w-[47%] xl:h-full bg-cover bg-center  flex items-center justify-center ${width > 768 ? slide.backColor : ""} `}
                  style={{
                    backgroundImage:
                      width <= 768 ? `url(${slide.image})` : undefined,
                  }}
                >
                  <div
                    className={`flex flex-col items-center gap-[17px] xl:gap-[91px] lg:px-4 bg-light-black/50 w-full h-full justify-center`}
                    style={{
                      backgroundColor:
                        width < 768 ? `url(${slide.image})` : undefined,
                    }}
                  >
                    <div>
                      <img
                        src={slide.brand}
                        loading="lazy"
                        alt="brand logo"
                        className="w-[175px] h-[29px] xl:h-full xl:w-full"
                      />
                    </div>
                    <div className="flex flex-col items-center justify-center gap-[27px] xl:gap-[75px]">
                      <div className="text-center flex flex-col gap-4.5 xl:gap-9">
                        <p className="text-2xl xl:text-5xl font-bold text-white">
                          {slide.title1}
                        </p>
                        <p className="text-2xl xl:text-5xl font-bold text-white">
                          {slide.title2}
                        </p>
                      </div>
                      <button
                        className="border-2 border-white lg:border-mid-gray py-1.5 px-[31px] lg:py-2 lg:px-4.5 rounded-[5px] cursor-pointer font-normal text-base text-lg text-white"
                        onClick={() => navigate(slide.link)}
                      >
                        {slide.button}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ),
        )}
      </Swiper>
    </>
  );
};

export default FashionSlider;
