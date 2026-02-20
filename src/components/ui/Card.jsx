import { useNavigate } from "react-router";
import star from "../../assets/black-star.svg";

const ProductCard = ({ product, showWishlistIcon }) => {
  const navigate = useNavigate();
  return (
    <div
      className="w-full h-full cursor-pointer rounded-[10px]"
      onClick={() => navigate(`/${product.link}`)}
    >
      <div className="shadow-sm bg-white rounded-[10px] flex flex-col h-full">
        {showWishlistIcon}

        <img
          className="w-full h-[301px] object-cover rounded-t-[10px]"
          src={product.allImages?.[0]}
          alt={product.title}
          loading="lazy"
        />

        <div className="px-4 md:px-5 py-3 flex flex-col grow space-y-1 md:space-y-2">
          <div
            className="font-bold text-xl lg:text-[24px] text-light-black truncate"
            title={product.title}
          >
            {product.title}
          </div>

          <div className="flex gap-1 sm:gap-2 lg:gap-4 items-center flex-wrap">
            <p
              className="text-md sm:text-lg text-light-black truncate"
              title={product.brand}
            >
              {product.brand}
            </p>

            <div className="flex items-center gap-2">
              <p className="text-black text-sm sm:text-lg">{product.rating}</p>
              <img
                src={star}
                alt="rating star"
                width={18}
                height={18}
                loading="lazy"
              />
            </div>
          </div>

          <div className=" flex gap-2 sm:gap-3 flex-wrap items-center">
            <p className="font-bold text-sm sm:text-lg lg:text-2xl text-light-black">
              Rs. {product.price}
            </p>

            <p className="line-through text-sm sm:text-lg text-light-black">
              Rs. {product.oldPrice}
            </p>

            <p className="text-green text-sm sm:text-lg">({product.discount})</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
