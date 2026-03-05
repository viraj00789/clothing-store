import { useEffect, useEffectEvent, useState } from "react";
import { specifications } from "../../../data/ProductSpectification";
import RatingTab from "./RatingTab";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useWindow } from "../../hooks/useWidth";
import { useTranslation } from "react-i18next";

const ProductSpecification = () => {
  const tabs = [
    "ProductDetails",
    "Specification",
    "RatingsReviews",
    "HowMade",
    "ManufacturingInfo",
  ];
  const [activeTab, setActiveTab] = useState("ProductDetails");
  const width = useWindow();
  const { t } = useTranslation();

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
    if (tab === "ProductDetails") {
      return (
        <div className="space-y-3 md:space-y-4 lg:space-y-[27px] py-4">
          <div>
            <h3 className="font-bold text-2xl mb-2 text-light-black hidden lg:flex">
              {t("productSpecification:ProductDetails:Title")}
            </h3>
            <p className="text-sm md:text-lg font-normal text-light-black">
              {t("productSpecification:ProductDetails:Description")}
            </p>
          </div>

          <div>
            <h3 className="font-bold text-2xl mb-2 text-light-black hidden lg:flex">
              {t("productSpecification:ProductDetails:SizeFitTitle")}
            </h3>
            <p className="text-sm md:text-lg text-light-black">
              {t("productSpecification:ProductDetails:SizeFitDescription")}
            </p>
          </div>

          <div>
            <h3 className="font-bold text-2xl mb-2 text-light-black hidden lg:flex">
              {t("productSpecification:ProductDetails:MaterialCareTitle")}
            </h3>
            <p className="text-sm md:text-lg text-light-black">
              {t("productSpecification:ProductDetails:MaterialCareDescription1")}
            </p>
            <p className="text-sm md:text-lg text-light-black">
              {t("productSpecification:ProductDetails:MaterialCareDescription2")}
            </p>
          </div>
        </div>
      );
    }

    if (tab === "Specification") {
      return (
        <div className="py-4 lg:mt-[11px]">
          <h2 className="text-2xl font-bold text-light-black mb-3 hidden-lg-flex">
            {t("productSpecification:Specifications:Title")}
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-2 gap-x-13 2xl:gap-x-[98px] gap-y-[13px] w-full lg:max-w-lg">
            {specifications.map((item, index) => (
              <div
                key={index}
                className="flex flex-col gap-[7px] lg:gap-3 whitespace-nowrap"
              >
                <div className="space-y-2.25">
                  <p className="text-sm md:text-lg text-dark-gray">
                    {t("productSpecification:Specifications:List:" + index + ":label")}
                  </p>
                  <p className="text-sm md:text-lg text-light-black">
                    {t("productSpecification:Specifications:List:" + index + ":value")}
                  </p>
                </div>
                <div className="h-px w-full bg-dark-white lg:bg-dark-gray" />
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (tab === "RatingsReviews") {
      return <RatingTab />;
    }

    if (tab === "HowMade") {
      return (
        <p className="py-4 font-normal text-sm lg:text-lg">
          {t("productSpecification:HowMade:Description")}
        </p>
      );
    }

    if (tab === "ManufacturingInfo") {
      return (
        <p className="py-4 font-normal text-sm lg:text-lg">
         {t("productSpecification:ManufacturingInfo:Description")}
        </p>
      );
    }

    return null;
  };

  return (
    <div className="w-full py-3.75 lg:py-15 xl:py-20 px-3.75 xl:px-12.5 2xl:px-[203px] bg-white sm:bg-light-gray-3">
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
                 mb-5.5 relative cursor-pointer text-sm md:text-lg
                 transition duration-300 ease-in-out font-normal
                 ${isActive ? "text-dark-button-blue" : "text-dark-gray lg:hover:text-gray-700"}
               `}
                  >
                    {t(`productSpecification:SpecTabs:${tab}`)}

                    {isActive && (
                      <span className="absolute left-0 -bottom-[3px] w-full h-[3px] bg-dark-button-blue rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-[11px] text-gray-800 relative">
            <div
              key={activeTab}
              className={`
      ${!isMobile ? "animate-fadeIn" : ""}
    `}
            >
              {renderContent(activeTab)}
            </div>
          </div>
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
