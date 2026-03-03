import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import blackStar from "../../../../assets/black-star.svg";
import star from "../../../../assets/blank-star.svg";
import "./CustomerSay.css";
import { useWindow } from "../../../../hooks/useWidth";
import { testimonials } from "../../../../../data/TestimonialData";
import { useTranslation } from "react-i18next";

const CustomerSay = () => {
  const width = useWindow();
  const {t} = useTranslation('headers');
  return (
    <div className="space-y-3 xl:space-y-[27px] mt-6 lg:mt-[85px] px-3.5 lg:px-0">
      <h3 className="lg:px-3.75 xl:px-12.5 text-light-black font-bold text-2xl lg:text-4xl lg:mb-0">
        {t("headers:CustomerSay")}
      </h3>

      <Swiper
        modules={[Navigation, Autoplay]}
        slidesPerView={width > 768 ? 2 : 1}
        centeredSlides={true}
        spaceBetween={width > 1025 ? 62 : 20}
        speed={500}
        navigation
        loop
        autoplay={{ delay: 1400 }}
        className="customer-say"
      >
        {testimonials.map((item) => (
          <SwiperSlide key={item.id}>
            {/* YOUR CARD (unchanged) */}
            <div className="flex justify-start lg:justify-center px-1.5 md:px-0 py-0.5 lg:py-5 lg:py-[27px] gap-5">
              <div className="w-full lg:w-[946px] h-full xl:h-[476px] flex flex-col items-center justify-center rounded-10 shadow-[0_0_10px_0_rgba(0,0,0,0.1)] py-5 lg:py-[58px] px-4 lg:px-8 bg-white cursor-grab">
                <div className="w-37.5 h-37.5">
                  <img
                    src={item.image}
                    alt="Customer image"
                    className="rounded-full w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                <p className="font-bold text-xl lg:text-2xl text-center pt-4 text-light-black">
                  {t(`testimonials:${item.id}:name`)}
                </p>

                <div className="flex gap-2.75 items-center pt-3 xl:pt-4 2xl:pt-7.25 pb-6.98">
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
                    <img
                      src={star}
                      alt="star"
                      className="w-5 h-[19.2px]"
                      loading="lazy"
                    />
                  </div>
                  <p className="font-normal text-lg text-black">
                    {t(`testimonials:${item.id}:rating`)}
                  </p>
                </div>

                <p className="font-normal text-base xl:text-2xl text-center pt-3 lg:pt-6 text-light-black">
                  {t(`testimonials:${item.id}:review`)}
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
