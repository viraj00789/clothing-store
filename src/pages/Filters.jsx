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

const Filters = () => {
  const { category } = useParams();

  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedDiscount, setSelectedDiscount] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [showSideBar, setShowSideBar] = useState(true);

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

    // SORTING
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

  return (
    <ContainerLayout>
      <div className="flex gap-6 px-6 py-6 bg-gray-50 min-h-screen pt-30">
        <div
          className={`
    transition-all duration-200.12 ease
    ${showSideBar ? "w-115 opacity-100" : "w-0 opacity-0"}
  `}
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
        </div>

        <div className="flex-1">
          <div className="flex w-full items-center justify-between mb-5">
            <h2 className="text-2xl font-semibold capitalize">
              {category} Products
            </h2>
            {/* SORT SECTION */}
            <div className="flex items-center gap-4 xl:gap-11">
              <div
                className="flex items-center justify-center gap-3.5 cursor-pointer"
                onClick={() => setShowSideBar(!showSideBar)}
              >
                <p className="font-bold text-light-black text-2xl">Filters</p>
                <div>
                  <img src={Filter} alt="filter" loading="lazy" />
                </div>
              </div>

              <div className="flex items-center justify-end relative">
                <div className="relative inline-block">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border rounded-lg px-4 py-2 bg-white shadow-sm 
               focus:outline-none appearance-none 
               font-semibold text-gray-700 pr-10
               w-auto min-w-[180px] cursor-pointer"
                  >
                    <option value="" disabled hidden>
                      Sort By
                    </option>
                    <option value="popularity">Popularity</option>
                    <option value="low-high">Price - Low to High</option>
                    <option value="high-low">Price - High to Low</option>
                    <option value="newest">Newest</option>
                  </select>

                  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                    <img
                      src={DownArrow}
                      alt="dropdown arrow"
                      className="w-4 h-4"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredProducts.length === 0 && (
            <div className="text-center text-gray-500 mt-10">
              No products found.
            </div>
          )}
        </div>
      </div>
    </ContainerLayout>
  );
};

export default Filters;
