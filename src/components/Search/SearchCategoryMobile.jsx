import { FiSearch, FiBell } from "react-icons/fi";
import { GiShirt } from "react-icons/gi";
import { MdWork, MdCheckroom } from "react-icons/md";
import { FaTshirt } from "react-icons/fa";
import { PiPants } from "react-icons/pi";
import { useNavigate } from "react-router";
import { useWindow } from "../../hooks/useWidth";
import { useEffect } from "react";

export default function SearchCategoryMobile() {
  const navigate = useNavigate();
  const window = useWindow();

  const men = [
    {
      link: "/search/all/?q=Casual T-Shirt",
      name: "Casual T-Shirt",
      icon: <GiShirt size={22} />,
    },
    {
      link: "/search/all/?q=Formal Shirt",
      name: "Formal Shirt",
      icon: <MdWork size={22} />,
    },
    {
      link: "/search/all/?q=Men's Leather Jacket",
      name: "Men's Leather Jacket",
      icon: <FaTshirt size={22} />,
    },
    {
      link: "/search/all/?q=Casual T-Shirt",
      name: "Casual T-Shirt",
      icon: <FaTshirt size={22} />,
    },
    {
      link: "/search/all/?q=Men's Track Pants",
      name: "Men Pants",
      icon: <PiPants size={22} />,
    },
    {
      link: "/search/all/?q=Men's Winter Jacket",
      name: "Men's Winter Jacket",
      icon: <MdCheckroom size={22} />,
    },
  ];

  const women = [
    {
      link: "/search/all/?q=Women's Summer Dress",
      name: "Summer Dress",
      icon: <GiShirt size={22} />,
    },
    {
      link: "/search/all/?q=Women's Denim Jacket",
      name: "Woman Jacket",
      icon: <FaTshirt size={22} />,
    },
    {
      link: "/search/all/?q=Women's Jumpsuit",
      name: "Woman Jumpsuit",
      icon: <PiPants size={22} />,
    },
    {
      link: "/search/all/?q=Women's Kurti",
      name: "Women's Kurti",
      icon: <GiShirt size={22} />,
    },
    {
      link: "/search/all/?q=Women's Maxi Dress",
      name: "Women's Maxi Dress",
      icon: <GiShirt size={22} />,
    },
  ];

  useEffect(() => {
    if (window.innerWidth > 500) {
      navigate("/search/all");
    }
  }, [navigate, window]);

  return (
    <div className="min-h-screen bg-gray-50 py-4 px-3 sm:px-30">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="relative w-full mr-3">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            placeholder="Search..."
            className="w-full bg-gray-200 rounded-xl h-10 pl-10 pr-4 text-sm focus:outline-none"
          />
        </div>

        <div className="relative">
          <FiBell size={22} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </div>
      </div>

      {/* Men Section */}
      <h2 className="text-dark-blue font-bold text-xl mb-4">Man Fashion</h2>
      <div className="grid grid-cols-3 gap-y-6 text-center">
        {men.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center"
            onClick={() => navigate(`${item.link}`)}
          >
            <div className="w-16 h-16 border border-gray-300 rounded-full flex items-center justify-center text-dark-blue">
              {item.icon}
            </div>
            <p className="text-sm mt-2 text-gray-600 leading-tight">
              {item.name}
            </p>
          </div>
        ))}
      </div>

      {/* Women Section */}
      <h2 className="text-dark-blue font-bold text-xl mt-8 mb-4">
        Woman Fashion
      </h2>
      <div className="grid grid-cols-3 gap-y-6 text-center">
        {women.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center"
            onClick={() => navigate(`${item.link}`)}
          >
            <div className="w-16 h-16 border border-gray-300 rounded-full flex items-center justify-center text-dark-blue">
              {item.icon}
            </div>
            <p className="text-sm mt-2 text-gray-600 leading-tight">
              {item.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
