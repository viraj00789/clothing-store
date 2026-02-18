import { useNavigate } from "react-router";
import { useWindow } from "../hooks/useWidth";
import ContainerLayout from "../layout/ContainerLayout";
import { products } from "../../data/ProductDetailsData";
import { formattedDate } from "../utils/date";
import { getItem } from "../utils/localStorage";

import SimilarProduct from "../components/ui/home/SimilarProduct";
import {
  addToWishlist,
  removeFromWishlist,
} from "../store/slices/wishlistSlice";
import { useDispatch, useSelector } from "react-redux";
import { isAuthenticatedFromStorage } from "../utils/Auth";
import PinkHeart from "../assets/Icons/Home/pink-heart.svg";
import Heart from "../assets/Icons/Home/GrayIcons/home-heart.svg";
import { useCallback } from "react";

const Orders = () => {
  const width = useWindow();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userName = getItem("auth")?.name;
  const { isAuthenticated = false } = isAuthenticatedFromStorage();
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const isInWishlist = useCallback(
    (id) => wishlistItems.some((item) => item.id === id),
    [wishlistItems],
  );
  const handleWishlist = (product) => {
    if (!isAuthenticated) {
      navigate("/sign-in");
      return;
    }
    if (isInWishlist(product.id)) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  return (
    <ContainerLayout>
      <div className="w-full flex flex-col px-3 md:px-25 lg:px-20 xl:px-75 2xl:px-95 pt-20 lg:pt-30 pb-15 lg:pb-20 space-y-6 xl:space-y-12">
        <h1 className="text-xl md:text-2xl lg:text-4xl font-bold ">
          My Orders{" "}
          {products?.length > 0 && (
            <span className="text-dark-blue">({products?.length} items)</span>
          )}
        </h1>
        <div className="space-y-4">
          <div className="w-full space-y-0 lg:space-y-8 max-w-full">
            {products?.map((product) => (
              <div
                className="flex items-center gap-3 w-full sm:rounded-10 sm:p-3 lg:p-4 lg:shadow-[0px_0px_10px_0px_#0000001A]
                      border-b last:border-0 lg:border-none border-light-gray-2 py-2 max-w-full"
                key={product.id}
              >
                <div className="flex gap-1.5 md:gap-4 items-center">
                  <div className="w-30 md:w-40 h-60 shrink-0">
                    <img
                      src={product.image}
                      alt={product.title}
                      loading="lazy"
                      className=" w-full h-full rounded-[5px] object-cover cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/${product.link}`);
                      }}
                    />
                  </div>
                </div>

                <div className="flex items-start justify-between w-full flex-col lg:flex-row gap-2">
                  <div className="flex flex-col space-y-1 sm:space-y-2 ">
                    <p
                      className={`text-light-black font-bold text-lg md:text-xl xl:text-2xl ${width < 375 ? "max-w-21" : "max-w-[150px]"}   sm:max-w-full truncate`}
                      title={product.title}
                    >
                      {product.title}
                    </p>
                    <p className="font-semibold text-md text-dark-gray flex gap-2 whitespace-nowrap">
                      <span className="text-light-black whitespace-nowrap">
                        Brand Name:
                      </span>
                      <span className="whitespace-nowrap">{product.brand}</span>
                    </p>
                    <p className="font-bold text-lg lg:text-xl text-dark-button-blue">
                      <span className="text-lg">₹</span> {product.price}
                    </p>
                    <p className="font-semibold text-md text-dark-gray flex gap-2 items-center">
                      <span className="text-light-black">Ship To:</span>
                      <span className="text-sm sm:text-md">{userName}</span>
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-3 truncate">
                    <div className="space-y-1.5 lg:space-y-2">
                      <p className="font-semibold text-md text-dark-gray flex gap-2 whitespace-nowrap">
                        <span className="text-light-black whitespace-nowrap ">
                          Order Number:
                        </span>
                        <span
                          className="max-w-25 sm:max-w-full truncate text-sm sm:text-md"
                          title={"#500-4996-9495"}
                        >
                          {"#500-4996-9495"}
                        </span>
                      </p>
                      <p className="font-semibold text-md text-dark-gray flex gap-2">
                        <span className="text-light-black">Order Date:</span>
                        <span className="max-w-25 sm:max-w-full truncate text-sm sm:text-md">
                          {formattedDate}
                        </span>
                      </p>
                      <div
                        onClick={() => handleWishlist(product)}
                        className="w-35 h-10 sm:h-12 border border-dark-gray rounded-10 cursor-pointer flex items-center justify-center gap-5 group transition-all duration-15"
                      >
                        <button className="font-normal text-lg text-light-black">
                          WishList
                        </button>

                        <img
                          src={isInWishlist(product.id) ? PinkHeart : Heart}
                          alt="WishList"
                          loading="lazy"
                          width={20}
                          height={20}
                          className={`transition-all duration-200 ease-out group-hover:scale-120 active:scale-120 ${isInWishlist(product.id) ? "scale-145" : "scale-100"}`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mb-20">
        <SimilarProduct products={products} title="Trending Products" />
      </div>
    </ContainerLayout>
  );
};

export default Orders;
