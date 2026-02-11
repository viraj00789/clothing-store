import ProductCard from "../components/ui/Card";
import ContainerLayout from "../layout/ContainerLayout";
import Button from "../components/ui/Button";
import PinkHeart from "../assets/Icons/Home/pink-heart.svg";
import { useWindow } from "../hooks/useWidth";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../store/slices/wishlistSlice";

const WishList = () => {
  const width = useWindow();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.wishlist.items);
  if (products.length === 0) {
    return (
      <ContainerLayout>
        <div className="pb-10 pt-20 text-center text-xl text-gray-600">
          Your wishlist is empty 💔
        </div>
      </ContainerLayout>
    );
  }

  return (
    <ContainerLayout>
      <div className="pb-10 pt-20 lg:pt-33 px-3.75 md:px-4 2xl:px-12 space-y-4 lg:space-y-6 bg-light-gray-1 rounded-10">
        <h1 className="text-xl md:text-2xl lg:text-4xl font-bold text-light-black">
          My WishList
        </h1>

        {width > 1024 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 2xl:gap-15">
            {products.map((product) => (
              <ProductCard
                showWishlistIcon={
                  <div className="relative">
                    <button
                      className="absolute top-3 right-3 z-1 rounded-full p-2 flex items-center justify-center bg-white shadow"
                      onClick={() => dispatch(removeFromWishlist(product.id))}
                    >
                      <img
                        className="cursor-pointer"
                        src={PinkHeart}
                        alt="Heart Icon"
                        loading="lazy"
                      />
                    </button>
                  </div>
                }
                product={product}
              />
            ))}
          </div>
        ) : (
          <div className="w-full flex flex-col">
            {products.map((product) => (
              <div className="flex items-center gap-3 w-full justify-between space-y-4">
                <div className="w-[87px] h-[77px] ">
                  <img
                    src={product.image}
                    alt={product.title}
                    loading="lazy"
                    className="h-full w-full rounded-[5px]"
                  />
                </div>
                <div className="flex  items-center justify-between w-full">
                  <div className="flex flex-col">
                    <p className="text-dark-button-blue font-bold">
                      {product.title}
                    </p>
                    <p className="font-bold text-dark-gray text-sm">
                      {product.brand}
                    </p>
                  </div>
                  <div className="flex flex-col items-center">
                    <p className="flex items-center gap-1 font-bold text-lg text-black">
                      <span className="text-lg">₹</span>
                      {product.price}
                    </p>
                    <img
                      onClick={() => dispatch(removeFromWishlist(product.id))}
                      className="cursor-pointer"
                      src={PinkHeart}
                      alt="Heart Icon"
                      loading="lazy"
                      width={18}
                      height={16}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="flex items-center justify-center">
          <Button
            buttonType="button"
            title="Add all to cart"
            buttonPadding="px-2 lg:px-3 py-3.5"
            className="max-w-[354px] h-13"
          />
        </div>
      </div>
    </ContainerLayout>
  );
};

export default WishList;
