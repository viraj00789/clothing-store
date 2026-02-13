import { useNavigate } from "react-router";
import catArrow from "../../../assets/cat-arrow.svg";

const Categories = () => {
  const navigate = useNavigate();
  return (
    <div className="px-3.75 xl:px-12.5 pb-0 lg:pb-2 space-y-3 xl:space-y-[27px] mt-6 lg:mt-[83px]">
      <h3 className="text-light-black font-bold text-2xl lg:text-4xl">
        Shop by Categories
      </h3>

      {/* MAIN FLEX WRAPPER */}
      <div className="flex flex-col lg:flex-row gap-3 xl:gap-[25px] h-full 2xl:max-h-[686px]">
        {/* LEFT BIG ITEM */}
        <div
          className="relative overflow-hidden rounded-[10px] group cursor-pointer w-full lg:max-w-147.5"
          onClick={() => navigate("/product/12")}
        >
          <img
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1200&auto=format&fit=crop"
            alt="Women Pants"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute top-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p
              className="font-bold text-lg xl:text-2xl truncate"
              title="Women Pants"
            >
              Women Pants
            </p>
            <div className="flex items-center gap-2 mt-1">
              <p className="font-bold text-md lg:text-xl">Explore</p>
              <img src={catArrow} alt="catArrow" loading="lazy" />
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex flex-col gap-4 xl:gap-[25px] w-full lg:max-w-[1205px]">
          {/* TOP ROW */}
          <div className="flex flex-col sm:flex-row gap-3 xl:gap-[25px]  h-full 2xl:max-h-[330px]">
            {[
              {
                src: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop",
                label: "Mens Jacket",
                link: "/product/1",
              },
              {
                src: "https://images.unsplash.com/photo-1529720317453-c8da503f2051?q=80&w=1200&auto=format&fit=crop",
                label: "Sweater",
                link: "/product/13",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="relative overflow-hidden rounded-[10px] group cursor-pointer w-full"
                onClick={() => navigate(item.link)}
              >
                <img
                  src={item.src}
                  alt={item.label}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p
                    className="font-bold text-lg xl:text-2xl"
                    title={item.label}
                  >
                    {item.label}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="font-bold text-xl">Explore</p>
                    <img src={catArrow} alt="catArrow" loading="lazy" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* BOTTOM SECTION */}
          <div className="flex gap-3 xl:gap-[25px] flex-1 h-full 2xl:max-h-[330px]">
            {/* WOMENS TOPS */}
            <div
              className="relative overflow-hidden rounded-[10px] group cursor-pointer flex-[1]"
              onClick={() => navigate("/product/20")}
            >
              <img
                src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1200&auto=format&fit=crop"
                alt="Womens Tops"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute top-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p
                  className="font-bold text-lg xl:text-2xl truncate"
                  title="Womens Tops"
                >
                  Womens Tops
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <p className="font-bold text-md lg:text-xl">Explore</p>
                  <img src={catArrow} alt="catArrow" loading="lazy" />
                </div>
              </div>
            </div>

            {/* LAST TWO */}
            <div className="flex flex-col lg:flex-row gap-3 xl:gap-[25px] flex-1">
              {[
                {
                  src: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?q=80&w=1200&auto=format&fit=crop",
                  label: "Pants",
                  link: "/product/8",
                },
                {
                  src: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1200&auto=format&fit=crop",
                  label: "Womens Jackets",
                  link: "/product/9",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="relative overflow-hidden rounded-[10px] group cursor-pointer flex-1 truncate"
                  onClick={() => navigate(item.link)}
                >
                  <img
                    src={item.src}
                    alt={item.label}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-4 left-3.5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 truncate">
                    <p
                      className="font-bold text-lg xl:text-2xl truncate  md:max-w-[150px]"
                      title={item.label}
                    >
                      {item.label}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="font-bold text-md lg:text-lg xl:text-xl">
                        Explore
                      </p>
                      <img src={catArrow} alt="catArrow" loading="lazy" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
