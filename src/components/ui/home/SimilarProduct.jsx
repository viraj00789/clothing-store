// import star from "../../../assets/star.svg";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import { useWindow } from "../../../hooks/useWidth";
import { Link } from "react-router";

const products = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1540221652346-e5dd6b50f3e7?q=80&w=1169&auto=format&fit=crop",
    title: "Women's Denim Jacket",
    brand: "Levi's",
    rating: 4.4,
    price: 700,
    oldPrice: 1000,
    discount: "30% off",
    link: "/product/1",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Men's Leather Jacket",
    brand: "Zara",
    rating: 4.6,
    price: 1200,
    oldPrice: 2000,
    discount: "40% off",
    link: "/product/2",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fGNsb3RoZXN8ZW58MHx8MHx8fDA%3D",
    title: "Summer Dress",
    brand: "H&M",
    rating: 4.2,
    price: 900,
    oldPrice: 1500,
    discount: "40% off",
    link: "/product/3",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Casual T-Shirt",
    brand: "Nike",
    rating: 4.7,
    price: 500,
    oldPrice: 800,
    discount: "37% off",
    link: "/product/4",
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1542219550-2da790bf52e9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTV8fGNsb3RoZXN8ZW58MHx8MHx8fDA%3D",
    title: "Formal Shirt",
    brand: "Adidas",
    rating: 4.5,
    price: 650,
    oldPrice: 1000,
    discount: "35% off",
    link: "/product/5",
  },
];

const SimilarProduct = ({ title = "Similar Products" }) => {
  const width = useWindow();
  return (
    <div className="px-3.75 xl:px-12.5 space-y-3 lg:space-y-[27px]">
      <h3 className="text-light-black font-bold text-2xl lg:text-4xl">
        {title}
      </h3>

      <Swiper
        spaceBetween={width > 1025 ? 40 : 12}
        slidesPerView="auto"
        className="overflow-visible"
      >
        {products.map((product) => (
          <SwiperSlide
            key={product.id}
            className="!w-70 lg:!w-[410px] min-h-[317px] lg:!min-h-[423px] my-3 cursor-pointer rounded-[10px] shadow-[0px_0px_30px_0px_#0000000D]"
          >
            <Link
              className="bg-white rounded-[10px]"
              to={product.link}
            >
              <img
                className="h-[301px] w-full object-cover rounded-t-[10px]"
                src={product.image}
                alt={product.title}
                loading="lazy"
              />

              <div className="px-5 py-2.5 space-y-1 rounded-b-[10px] min-h-full sm:min-h-[150px] lg:min-h-full">
                <div
                  className="font-bold text-xl lg:text-[24px] text-light-black truncate"
                  title={product.title}
                >
                  {product.title}
                </div>

                <div className="flex gap-7.5 items-center">
                  <p className="text-lg font-normal text-light-black">
                    {product.brand}
                  </p>
                  {/* <div className="flex items-center justify-center gap-2">
                    <p className="text-dark-gray text-lg">{product.rating}</p>
                    <img
                      src={star}
                      alt=""
                      className="w-[18px] h-[17px]"
                      loading="lazy"
                    />
                  </div> */}
                </div>

                <div className="flex gap-1 flex-wrap">
                  <p className="font-bold text-lg lg:text-2xl whitespace-nowrap text-light-black">
                    Rs. {product.price}
                  </p>
                  <p className="text-dark-gray line-through text-lg font-normal">
                    Rs. {product.oldPrice}
                  </p>
                  <p className="text-green text-lg">({product.discount})</p>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SimilarProduct;
