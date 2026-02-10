import { useState } from "react";
import { specifications } from "../../../data/ProductSpectification";
import RatingTab from "./RatingTab";

const ProductSpecification = () => {
  const tabs = ["Product Details", "Specification", "Ratings & Reviews"];
  const [activeTab, setActiveTab] = useState("Product Details");

  return (
    <div className="w-full py-15 xl:py-20 px-3.75 xl:px-12.5 2xl:px-[203px] bg-light-gray-3">
      {/* Tabs Header */}
      <div className="border-b border-dark-gray">
        <div className="flex items-center justify-center gap-6 2xl:gap-[291px] text-sm font-medium">
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

                {/* Underline */}
                {isActive && (
                  <span className="absolute left-0 -bottom-[3px] w-full h-[3px] bg-dark-button-blue rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="mt-6 text-gray-800">
        {activeTab === "Product Details" && (
          <div className="space-y-[27px]">
            <div>
              <h3 className="font-bold text-2xl mb-3 text-light-black">
                Product Details
              </h3>
              <p>
                Blue washed jacket, has a spread collar, 4 pockets, button
                closure, long sleeves, straight hem
              </p>
            </div>

            <div>
              <h3 className="font-bold text-2xl mb-3 text-light-black">
                Size & Fit
              </h3>
              <p>The model (height 5'8") is wearing a size S</p>
            </div>

            <div>
              <h3 className="font-bold text-2xl mb-3 text-light-black">
                Material & Care
              </h3>
              <p>100% cotton</p>
              <p>Machine Wash</p>
            </div>
          </div>
        )}

        {activeTab === "Specification" && (
          <div className="mt-[27px]">
            <h2 className="text-2xl font-bold text-light-black mb-3">
              Specifications
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-[13px] max-w-md">
              {specifications.map((item, index) => (
                <div key={index} className="flex flex-col gap-2.5">
                  <p className="text-lg font-normal text-dark-gray">
                    {item.label}
                  </p>
                  <p className="text-lg font-normal text-light-black">
                    {item.value}
                  </p>
                  <div className="h-px w-full bg-dark-gray mt-2" />
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "Ratings & Reviews" && <RatingTab />}
      </div>
    </div>
  );
};

export default ProductSpecification;
