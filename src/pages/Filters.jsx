import { useParams } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import { products } from "../../data/ProductDetailsData";
import FiltersSidebar from "../components/Filters/FiltersSidebar";
import ProductCard from "../components/ui/Card";
import ContainerLayout from "../layout/ContainerLayout";
import { useEffectEvent } from "react";
import Filter from "../assets/Icons/Filters/filters.svg";
import DownArrow from "../assets/Icons/Filters/down-arrow.svg";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { useWindow } from "../hooks/useWidth";
import { LiaFilterSolid } from "react-icons/lia";
import NoClothesFound from "../components/Filters/NoClothesFound";

const Filters = () => {
  const { category } = useParams();

  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedDiscount, setSelectedDiscount] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [showSideBar, setShowSideBar] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const width = useWindow();

  const formattedCategory =
    category.charAt(0).toUpperCase() + category.slice(1);

  const categoryProducts = useMemo(() => {
    return products.filter((p) => p.categories?.includes(formattedCategory));
  }, [category, formattedCategory]);

  const filteredProducts = useMemo(() => {
    let filtered = categoryProducts.filter((product) => {
      const priceMatch =
        product.price >= priceRange[0] && product.price <= priceRange[1];

      const brandMatch =
        selectedBrands.length === 0 || selectedBrands.includes(product.brand);

      const colorMatch =
        selectedColors.length === 0 || selectedColors.includes(product.color);

      const discountValue = parseInt(product.discount);
      const discountMatch =
        selectedDiscount.length === 0 ||
        selectedDiscount.some((d) => discountValue >= d);

      return priceMatch && brandMatch && colorMatch && discountMatch;
    });

    if (sortBy === "low-high") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "high-low") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === "newest") {
      filtered.sort((a, b) => b.id - a.id);
    }

    return filtered;
  }, [
    categoryProducts,
    priceRange,
    selectedBrands,
    selectedColors,
    selectedDiscount,
    sortBy,
  ]);

  const clearFilters = () => {
    setPriceRange([0, 5000]);
    setSelectedBrands([]);
    setSelectedColors([]);
    setSelectedDiscount([]);
  };

  const clearFiltersEvent = useEffectEvent(() => {
    clearFilters();
  });

  useEffect(() => {
    clearFiltersEvent();
  }, [category]);

  // Lock scroll when drawer open
  useEffect(() => {
    if (showSideBar && width < 1024) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showSideBar, width]);

  return (
    <ContainerLayout>
      <div className="flex gap-3.75 lg:gap-6 px-3 lg:px-6 py-6 bg-gray-50 min-h-screen pt-20 lg:pt-30">
        {/* DESKTOP SIDEBAR (Inset Layout ≥1024) */}
        <AnimatePresence initial={false}>
          {width >= 1024 && !showSideBar && (
            <motion.div
              key="desktop-sidebar"
              // layout="size"
              // initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: 0.12, ease: "ease" }}
              className="w-78 xl:w-115"
            >
              <FiltersSidebar
                products={categoryProducts}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                selectedBrands={selectedBrands}
                setSelectedBrands={setSelectedBrands}
                selectedColors={selectedColors}
                setSelectedColors={setSelectedColors}
                selectedDiscount={selectedDiscount}
                setSelectedDiscount={setSelectedDiscount}
                clearFilters={clearFilters}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* MAIN CONTENT */}
        <div className="flex-1 w-full">
          <div className="flex w-full items-center justify-between mb-5">
            <h2 className="text-lg xl:text-2xl font-semibold capitalize max-w-full truncate whitespace-nowrap">
              {category} Products
            </h2>

            <div className="flex items-center gap-1.5 md:gap-4">
              {/* FILTER BUTTON (ALL SCREENS) */}
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setShowSideBar((prev) => !prev)}
              >
                <p className="font-bold text-sm md:text-lg xl:text-2xl">
                  Filters
                </p>
                {width >= 1024 ? (
                  <>
                    <img src={Filter} alt="filter" width={18} height={18} />
                  </>
                ) : (
                  <LiaFilterSolid size={22} className="cursor-pointer" />
                )}
              </div>

              {/* SORT */}
              <div className="relative">
                <button
                  onClick={() => setIsOpen((prev) => !prev)}
                  className="px-4 py-2 flex justify-between items-center gap-2 font-semibold text-light-black cursor-pointer! text-sm md:text-lg xl:text-2xl whitespace-nowrap"
                >
                  {sortBy
                    ? sortBy === "popularity"
                      ? "Popularity"
                      : sortBy === "low-high"
                        ? "Price - Low to High"
                        : sortBy === "high-low"
                          ? "Price - High to Low"
                          : "Newest"
                    : "Sort By"}

                  <img
                    src={DownArrow}
                    alt="dropdown arrow"
                    className={`w-3 h-3 transition-transform duration-200 mr-2 md:mr-0 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    loading="lazy"
                  />
                </button>

                {isOpen && (
                  <div className="absolute z-5 -left-12 mt-2 bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer">
                    <button
                      onClick={() => {
                        setSortBy("popularity");
                        setIsOpen(false);
                      }}
                      className={`w-full text-left text-sm px-4 py-3 font-medium hover:bg-blue-50 cursor-pointer ${
                        sortBy === "popularity"
                          ? "bg-blue-100 text-blue-700"
                          : "text-light-black"
                      }`}
                    >
                      Popularity
                    </button>

                    <button
                      onClick={() => {
                        setSortBy("low-high");
                        setIsOpen(false);
                      }}
                      className={`w-full text-left text-sm px-4 py-3 font-medium hover:bg-blue-50 cursor-pointer ${
                        sortBy === "low-high"
                          ? "bg-blue-100 text-blue-700"
                          : "text-gray-700"
                      }`}
                    >
                      Price - Low to High
                    </button>

                    <button
                      onClick={() => {
                        setSortBy("high-low");
                        setIsOpen(false);
                      }}
                      className={`w-full text-left text-sm px-4 py-3 font-medium hover:bg-blue-50 cursor-pointer ${
                        sortBy === "high-low"
                          ? "bg-blue-100 text-blue-700"
                          : "text-gray-700"
                      }`}
                    >
                      Price - High to Low
                    </button>

                    <button
                      onClick={() => {
                        setSortBy("newest");
                        setIsOpen(false);
                      }}
                      className={`w-full text-left text-sm px-4 py-3 font-medium hover:bg-blue-50 cursor-pointer ${
                        sortBy === "newest"
                          ? "bg-blue-100 text-blue-700"
                          : "text-gray-700"
                      }`}
                    >
                      Newest
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* PRODUCT GRID */}
          {filteredProducts.length > 0 ? (
            <motion.div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 lg:gap-6 items-stretch">
              <AnimatePresence initial={false}>
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    layout="position"
                    // initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.12, ease: "easeInOut" }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <NoClothesFound clearFilters={clearFilters} />
          )}
        </div>
      </div>

      {/* DRAWER FOR <1024 */}
      <AnimatePresence>
        {showSideBar && width < 1024 && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/40 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSideBar(false)}
            />

            {/* Drawer */}
            <motion.div
              className={`fixed top-0 left-0 h-full bg-white z-50 overflow-y-auto
              ${width < 768 ? "w-full" : "w-96"}`}
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3 }}
            >
              <FiltersSidebar
                products={categoryProducts}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                selectedBrands={selectedBrands}
                setSelectedBrands={setSelectedBrands}
                selectedColors={selectedColors}
                setSelectedColors={setSelectedColors}
                selectedDiscount={selectedDiscount}
                setSelectedDiscount={setSelectedDiscount}
                clearFilters={clearFilters}
                onClose={() => setShowSideBar(false)}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </ContainerLayout>
  );
};

export default Filters;
