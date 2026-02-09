import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import blackStar from "../../../../assets/black-star.svg";
import star from "../../../../assets/blank-star.svg";
import "./CustomerSay.css";
import { useWindow } from "../../../../hooks/useWidth";

const CustomerSay = () => {
  const width = useWindow();
  return (
    <div className="space-y-3 xl:space-y-[27px] mt-6 lg:mt-[85px] px-3.5 lg:px-0">
      <h3 className="lg:px-3.75 xl:px-12.5 text-light-black font-bold text-2xl lg:text-4xl lg:mb-0">
        What Our Customer Says
      </h3>

      <Swiper
        modules={[Navigation, Autoplay]}
        slidesPerView={width > 768 ? 1.889 : 1}
        centeredSlides={width > 1024}
        spaceBetween={width > 1629 ? 0 : 15}
        speed={800}
        navigation
        onSwiper={(swiper) => {
          setTimeout(() => {
            swiper.autoplay?.start();
          }, 1000);
        }}
        className="customer-say"
      >
        {[...Array(3)].map((_, i) => (
          <SwiperSlide key={i}>
            {/* YOUR CARD (unchanged) */}
            <div className="flex justify-start lg:justify-center px-px lg:px-0 py-0.5 lg:py-5 lg:py-[27px] gap-5">
              <div className="w-full lg:w-236.5 h-full xl:h-[476px] flex flex-col items-center justify-center shadow-[0_0_10px_0_rgba(0,0,0,0.1)] py-5 lg:py-[57.5px] px-4 lg:px-8 bg-white cursor-grab">
                <div className="w-37.5 h-37.5">
                  <img
                    src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=60"
                    alt="Customer image"
                    className="rounded-full w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                <div className="flex gap-2.75 items-center pt-3 lg:pt-7.25 pb-6.98">
                  <div className="flex gap-0.5">
                    {[...Array(4)].map((_, index) => (
                      <img
                        src={blackStar}
                        alt="star"
                        key={index}
                        className="w-5 h-[19.2px]"
                        loading="lazy"
                      />
                    ))}
                    <img src={star} alt="star" className="w-5 h-[19.2px]" loading="lazy"/>
                  </div>
                  <p className="font-normal text-lg">4.4</p>
                </div>

                <p className="font-normal text-base xl:text-2xl text-center pt-3 lg:pt-6">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dui
                  vel morbi cursus sed sodales molestie proin dictum gravida.
                  Porttitor maecenas tincidunt ipsum semper malesuada. In sapien
                  feugiat laoreet convallis eu sed. Sapien et montes, duis
                  tempor euismod augue cras eu eget. Risus suspendisse mauris
                  ullamcorper
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CustomerSay;
