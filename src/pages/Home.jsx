import { Link } from "react-router";
import { RxCross2 } from "react-icons/rx";
import { useState } from "react";
import HomePageSlider from "../components/ui/home/MainSlider/HomePageSlider";
import ContainerLayout from "../layout/ContainerLayout";
import star from "../assets/star.svg";

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
  },
];

const Home = () => {
  const [open, setOpen] = useState(true);

  return (
    <>
      <ContainerLayout>
        <div className="mt-20">
          {open && (
            <div className="w-full p-3.75 bg-light-gray-1 flex items-start md:items-center justify-between">
              <div />
              <div className="flex flex-col lg:flex-row items-center justify-center gap-3.75">
                <p className="text-sm lg:text-lg font-normal text-center">
                  Invite Friends and get 50% off on your next purchase
                </p>
                <Link to="/" className="text-dark-blue">
                  Invite Now
                </Link>
              </div>
              <div className="mt-0.5 md:mt-0">
                <RxCross2
                  className="cursor-pointer"
                  onClick={() => setOpen(false)}
                />
              </div>
            </div>
          )}

          <HomePageSlider />

          {/* Trending Now Section */}
          <div className="p-12.5 space-y-[27px]">
            <h3 className="text-light-black font-bold text-4xl">
              Trending Now
            </h3>

            {/* Horizontal scroll container */}
            <div className="flex gap-4 overflow-x-auto trending-scroll py-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="w-[410px] rounded overflow-hidden shadow-sm flex-shrink-0 bg-white cursor-pointer"
                >
                  <img
                    className="h-[301px] w-full object-cover"
                    src={product.image}
                    alt={product.title}
                    loading="lazy"
                  />
                  <div className="px-5 py-2.5 space-y-2.5">
                    <div className="font-bold text-[24px] mb-2">
                      {product.title}
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-lg font-normal text-light-black">
                        {product.brand}
                      </p>
                      <div className="flex items-center gap-2">
                        <p className="text-dark-gray">{product.rating}</p>
                        <img src={star} alt="" className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <p className="font-bold text-2xl">Rs. {product.price}</p>
                      <p className="text-dark-gray line-through text-lg font-normal">
                        Rs. {product.oldPrice}
                      </p>
                      <p className="text-green text-lg">({product.discount})</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ContainerLayout>
    </>
  );
};

export default Home;
