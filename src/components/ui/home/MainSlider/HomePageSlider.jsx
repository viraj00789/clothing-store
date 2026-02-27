import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Autoplay } from "swiper/modules";

import background1 from "../../../../assets/HomeSliderImages/background1.svg";
import prada from "../../../../assets/HomeSliderImages/prada1.svg";
import "./HomeSlider.css";
import { useNavigate } from "react-router";
import { getItem } from "../../../../utils/localStorage";
import toast from "react-hot-toast";
import WheelImage from "../../../../assets/WheelOfSpin.png";

const HomePageSlider = () => {
  const navigate = useNavigate();
  const slides = [
    {
      image: WheelImage,
      fullImage: true,
      onClick: () => {
        if (getItem("spinned")) {
          toast.success("You have already spin the wheel.");
          return;
        }
        navigate("/wheelofspin");
      },
      // brand: prada,
      // title1: "Spin & Win Big Discounts",
      // title2: "50% - 80% off",
      // button: "Spin Now",
      // link: "/wheelofspin",
      // background:
      //   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSnuoKmuvpKII50YsNHfVbyChTlsXF09JaEw&s",
    },
    {
      image:
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      brand: prada,
      title1: "Big Fashion Festival",
      title2: "Upto 50% - 100% off",
      button: "Explore",
      link: "/product/11",
      background: background1,
      fullImage: false,
    },
    {
      image:
        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      brand: prada,
      title1: "Luxury Week Sale",
      title2: "Up to 60% off",
      button: "Shop Now",
      link: "/product/1",
      background: background1,
      fullImage: false,
    },
    {
      image:
        "https://plus.unsplash.com/premium_photo-1664202526559-e21e9c0fb46a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      brand: prada,
      title1: "New Season Arrivals",
      title2: "Fresh Styles 2026",
      button: "Discover",
      link: "/product/13",
      background: background1,
      fullImage: false,
    },
    {
      image:
        "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTEyfHxjbG90aGVzfGVufDB8fDB8fHww",
      brand: prada,
      title1: "Street Style Edit",
      title2: "Trending Now",
      button: "View Collection",
      link: "/product/15",
      background: background1,
      fullImage: false,
    },
    {
      image:
        "https://images.unsplash.com/photo-1507553532144-b9df5e38c8d1?q=80&w=1213&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      brand: prada,
      title1: "Exclusive Deals",
      title2: "Limited Time Only",
      button: "Grab Now",
      link: "/product/9",
      background: background1,
      fullImage: false,
    },
  ];
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
        speed={1000}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop={true}
        className="w-full h-[900px] home-slider"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            {slide.fullImage ? (
              // 🔥 FULL IMAGE SLIDE
              <div
                className="w-full h-[900px] cursor-pointer"
                onClick={() => {
                  if (slide.onClick) {
                    slide.onClick();
                  }
                }}
              >
                <img
                  src={slide.image}
                  alt="Full slide"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ) : (
              // 🔥 NORMAL LEFT + RIGHT CONTENT SLIDE
              <div className="flex w-full h-[900px] cursor-grab">
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
                  style={{ backgroundImage: `url(${slide.background})` }}
                >
                  <div className="flex flex-col items-center gap-10 lg:gap-[66px]">
                    <div>
                      <img
                        src={slide.brand}
                        loading="lazy"
                        alt="brand logo"
                        className="w-xs h-xs lg:w-sm lg:h-sm xl:h-full xl:w-full"
                      />
                    </div>

                    <div className="text-center flex flex-col gap-[34px] items-center justify-center">
                      <div className="gap-5 lg:space-y-[22px]">
                        <p className="text-2xl lg:text-5xl font-bold text-mid-gray">
                          {slide.title1}
                        </p>
                        <p className="text-2xl lg:text-5xl font-bold text-mid-gray">
                          {slide.title2}
                        </p>
                      </div>

                      <button
                        className="border-2 border-mid-gray py-1.5 px-8.5 rounded-[10px] cursor-pointer font-normal text-xl lg:text-2xl w-fit"
                        onClick={() => navigate(slide.link)}
                      >
                        {slide.button}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="custom-pagination mt-[17px] flex justify-center gap-3" />
    </div>
  );
};

export default HomePageSlider;
