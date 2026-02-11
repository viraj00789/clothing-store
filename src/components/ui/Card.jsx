import star from "../../assets/black-star.svg";

const ProductCard = ({ product, showWishlistIcon }) => {
  return (
    <div className="w-full min-h-full py-px px-px cursor-pointer rounded-[10px]">
      <div className="shadow-sm bg-white rounded-[10px]">
        {showWishlistIcon}

        <img
          className="h-[301px] w-full object-cover rounded-t-[10px]"
          src={product.allImages?.[0]}
          alt={product.title}
          loading="lazy"
        />

        <div className="px-5 py-2.5 space-y-2 rounded-b-[10px] min-h-full  md:min-h-[169px] 2xl:min-h-full">
          <div
            className="font-bold text-xl lg:text-[24px] text-light-black truncate"
            title={product.title}
          >
            {product.title}
          </div>

          <div className="flex gap-4 items-center">
            <p className="text-lg font-normal text-light-black">
              {product.brand}
            </p>
            <div className="flex items-center justify-center gap-2">
              <p className="text-black text-lg">{product.rating}</p>
              <img
                src={star}
                alt="rating star"
                width={18}
                height={18}
                loading="lazy"
              />
            </div>
          </div>

          <div className="flex gap-3 flex-wrap">
            <p className="font-bold text-lg lg:text-2xl whitespace-nowrap text-light-black">
              Rs. {product.price}
            </p>
            <p className="text-light-black line-through text-lg font-normal">
              Rs. {product.oldPrice}
            </p>
            <p className="text-green text-lg">({product.discount})</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
