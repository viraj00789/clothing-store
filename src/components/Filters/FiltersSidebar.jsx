import { useState } from "react";
import { Range, getTrackBackground } from "react-range";
import { FiChevronDown } from "react-icons/fi";
import CustomCheckbox from "../ui/CheckBox";

const STEP = 100;
const MIN = 0;
const MAX = 5000;

const FiltersSidebar = ({
  products,
  priceRange,
  setPriceRange,
  selectedBrands,
  setSelectedBrands,
  selectedColors,
  setSelectedColors,
  selectedDiscount,
  setSelectedDiscount,
  clearFilters,
}) => {
  const [showAllBrands, setShowAllBrands] = useState(false);
  const [showAllColors, setShowAllColors] = useState(false);

  const brands = [...new Set(products.map((p) => p.brand))];
  const colors = [...new Set(products.map((p) => p.color))];

  const [openSections, setOpenSections] = useState({
    price: true,
    brand: true,
    color: true,
    discount: true,
  });

  const toggleItem = (value, list, setList) => {
    if (list.includes(value)) {
      setList(list.filter((item) => item !== value));
    } else {
      setList([...list, value]);
    }
  };
  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const visibleBrands = showAllBrands ? brands : brands.slice(0, 6);

  return (
    <div
      className="w-115 bg-white px-5 py-8 rounded-xl shadow-[0px_0px_30px_0px_#00000012]
 sticky top-25 h-fit"
    >
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h3 className=" text-xl xl:text-4xl font-semibold">Filters</h3>
        <button
          onClick={clearFilters}
          className="text-lg text-dark-blue cursor-pointer font-normal"
        >
          Clear All
        </button>
      </div>

      {/* PRICE FILTER */}
      <div className="">
        <button
          onClick={() => toggleSection("price")}
          className={`flex justify-between items-center w-full cursor-pointer ${
            !openSections.price
              ? "border-b border-dark-gray/50 pb-4 transition-all duration-500"
              : ""
          }`}
        >
          <h4 className="text-lg xl:text-2xl font-normal text-black">Price</h4>
          <FiChevronDown
            size={15}
            className={`transition-transform duration-300 ${
              openSections.price ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>

        <div
          className={`overflow-hidden transition-all duration-500 ${
            openSections.price
              ? "max-h-[500px] opacity-100 mt-6 pb-6 border-b border-dark-gray/50"
              : "max-h-0 opacity-0"
          }`}
        >
          <div className="relative m-3">
            <Range
              values={priceRange}
              step={STEP}
              min={MIN}
              max={MAX}
              onChange={(values) => setPriceRange(values)}
              renderTrack={({ props, children }) => {
                const { key, ...rest } = props;

                return (
                  <div
                    key={key}
                    {...rest}
                    className="h-1.5 max-w-72 w-full rounded-full"
                    style={{
                      background: getTrackBackground({
                        values: priceRange,
                        colors: ["#939393", "#2563eb", "#939393"],
                        min: MIN,
                        max: MAX,
                      }),
                    }}
                  >
                    {children}
                  </div>
                );
              }}
              renderThumb={({ props }) => {
                const { key, ...rest } = props;

                return (
                  <div
                    key={key}
                    {...rest}
                    className="h-5 w-5 bg-white border border-dark-gray rounded-full shadow-md"
                  />
                );
              }}
            />

            {/* Clickable Dots */}
            <div className="flex justify-between mt-4 px-1 max-w-72 w-full">
              {Array.from({ length: 9 }).map((_, i) => {
                const value = MIN + ((MAX - MIN) / 8) * i;

                const isActive =
                  value >= priceRange[0] && value <= priceRange[1];

                return (
                  <button
                    key={i}
                    onClick={() => {
                      // Decide which thumb to move (closer one)
                      const distToMin = Math.abs(value - priceRange[0]);
                      const distToMax = Math.abs(value - priceRange[1]);

                      if (distToMin < distToMax) {
                        setPriceRange([value, priceRange[1]]);
                      } else {
                        setPriceRange([priceRange[0], value]);
                      }
                    }}
                    className={`w-2 h-2 rounded-full transition ${
                      isActive ? "bg-blue-600" : "bg-mid-gray-1"
                    }`}
                  />
                );
              })}
            </div>
          </div>

          <div className="flex justify-between mt-6 text-gray-800 font-medium max-w-82">
            <div>
              <p className="text-lg font-normal text-mid-gray-2">Min</p>
              <p>Rs. {priceRange[0]}</p>
            </div>

            <div className="text-left">
              <p className="text-lg font-normal text-mid-gray-2">Max</p>
              <p>Rs. {priceRange[1]}</p>
            </div>
          </div>
        </div>
      </div>

      {/* BRAND FILTER */}
      <div className="my-4">
        <button
          onClick={() => toggleSection("brand")}
          className={`flex justify-between items-center w-full cursor-pointer ${
            !openSections.brand
              ? "border-b border-dark-gray/50 pb-4 transition-all duration-500"
              : ""
          }`}
        >
          <h4 className="text-lg xl:text-2xl font-normal text-black">Brand</h4>
          <FiChevronDown
            size={15}
            className={`transition-transform duration-300 ${
              openSections.brand ? "rotate-180" : ""
            }`}
          />
        </button>
        <div
          className={`overflow-hidden transition-all duration-500 border-b border-dark-gray/50 ${
            openSections.brand
              ? "max-h-150 opacity-100 my-6 pb-6 border-b border-dark-gray/50"
              : "max-h-0 opacity-0"
          }`}
        >
          <div className="space-y-3">
            {visibleBrands.map((brand) => {
              const count = products.filter((p) => p.brand === brand).length;

              return (
                <CustomCheckbox
                  key={brand}
                  checked={selectedBrands.includes(brand)}
                  onChange={() =>
                    toggleItem(brand, selectedBrands, setSelectedBrands)
                  }
                  label={brand}
                  count={count}
                />
              );
            })}
          </div>

          {/* MORE BUTTON */}
          {brands.length > 6 && (
            <button
              onClick={() => setShowAllBrands(!showAllBrands)}
              className="mt-3 text-dark-blue text-lg font-normal cursor-pointer"
            >
              {showAllBrands ? "Show Less" : `+ ${brands.length - 6} More`}
            </button>
          )}
        </div>
      </div>

      {/* COLOR FILTER */}
      <div className="my-4">
        <button
          onClick={() => toggleSection("color")}
          className={`flex justify-between items-center w-full cursor-pointer ${
            !openSections.color
              ? "border-b border-dark-gray/50 pb-4 transition-all duration-500"
              : ""
          }`}
        >
          <h4 className="text-lg xl:text-2xl font-normal text-black">Color</h4>
          <FiChevronDown
            size={15}
            className={`transition-transform duration-300 ${
              openSections.color ? "rotate-180" : ""
            }`}
          />
        </button>

        <div
          className={`overflow-hidden transition-all duration-500 ${
            openSections.color
              ? "max-h-[500px] opacity-100 mt-6 pb-6 border-b border-dark-gray/50"
              : "max-h-0 opacity-0"
          }`}
        >
          <div className="space-y-3">
            {(showAllColors ? colors : colors.slice(0, 6)).map((color) => {
              const count = products.filter((p) => p.color === color).length;

              return (
                <CustomCheckbox
                  key={color}
                  checked={selectedColors.includes(color)}
                  onChange={() =>
                    toggleItem(color, selectedColors, setSelectedColors)
                  }
                  label={color}
                  count={count}
                />
              );
            })}
          </div>

          {/* MORE BUTTON */}
          {colors.length > 6 && (
            <button
              onClick={() => setShowAllColors(!showAllColors)}
              className="mt-3 text-dark-blue text-lg font-normal cursor-pointer"
            >
              {showAllColors ? "Show Less" : `+ ${colors.length - 6} More`}
            </button>
          )}
        </div>
      </div>

      {/* DISCOUNT */}
      <div>
        <button
          onClick={() => toggleSection("discount")}
          className={`flex justify-between items-center w-full cursor-pointer ${
            !openSections.discount
              ? "border-b border-dark-gray/50 pb-4 transition-all duration-500"
              : ""
          }`}
        >
          <h4 className="text-lg xl:text-2xl font-normal text-black">
            Discount
          </h4>
          <FiChevronDown
            size={15}
            className={`transition-transform duration-300 ${
              openSections.discount ? "rotate-180" : ""
            }`}
          />
        </button>
        <div
          className={`overflow-hidden transition-all duration-500 ${
            openSections.discount
              ? "max-h-[500px] opacity-100 mt-6 pb-6 border-b border-dark-gray/50"
              : "max-h-0 opacity-0"
          }`}
        >
          <div className="space-y-3">
            {[10, 20, 30, 40, 50].map((d) => {
              const count = products.filter(
                (p) => parseInt(p.discount) >= d,
              ).length;

              return (
                <CustomCheckbox
                  key={d}
                  checked={selectedDiscount.includes(d)}
                  onChange={() =>
                    toggleItem(d, selectedDiscount, setSelectedDiscount)
                  }
                  label={`${d}% & above`}
                  count={count}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FiltersSidebar;
