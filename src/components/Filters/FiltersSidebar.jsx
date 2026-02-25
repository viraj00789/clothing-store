import { useState } from "react";
import { Range, getTrackBackground } from "react-range";
import { FiChevronDown } from "react-icons/fi";
import CustomCheckbox from "../ui/CheckBox";
import { useWindow } from "../../hooks/useWidth";
import { useNavigate } from "react-router";
import cross from "../../assets/cross.svg";

const STEP = 100;
const MIN = 0;
const MAX = 5000;
const MIN_DISTANCE = 100;
const MAX_DISTANCE = 5000;

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
  onClose,
}) => {
  const [showAllBrands, setShowAllBrands] = useState(false);
  const [showAllColors, setShowAllColors] = useState(false);
  const width = useWindow();
  const navigate = useNavigate();

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
  const visibleColors = showAllColors ? colors : colors.slice(0, 6);

  return (
    <div
      className="w-full lg:w-78 xl:w-115 px-0 sm:px-5 pb-8 rounded-xl
  h-full lg:h-[calc(100vh-122px)] overflow-auto sticky lg:top-30 bg-white shadow-[0px_0px_30px_0px_#00000012]"
    >
      {/* HEADER */}
      <div className="flex justify-between items-center px-4 sm:px-0 py-7.5 sticky top-0 bg-white z-10">
        <div className="flex items-center gap-4">
          {width < 768 && (
            <img
              src={cross}
              className="w-[14px] h-[14px] cursor-pointer"
              loading="lazy"
              onClick={onClose}
            />
          )}
          <h3 className="text-xl xl:text-4xl font-medium text-light-black">
            Filters {width < 768 && "search"}
          </h3>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              clearFilters();
              navigate("/search/all");
            }}
            className="text-lg text-dark-blue font-normal cursor-pointer"
          >
            Clear all
          </button>

          {/* CLOSE BUTTON - ONLY FOR MOBILE/FULLSCREEN */}
          {onClose && width >= 768 && (
            <button onClick={onClose} className="text-2xl font-bold lg:hidden">
              ✕
            </button>
          )}
        </div>
      </div>

      {/* PRICE FILTER */}
      <div className="">
        <button
          onClick={() => toggleSection("price")}
          className={`flex justify-between items-center w-full cursor-pointer px-4.75 sm:px-0 ${
            !openSections.price
              ? "border-b border-light-blue md:border-dark-gray/50 pb-4 md:pb-6 transition-all duration-300"
              : ""
          }`}
        >
          <h4 className="text-lg xl:text-2xl font-medium md:font-bold text-light-blue-dark md:text-black">
            Price
          </h4>
          <FiChevronDown
            size={width > 768 ? 30 : 20}
            className={`transition-transform duration-300 ${
              openSections.price ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>

        <div
          className={`overflow-hidden transition-all duration-300 px-3.75 sm:px-0 ${
            openSections.price
              ? "max-h-125 opacity-100 mt-6 pb-6 border-b border-light-blue md:border-dark-gray/50"
              : "max-h-0 opacity-0"
          }`}
        >
          <div className="relative m-3">
            <Range
              values={priceRange}
              step={STEP}
              min={MIN}
              max={MAX}
              onChange={(values) => {
                let [minVal, maxVal] = values;

                if (maxVal - minVal < MIN_DISTANCE) {
                  if (values[0] !== priceRange[0]) {
                    minVal = maxVal - MIN_DISTANCE;
                  } else {
                    maxVal = minVal + MIN_DISTANCE;
                  }
                }

                if (maxVal - minVal > MAX_DISTANCE) {
                  if (values[0] !== priceRange[0]) {
                    minVal = maxVal - MAX_DISTANCE;
                  } else {
                    maxVal = minVal + MAX_DISTANCE;
                  }
                }

                setPriceRange([minVal, maxVal]);
              }}
              renderTrack={({ props, children }) => {
                const { key, ...rest } = props;

                return (
                  <div
                    key={key}
                    {...rest}
                    className="h-1.5 max-w-full md:max-w-70 xl:ml-1 w-full rounded-full"
                    style={{
                      background: getTrackBackground({
                        values: priceRange,
                        colors:
                          width < 768
                            ? ["#EBF0FF", "#223263", "#EBF0FF"]
                            : ["#939393", "#2563eb", "#939393"],
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
                    className="h-5 w-5 bg-light-blue-dark md:bg-white border border-dark-gray rounded-full shadow-md"
                  />
                );
              }}
            />

            {/* Clickable Dots */}
            <div className="hidden md:flex justify-between mt-4 gap-3 max-w-full md:max-w-72 w-full">
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
                    className={`w-[5px] h-[5px] rounded-full transition cursor-pointer hidden md:flex ${
                      isActive ? "bg-blue-600" : "bg-dark-gray"
                    }`}
                  />
                );
              })}
            </div>
          </div>

          <div className="flex justify-between mt-[29px] text-gray-800 font-medium max-w-full md:max-w-82 px-2 sm:px-0">
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
      <div className="my-4 md:my-6">
        <button
          onClick={() => toggleSection("brand")}
          className={`flex justify-between items-center w-full cursor-pointer px-4.75 sm:px-0 ${
            !openSections.brand
              ? "border-b border-light-blue md:border-dark-gray/50 pb-4 md:pb-6 transition-all duration-300"
              : ""
          }`}
        >
          <h4 className="text-lg xl:text-2xl font-medium md:font-bold text-light-blue-dark md:text-black">
            Brand
          </h4>
          <FiChevronDown
            size={width > 768 ? 30 : 20}
            className={`transition-transform duration-300 ${
              openSections.brand ? "rotate-180" : ""
            }`}
          />
        </button>
        <div
          className={`overflow-hidden transition-all duration-300 border-b border-light-blue md:border-dark-gray/50 px-4.75 sm:px-0 ${
            openSections.brand
              ? "max-h-250 opacity-100 my-6 pb-6 border-b border-light-blue md:border-dark-gray/50"
              : "max-h-0 opacity-0"
          }`}
        >
          {width >= 768 ? (
            // DESKTOP: checkboxes
            <div className="space-y-[15px]">
              {visibleBrands.length > 0 ? (
                visibleBrands.map((brand) => {
                  const count = products.filter(
                    (p) => p.brand === brand,
                  ).length;
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
                })
              ) : (
                <p className="text-lg font-normal text-mid-gray-2 text-center">
                  No Brand found.
                </p>
              )}
            </div>
          ) : (
            // MOBILE: text block / pills
            <div className="flex flex-wrap gap-2">
              {brands.length > 0 ? (
                brands.map((brand) => {
                  const count = products.filter(
                    (p) => p.brand === brand,
                  ).length;
                  const isSelected = selectedBrands.includes(brand);

                  return (
                    <button
                      key={brand}
                      onClick={() =>
                        toggleItem(brand, selectedBrands, setSelectedBrands)
                      }
                      className={`p-4 border rounded-5 cursor-pointer text-sm ${
                        isSelected
                          ? "text-light-blue-dark bg-light-gray-4 border-light-gray-4"
                          : "text-light-blue-1 bg-white border-light-blue"
                      }`}
                    >
                      {brand} ({count})
                    </button>
                  );
                })
              ) : (
                <p className="text-lg font-normal text-mid-gray-2 text-center">
                  No Brand found.
                </p>
              )}
            </div>
          )}

          {/* MORE BUTTON */}
          {brands.length > 6 && width >= 768 && (
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
      <div className="my-4 md:my-6">
        <button
          onClick={() => toggleSection("color")}
          className={`flex justify-between items-center w-full cursor-pointer px-4.75 sm:px-0 ${
            !openSections.color
              ? "border-b border-light-blue md:border-dark-gray/50 pb-4 md:pb-6 transition-all duration-300"
              : ""
          }`}
        >
          <h4 className="text-lg xl:text-2xl font-medium md:font-bold text-light-blue-dark md:text-black">
            Color
          </h4>
          <FiChevronDown
            size={width > 768 ? 30 : 20}
            className={`transition-transform duration-300 ${
              openSections.color ? "rotate-180" : ""
            }`}
          />
        </button>

        <div
          className={`overflow-hidden transition-all duration-300 px-4.75 sm:px-0 ${
            openSections.color
              ? "max-h-250 opacity-100 mt-6 pb-6 border-b border-light-blue md:border-dark-gray/50"
              : "max-h-0 opacity-0"
          }`}
        >
          {width >= 768 ? (
            // DESKTOP: checkboxes
            <div className="space-y-[15px]">
              {visibleColors.length > 0 ? (
                visibleColors.map((color) => {
                  const count = products.filter(
                    (p) => p.color === color,
                  ).length;
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
                })
              ) : (
                <p className="text-lg font-normal text-mid-gray-2 text-center">
                  No Color found.
                </p>
              )}
            </div>
          ) : (
            // MOBILE: text block / pills
            <div className="flex flex-wrap gap-2">
              {colors.length > 0 ? (
                colors.map((color) => {
                  const count = products.filter(
                    (p) => p.color === color,
                  ).length;
                  const isSelected = selectedColors.includes(color);

                  return (
                    <button
                      key={color}
                      onClick={() =>
                        toggleItem(color, selectedColors, setSelectedColors)
                      }
                      className={`p-4 border rounded-5 cursor-pointer text-sm ${
                        isSelected
                          ? "text-light-blue-dark bg-light-gray-4 border-light-gray-4"
                          : "text-light-blue-1 bg-white border-light-blue"
                      }`}
                    >
                      {color} ({count})
                    </button>
                  );
                })
              ) : (
                <p className="text-lg font-normal text-mid-gray-2 text-center">
                  No Color found.
                </p>
              )}
            </div>
          )}

          {/* MORE BUTTON */}
          {colors.length > 6 && width >= 768 && (
            <button
              onClick={() => setShowAllColors(!showAllColors)}
              className="mt-3 text-dark-blue text-lg font-normal cursor-pointer"
            >
              {showAllColors ? "Show Less" : `+ ${colors.length - 6} More`}
            </button>
          )}
        </div>
      </div>

      {/* DISCOUNT FILTER */}
      <div>
        <button
          onClick={() => toggleSection("discount")}
          className={`flex justify-between items-center w-full cursor-pointer px-4.75 sm:px-0 ${
            !openSections.discount
              ? "border-b border-light-blue md:border-dark-gray/50 pb-4 md:pb-6 transition-all duration-300"
              : ""
          }`}
        >
          <h4 className="text-lg xl:text-2xl font-medium md:font-bold text-light-blue-dark md:text-black">
            Discount
          </h4>
          <FiChevronDown
            size={width > 768 ? 30 : 20}
            className={`transition-transform duration-300 ${
              openSections.discount ? "rotate-180" : ""
            }`}
          />
        </button>
        <div
          className={`overflow-hidden transition-all duration-300 px-4.75 sm:px-0 ${
            openSections.discount
              ? "max-h-[500px] opacity-100 mt-6 pb-6 border-b border-light-blue md:border-dark-gray/50"
              : "max-h-0 opacity-0"
          }`}
        >
          {width >= 768 ? (
            // DESKTOP: checkboxes
            <div className="space-y-[15px]">
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
          ) : (
            // MOBILE: text block / pills
            <div className="flex flex-wrap gap-2">
              {[10, 20, 30, 40, 50].map((d) => {
                const count = products.filter(
                  (p) => parseInt(p.discount) >= d,
                ).length;
                const isSelected = selectedDiscount.includes(d);

                return (
                  <button
                    key={d}
                    onClick={() =>
                      toggleItem(d, selectedDiscount, setSelectedDiscount)
                    }
                    className={`p-4 border rounded-5 cursor-pointer text-sm ${
                      isSelected
                        ? "text-light-blue-dark bg-light-gray-4 border-light-gray-4"
                        : "text-light-blue-1 bg-white border-light-blue"
                    }`}
                  >
                    {d}% & above ({count})
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FiltersSidebar;
