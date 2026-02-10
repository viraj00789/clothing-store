import { useParams } from "react-router";
import SimilarProduct from "../components/ui/home/SimilarProduct";
import ContainerLayout from "../layout/ContainerLayout";
import { products } from "../../data/TrendingSection";
import { useState } from "react";

const ProductDetails = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));

  const [activeImage, setActiveImage] = useState(product?.allImages?.[0]);

  if (!product) {
    return <div className="p-10 text-xl">Product not found ❌</div>;
  }
  return (
    <ContainerLayout>
      {" "}
      <div className="px-3.75 px-12 mt-[100px]">
        <div className="flex flex-col md:flex-row gap-8 ">
          {/* ================= LEFT: IMAGES ================= */}
          <div className="flex gap-4">
            {/* Thumbnails */}
            <div className="flex flex-col gap-3 max-h-[837px]  justify-center items-center">
              {product.allImages.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt=""
                  className={`object-cover rounded-10 cursor-pointer border ${
                    activeImage === img
                      ? "border-blue-300 border-3 w-[180px] h-[180px]"
                      : "border-gray-200  w-[165px] h-[165px]"
                  }`}
                  onClick={() => setActiveImage(img)}
                />
              ))}
            </div>

            {/* Main Image */}
            <div className="max-h-[837px] ">
              <img
                src={activeImage}
                alt={product.title}
                className="w-[700px] h-[837px] object-cover rounded"
                loading="lazy"
              />
            </div>
          </div>

          {/* ================= RIGHT: DETAILS ================= */}
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold">{product.title}</h1>
            <p className="text-gray-600">{product.brand}</p>

            <div className="flex items-center gap-2">
              <span className="font-semibold">{product.rating}</span>
              <span className="text-gray-500">⭐ rating</span>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-2xl font-bold">Rs. {product.price}</span>
              <span className="line-through text-gray-500">
                Rs. {product.oldPrice}
              </span>
              <span className="text-green-600">({product.discount})</span>
            </div>

            <div className="flex gap-4 mt-6">
              <button className="px-6 py-3 bg-blue-600 text-white rounded">
                Add to Cart
              </button>
              <button className="px-6 py-3 border rounded">❤️ Wishlist</button>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <SimilarProduct />
        <SimilarProduct title="Customer also like" />
      </div>
    </ContainerLayout>
  );
};

export default ProductDetails;
