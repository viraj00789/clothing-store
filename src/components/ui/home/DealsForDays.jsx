import levis from "../../../assets/HomeSliderImages/levis.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import { useWindow } from "../../../hooks/useWidth";

import "swiper/css";
import "swiper/css/navigation";

const products = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fG1vZGVsfGVufDB8fDB8fHww",
    title: "Women's Denim Jacket",
    brand: "Levi's",
    price: 700,
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1629374029669-aab2f060553b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGZhc2hpb24lMjBtb2RlbHxlbnwwfHwwfHx8MA%3D%3D",
    title: "Men's Leather Jacket",
    brand: "Zara",
    price: 1200,
  },
  {
    id: 3,
    image:
      "https://plus.unsplash.com/premium_photo-1673757121102-0ca51260861f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fG1vZGVsfGVufDB8fDB8fHww",
    title: "Summer Dress",
    brand: "H&M",
    price: 900,
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fG1vZGVsfGVufDB8fDB8fHww",
    title: "Casual T-Shirt",
    brand: "Nike",
    price: 500,
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1568252542512-9fe8fe9c87bb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGZhc2hpb24lMjBtb2RlbHxlbnwwfHwwfHx8MA%3D%3D",
    title: "Formal Shirt",
    brand: "Adidas",
    price: 650,
  },
];
const DealsForDays = () => {
  const width = useWindow();
  return (
    <div className="px-3.75 xl:px-12.5 space-y-3 lg:space-y-[27px] mt-6 lg:mt-[85px] rounded-[10px]">
      <h3 className="text-light-black font-bold text-xl md:text-2xl lg:text-4xl">
        Deals of the Day
      </h3>

      <Swiper spaceBetween={width > 1025 ? 71 : 18} slidesPerView="auto">
        {products.map((product) => (
          <SwiperSlide
            key={product.id}
            className="!w-80 lg:!w-[490px] pl-px pb-px cursor-grab rouneded-10"
          >
            <div className="rounded overflow-hidden shadow-sm bg-white">
              <img
                className="h-[298px] w-full object-cover rounded-t-[10px]"
                src={product.image}
                alt={product.title}
                loading="lazy"
              />

              <div className="py-5 xl:py-7.5 flex flex-col items-center space-y-5 xl:space-y-10.75">
                <img
                  className="max-w-[151.26px] w-full object-cover"
                  src={levis}
                  alt={product.title}
                  loading="lazy"
                />

                <div className="space-y-5.75 text-light-black text-center">
                  <p className="font-bold text-xl lg:text-4xl">
                    Best of Styles
                  </p>
                  <p className="font-bold text-lg lg:text-2xl">Under Rs. 700</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default DealsForDays;
