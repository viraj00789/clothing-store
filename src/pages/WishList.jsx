import ProductCard from "../components/ui/Card";
import ContainerLayout from "../layout/ContainerLayout";
import Button from "../components/ui/Button";
import PinkHeart from "../assets/Icons/Home/pink-heart.svg";
import { useWindow } from "../hooks/useWidth";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../store/slices/wishlistSlice";
import EmptyWishlist from "../assets/ProductDetails/wishlist.png";
import { addManyToCart } from "../store/slices/cartSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const WishList = () => {
  const width = useWindow();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.wishlist.items);
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const navigate = useNavigate();

  if (products.length === 0) {
    return (
      <ContainerLayout>
        <div className="pb-30 pt-40 text-center text-xl text-gray-600 flex flex-col items-center justify-center gap-10">
          <img src={EmptyWishlist} loading="lazy" width={200} height={200} />
          <div className="font-bold text-2xl xl:text-3xl">
            Your Wishlist is empty 💔
          </div>
        </div>
      </ContainerLayout>
    );
  }

  return (
    <ContainerLayout>
      <div className="pb-10 pt-20 lg:pt-30 px-3.75  md:px-25 lg:px-20 xl:px-10 2xl:px-12.5 space-y-4 lg:space-y-6 bg-light-gray-1 rounded-10">
        <h1 className="text-xl md:text-2xl lg:text-4xl font-bold text-light-black">
          My WishList
        </h1>

        {width > 1024 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 xl:gap-8 2xl:gap-15">
            {products.map((product) => (
              <div key={product.id} className="">
                <ProductCard
                  showWishlistIcon={
                    <div className="relative">
                      <button
                        className="absolute top-3 right-3 z-1 rounded-full p-2 flex items-center justify-center bg-white shadow"
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch(removeFromWishlist(product.id));
                        }}
                      >
                        <img
                          className="cursor-pointer"
                          src={PinkHeart}
                          alt="Heart Icon"
                          loading="lazy"
                          title="Click to remove from wishlist."
                        />
                      </button>
                    </div>
                  }
                  product={product}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full flex flex-col">
            {products.map((product) => (
              <div
                className="flex items-center gap-3 w-full justify-between space-y-4"
                key={product.id}
              >
                <div className="w-[87px] h-[77px] ">
                  <img
                    src={product.image}
                    alt={product.title}
                    loading="lazy"
                    className="h-full w-full rounded-[5px] object-cover cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/${product.link}`);
                    }}
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
                      title="Click to remove from wishlist."
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="flex items-center justify-center">
          <Button
            onClick={() => {
              if (wishlistItems.length === 0) {
                toast.error("Wishlist is empty");
                return;
              }
              dispatch(addManyToCart(wishlistItems));
              toast.success("All items added to cart 🛒");
            }}
            buttonType="button"
            title="Add all to cart"
            buttonPadding="px-2 lg:px-3 py-3.5"
            className="max-w-[354px] h-13 hover:bg-dark-gray-500!"
          />
        </div>
      </div>
    </ContainerLayout>
  );
};

export default WishList;
