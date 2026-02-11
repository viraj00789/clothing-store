import { useEffect, useEffectEvent, useState } from "react";
import { specifications } from "../../../data/ProductSpectification";
import RatingTab from "./RatingTab";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useWindow } from "../../hooks/useWidth";

const ProductSpecification = () => {
  const tabs = [
    "Product Details",
    "Specification",
    "Ratings & Reviews",
    "How this was made",
    "Manufacturing Information",
  ];
  const [activeTab, setActiveTab] = useState("Product Details");
  const width = useWindow();

  const isMobile = width <= 768;

  const toggleAccordion = (tab) => {
    setActiveTab((prev) => (prev === tab ? "" : tab));
  };

  const activeTabFunc = useEffectEvent(() => {
    setActiveTab(activeTab ? activeTab : tabs[0]);
  });

  useEffect(() => {
    activeTabFunc();
  }, [isMobile]);

  const renderContent = (tab) => {
    if (tab === "Product Details") {
      return (
        <div className="space-y-3 md:space-y-4 lg:space-y-[27px] py-4">
          <div>
            <h3 className="font-bold text-2xl mb-3 text-light-black hidden lg:flex">
              Product Details
            </h3>
            <p>
              Blue washed jacket, has a spread collar, 4 pockets, button
              closure, long sleeves, straight hem
            </p>
          </div>

          <div>
            <h3 className="font-bold text-2xl mb-3 text-light-black hidden lg:flex">
              Size & Fit
            </h3>
            <p>The model (height 5'8") is wearing a size S</p>
          </div>

          <div>
            <h3 className="font-bold text-2xl mb-3 text-light-black hidden lg:flex">
              Material & Care
            </h3>
            <p>100% cotton</p>
            <p>Machine Wash</p>
          </div>
        </div>
      );
    }

    if (tab === "Specification") {
      return (
        <div className="py-4 lg:mt-[27px]">
          <h2 className="text-2xl font-bold text-light-black mb-3 hidden-lg-flex">
            Specifications
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-2 gap-x-13 lg:gap-x-10 gap-y-[13px] w-full lg:max-w-md">
            {specifications.map((item, index) => (
              <div key={index} className="flex flex-col gap-[7px] lg:gap-2.5">
                <p className="text-lg font-normal text-dark-gray">
                  {item.label}
                </p>
                <p className="text-lg font-normal text-light-black">
                  {item.value}
                </p>
                <div className="h-px w-full bg-dark-white lg:bg-dark-gray mt-2" />
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (tab === "Ratings & Reviews") {
      return <RatingTab />;
    }

    if (tab === "How this was made") {
      return (
        <p className="py-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      );
    }

    if (tab === "Manufacturing Information") {
      return (
        <p className="py-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      );
    }

    return null;
  };

  return (
    <div className="w-full py-3.75 lg:py-15 xl:py-20 px-3.75 xl:px-12.5 2xl:px-[203px] bg-light-gray-3">
      {/* ===== DESKTOP TABS (UNCHANGED) ===== */}
      {!isMobile && (
        <>
          <div className="border-b border-dark-gray">
            <div className="flex gap-6 xl:gap-15 items-center justify-start lg:justify-center text-sm font-medium whitespace-nowrap overflow-x-auto">
              {tabs.map((tab) => {
                const isActive = activeTab === tab;

                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`
                      mb-5.5 transition relative cursor-pointer text-lg font-normal
                      ${
                        isActive
                          ? "text-dark-button-blue"
                          : "text-gray-500 hover:text-gray-700"
                      }
                    `}
                  >
                    {tab}

                    {isActive && (
                      <span className="absolute left-0 -bottom-[3px] w-full h-[3px] bg-dark-button-blue rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-6 text-gray-800">{renderContent(activeTab)}</div>
        </>
      )}

      {/* ===== MOBILE ACCORDION ===== */}
      {isMobile && (
        <div>
          {tabs.map((tab) => {
            const isOpen = activeTab === tab;

            return (
              <div key={tab} className="border-b border-dark-white">
                <button
                  onClick={() => toggleAccordion(tab)}
                  className={`w-full h-full flex items-center justify-between text-lg md:text-xl font-medium text-light-black pt-[15px] cursor-pointer ${isOpen ? "pb-0" : "pb-[15px]"}`}
                >
                  {tab}
                  <FiChevronDown
                    width={10.5}
                    height={5.25}
                    className={`transition-transform duration-300 ease-in-out text-dark-gray ${
                      isOpen ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>

                <div
                  className={`
    overflow-hidden transition-all duration-300 ease-in-out
    ${isOpen ? "max-h-1250 opacity-100 " : "max-h-0 opacity-0 mt-0"}
  `}
                >
                  <div className="text-gray-800">{renderContent(tab)}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProductSpecification;
