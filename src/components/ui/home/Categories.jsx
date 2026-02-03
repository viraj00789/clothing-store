import catArrow from "../../../assets/cat-arrow.svg";
const Categories = () => {
  return (
    <div className="px-4 lg:px-12 pb-2 space-y-6 mt-6 lg:mt-[85px]">
      <h3 className="text-light-black font-bold text-xl md:text-2xl lg:text-4xl">
        Shop by Categories
      </h3>

      <div className="sm:grid flex flex-col grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Big item */}
        <div className="col-span-2 row-span-2 md:col-span-2 md:row-span-2 relative overflow-hidden rounded-[10px] group cursor-pointer h-[686px]">
          <img
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1200&auto=format&fit=crop"
            alt="fashion"
            className="w-full h-171.5 object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute top-4 left-4 text-white text-xl font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p className="font-bold text-2xl">Women Pants</p>
            <div className="flex item-center gap-2">
              <p className="font-bold text-xl">Explore</p>
              <img src={catArrow} alt="catArrow" />
            </div>
          </div>
        </div>

        {/* Normal items */}
        {[
          {
            src: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop",
            label: "Mens Jacket",
          },
          {
            src: "https://images.unsplash.com/photo-1529720317453-c8da503f2051?q=80&w=1200&auto=format&fit=crop",
            label: "Sweater",
          },
          {
            src: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1200&auto=format&fit=crop",
            label: "Womens Tops",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="relative overflow-hidden rounded-[10px] group cursor-pointer"
          >
            <img
              src={item.src}
              alt="fashion"
              className="w-full h-[330.5px] object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute top-4 left-4 text-white text-2xl font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {item.label}
              <div className="flex item-center gap-2">
                <p className="font-bold text-xl">Explore</p>
                <img src={catArrow} alt="catArrow" />
              </div>
            </div>
          </div>
        ))}

        {/* Last two together */}
        <div className="flex gap-4">
          {[
            {
              src: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?q=80&w=1200&auto=format&fit=crop",
              label: "Pants",
            },
            {
              src: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1200&auto=format&fit=crop",
              label: "Womens Jackets",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="relative overflow-hidden rounded-[10px] group flex-1  cursor-pointer"
            >
              <img
                src={item.src}
                alt="fashion"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute top-4 left-4 text-white text-2xl font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {item.label}
                <div className="flex item-center gap-2">
                  <p className="font-bold text-xl">Explore</p>
                  <img src={catArrow} alt="catArrow" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
