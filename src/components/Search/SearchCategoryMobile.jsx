import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useWindow } from "../../hooks/useWidth";

export default function SearchCategoryMobile() {
  const navigate = useNavigate();
  const width = useWindow();

  const clothes = [
    { name: "T-Shirt", link: "/search/all/?q=T-Shirt" },
    { name: "Shirt", link: "/search/all/?q=Shirt" },
    { name: "Jacket", link: "/search/all/?q=Jacket" },
    { name: "Hoodie", link: "/search/all/?q=Hoodie" },
    { name: "Sweater", link: "/search/all/?q=Sweater" },
    { name: "Jeans", link: "/search/all/?q=Jeans" },
    { name: "Pants", link: "/search/all/?q=Pants" },
    { name: "Shorts", link: "/search/all/?q=Shorts" },
    { name: "Dress", link: "/search/all/?q=Dress" },
  ];

  const types = [
    { name: "Men", link: "/search/all/?q=Men" },
    { name: "Women", link: "/search/all/?q=Women" },
    { name: "Kids", link: "/search/all/?q=Kids" },
  ];

  useEffect(() => {
    if (width > 500) {
      navigate("/search/all");
    }
  }, [navigate, width]);

  return (
    <>
      {width < 500 && (
        <div className="min-h-screen bg-gray-50 pt-20 px-4">
          {/* Clothes Section */}
          <h2 className="text-dark-blue text-sm font-normal mb-5">Clothes</h2>

          <div className="flex flex-wrap gap-5.5 mb-8">
            {clothes.map((item, index) => (
              <div
                key={index}
                onClick={() => navigate(item.link)}
                className="w-fit p-4 bg-white border border-[#E2E6F2] h-14 flex items-center justify-center text-sm font-medium cursor-pointer hover:bg-blue-50 transition text-light-black rounded-[5px]"
              >
                {item.name}
              </div>
            ))}
          </div>

          {/* Type Section */}
          <h2 className="text-dark-blue text-sm font-normal mb-5">Type</h2>

          <div className="flex flex-wrap gap-5.5">
            {types.map((item, index) => (
              <div
                key={index}
                onClick={() => navigate(item.link)}
                className="w-fit p-4 bg-white border border-[#E2E6F2] h-14 flex items-center justify-center text-sm font-medium cursor-pointer hover:bg-blue-50 transition text-light-black rounded-[5px]"
              >
                {item.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
