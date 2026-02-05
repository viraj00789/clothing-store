import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

const images = [
  "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=500&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTExfHxmYXNoaW9ufGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1603189343302-e603f7add05a?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1612731486606-2614b4d74921?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fGZhc2hpb258ZW58MHx8MHx8fDA%3D",
];
const FeaturedBlog = () => {
  return (
    <div className="px-3.75 lg:px-12.5 pb-2 space-y-3 lg:space-y-[27px] mt-6 lg:mt-[85px]">
      <h3 className="text-light-black font-bold text-xl md:text-2xl lg:text-4xl">
        Featured Blogs
      </h3>
      <div className="overflow-hidden trending-scroll">
        <Swiper
          navigation
          spaceBetween={12}
          slidesPerView="auto"
          breakpoints={{
            1024: {
              spaceBetween: 63,
            },
          }}
        >
          {images.map((src, index) => (
            <SwiperSlide key={index} className="!w-auto p-px">
              <div className="max-w-[300px] md:max-w-[400px] lg:max-w-[760px] h-full flex flex-col lg:flex-row py-0.5 ">
                <div className="min-w-[300px] lg:min-w-[461px]">
                  <img
                    className="w-full md:min-w-[200px] h-[250px] lg:h-full object-cover"
                    src={src}
                    alt="Blog"
                  />
                </div>

                <div className="lg:min-w-[293px] px-8 py-6.25 space-y-4 lg:space-y-6 shadow-[0_0_50px_0_#96969612] rounded-[5px]">
                  <p className="font-normal text-lg text-dark-gray">Blog</p>
                  <p className="font-bold text-xl max-md:truncate">
                    Discover new way to decorate your home .
                  </p>
                  <p className="font-normal text-lg text-dark-gray max-md:truncate">
                    Lorem ipsum dolor sit amet, aliqua consectetur adipiscing
                    elit ut ...
                  </p>
                  <p className="h-px w-10 bg-dark-cyan" />
                  <p className="font-normal text-lg text-dark-cyan max-md:truncate">
                    By Souha .H
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="flex  items-center justify-center">
        <button className="border border-mid-gray py-1 px-3 lg:px-9.5 rounded-[10px] cursor-pointer font-normal text-xl lg:text-2xl lg:text-2xl hover:bg-black hover:text-white transition ease-in-out duration-300 max-w-[172px] whitespace-nowrap">
          View all
        </button>
      </div>
    </div>
  );
};

export default FeaturedBlog;
