import { Link, useLocation, useNavigate } from "react-router";
import ContainerLayout from "../layout/ContainerLayout";
import Search from "../assets/search.svg";
import ClothingLogo from "../assets/clothing.png";
import Heart from "../assets/heart.svg";
import Cart from "../assets/cart.svg";
import Girl from "../assets/logged-girl.svg";
import { RxCross2, RxHamburgerMenu } from "react-icons/rx";
import { useEffect, useEffectEvent, useState } from "react";
import { IoClose, IoArrowBack } from "react-icons/io5";

import { getItem, removeItem } from "../utils/localStorage";
import {
  clearWishlist,
  getTotalWishlistItems,
} from "../store/slices/wishlistSlice";
import { useDispatch, useSelector } from "react-redux";
import { isAuthenticatedFromStorage } from "../utils/Auth";
import { navItems, navLinks } from "../../data/NavbarData";
import { clearCart } from "../store/slices/cartSlice";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const authUser = getItem("auth");
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const wishlistCount = useSelector(getTotalWishlistItems);
  const { isAuthenticated = false } = isAuthenticatedFromStorage();
  const dispatch = useDispatch();
  const isHome = currentPath === "/";
  const isSearch = currentPath === "/search";

  const routeMap = navItems.reduce((acc, item) => {
    acc[item.href] = item;
    return acc;
  }, {});
  const currentItem = routeMap[currentPath];

  const currentTitle = currentItem?.label || "";
  const { items } = useSelector((state) => state.cart);

  const closeSlider = useEffectEvent(() => {
    setOpen(false);
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)"); // Tailwind lg = 1024px

    const handleChange = (e) => {
      if (e.matches) {
        setOpen(false);
      }
    };

    mediaQuery.addEventListener("change", handleChange);

    if (mediaQuery.matches) {
      closeSlider();
    }

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return (
    <ContainerLayout>
      {/* Sticky navbar */}
      <div className="shadow-md max-w-480 w-full z-10 p-4 2xl:px-4 fixed top-0 bg-white mb-10">
        {/* Top bar */}
        <div className="flex w-full max-w-480 items-center justify-between gap-0 xl:gap-2">
          {/* Logo + desktop links */}
          <div className="flex items-center gap-2 lg:hidden">
            {/* Back button (not on home) */}
            {!isHome && (
              <button
                onClick={() => navigate(-1)}
                className="p-1 cursor-pointer"
              >
                <IoArrowBack className="w-6 h-6 cursor-pointer" />
              </button>
            )}

            {/* If search page → show search input */}
            {isSearch ? (
              <div className="relative w-[200px]">
                <input
                  type="search"
                  placeholder="Search"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className="w-full h-9 bg-light-gray focus:outline-none rounded-lg px-3 pr-10 text-sm"
                />
                {value && (
                  <button
                    type="button"
                    onClick={() => setValue("")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    <IoClose size={16} />
                  </button>
                )}
              </div>
            ) : isHome ? (
              // Home → keep your existing logo/user logic
              authUser ? (
                <div className="flex items-center gap-[13px]">
                  <img
                    src="https://images.unsplash.com/photo-1520975916090-3105956dac38?w=800&auto=format&fit=crop&q=60"
                    alt="logo"
                    loading="lazy"
                    className="w-[29px] h-[29px] rounded-full"
                  />
                  <p className="font-medium text-xl truncate text-black">
                    {authUser?.name}
                  </p>
                </div>
              ) : (
                <Link to="/sign-in">
                  <p className="font-bold">Sign In</p>
                </Link>
              )
            ) : (
              // Other pages → show title
              <p className="font-semibold text-lg text-light-black truncate">
                {currentTitle}
              </p>
            )}
          </div>

          <div className="flex items-center gap-4 2xl:gap-[161px]">
            <Link
              to="/"
              className="w-8 h-8 2xl:w-[57px] 2xl:h-[48px] hidden lg:flex"
            >
              <img
                src={ClothingLogo}
                alt="logo"
                loading="lazy"
                className="w-8 h-8 2xl:w-[57px] 2xl:h-[48px] cursor-pointer object-contain"
              />
            </Link>
            <ul className="hidden lg:flex gap-4 xl:gap-10">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-gray-700 hover:text-gray-900 font-normal text-lg truncate"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Desktop right section */}
          <div className="hidden lg:flex items-center gap-4 2xl:gap-15">
            <div className="relative">
              <div className="relative w-full 3xl:w-133">
                <input
                  type="search"
                  placeholder="Search"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className="w-full h-12 bg-light-gray focus:outline-none rounded-lg px-9 pr-12 appearance-none
                   [&::-webkit-search-cancel-button]:hidden
                   [&::-webkit-search-decoration]:hidden
                   [&::-ms-clear]:hidden"
                />

                {value && (
                  <button
                    type="button"
                    onClick={() => setValue("")}
                    className="absolute right-12 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
                  >
                    <IoClose size={20} />
                  </button>
                )}
              </div>
              <img
                src={Search}
                alt="search"
                className="absolute right-4 top-1/2 -translate-y-1/2"
                loading="lazy"
              />
            </div>
            <div className="flex items-center gap-4 xl:gap-8">
              <div
                className="relative cursor-pointer"
                onClick={() => {
                  if (!isAuthenticated) {
                    navigate("/sign-in");
                    return;
                  }
                  navigate("/wishlist");
                }}
              >
                <img
                  src={Heart}
                  alt="wishlist"
                  loading="lazy"
                  className="w-[29px] h-[29px]"
                />

                {wishlistCount > 0 && (
                  <span
                    key={wishlistCount}
                    className="
        absolute -top-1.5 -right-1.5
        min-w-[18px] h-[18px]
        px-1
        bg-red-500 text-white text-[11px] font-bold
        rounded-full
        flex items-center justify-center
        animate-[pop_0.3s_ease-out]
      "
                  >
                    {wishlistCount}
                  </span>
                )}
              </div>

              <div className="relative cursor-pointer">
                <img
                  onClick={() => {
                    if (!isAuthenticated) {
                      navigate("/sign-in");
                      return;
                    }
                    navigate("/cart");
                  }}
                  src={Cart}
                  alt="logo"
                  loading="lazy"
                  className="w-[29px] h-[29px] cursor-pointer"
                />

                {items.length > 0 && (
                  <span
                    key={items.length}
                    className="
        absolute -top-1.5 -right-1.5
        min-w-[18px] h-[18px]
        px-1
        bg-red-500 text-white text-[11px] font-bold
        rounded-full
        flex items-center justify-center
        animate-[pop_0.3s_ease-out]
      "
                  >
                    {items.length}
                  </span>
                )}
              </div>

              {authUser ? (
                <div className="relative group flex items-center gap-[13px]">
                  <img
                    src={Girl}
                    alt="logo"
                    loading="lazy"
                    className="w-[29px] h-[29px] rounded-full"
                  />
                  <p className="font-normal text-lg truncate text-mid-dark-gray hidden xl:block">
                    {authUser?.name}
                  </p>
                  <button
                    onClick={() => {
                      localStorage.removeItem("auth");
                      navigate("/");
                      dispatch(clearWishlist());
                      dispatch(clearCart());
                    }}
                    className="
          absolute right-0 top-full mt-2
          opacity-0 invisible
          group-hover:opacity-100 group-hover:visible
          transition-all duration-200
          bg-white border border-gray-200 shadow-md
          text-sm text-dark-gray font-semibold
          px-3 py-1.5 rounded-md
          hover:bg-gray-200
          z-50
          whitespace-nowrap
           w-[150px]
           text-left
           cursor-pointer
        "
                  >
                    Logout
                  </button>
                  
                </div>
              ) : (
                <Link to="/sign-in">
                  <p>Sign In</p>
                </Link>
              )}
            </div>
          </div>

          {/* Mobile hamburger */}
          <div className="lg:hidden flex items-center gap-3">
            {/* <img
              src={Search}
              alt="logo"
              className="w-[20px] h-[20px] cursor-pointer"
            /> */}
            {/* Needed For Future */}
            {open ? (
              <RxCross2
                className="w-[29px] h-[29px] cursor-pointer"
                onClick={() => setOpen(false)}
              />
            ) : (
              <RxHamburgerMenu
                className="w-[29px] h-[29px] cursor-pointer"
                onClick={() => setOpen(true)}
              />
            )}
          </div>
        </div>

        {/* Mobile menu overlay */}
        <div
          className={`
            lg:hidden absolute top-full left-0 w-full overflow-hidden transition-all duration-300 ease-out z-40 shadow-md
            ${open ? "max-h-[500px] opacity-100 mt-0" : "max-h-0 opacity-0 mt-0"}
          `}
        >
          <div className="bg-white space-y-4 p-4">
            {/* Mobile search */}
            <div className="relative">
              <div className="relative w-full xl:w-133">
                <input
                  type="search"
                  placeholder="Search"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className="w-full h-12 bg-light-gray focus:outline-none rounded-lg px-3 pr-12 appearance-none
                   [&::-webkit-search-cancel-button]:hidden
                   [&::-webkit-search-decoration]:hidden
                   [&::-ms-clear]:hidden"
                />

                {value && (
                  <button
                    type="button"
                    onClick={() => setValue("")}
                    className="absolute right-12 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    <IoClose size={20} />
                  </button>
                )}
              </div>
              <img
                src={Search}
                alt="search"
                className="absolute right-4 top-1/2 -translate-y-1/2"
                loading="lazy"
              />
            </div>

            {/* Mobile links */}
            <ul className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-gray-700 text-lg"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Mobile user info */}
            {/* <div className="flex items-center gap-4 mx-2">
              <div className="flex items-center gap-[13px]">
                <img src={Girl} alt="logo" className="w-[29px] h-[29px]" />
                <p className="text-lg">Anna Doe</p>
              </div>
            </div> */}

            {/* Mobile logout */}
            {authUser && (
              <div className="flex items-center gap-4">
                <p
                  className="text-gray-700 text-lg cursor-pointer"
                  onClick={() => {
                    removeItem("auth");
                    navigate("/");
                    dispatch(clearWishlist());
                    dispatch(clearCart());
                  }}
                >
                  Logout
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Bottom Navigation */}
      <div
        className="fixed bottom-0 left-0 right-0 h-[65px] bg-white border-t border-gray-200 flex lg:hidden justify-center items-center gap-10 xxs:gap-10 xs:gap-14 z-20 w-full shadow-[0_-1px_6px_rgba(0,0,0,0.06)]
"
      >
        {navItems.map((item) => {
          const isActive = currentPath === item.href;
          const isHeart = item.id === "heart";
          const isCart = item.id === "cart";

          return (
            <Link to={item.href} key={item.id}>
              <button className="flex flex-col items-center justify-center cursor-pointer relative">
                <img
                  src={isActive ? item.blue : item.gray}
                  alt={item.label}
                  className="w-6 h-6"
                  loading="lazy"
                />

                {isHeart && wishlistCount > 0 && (
                  <span
                    key={wishlistCount}
                    className="
              absolute -top-1 -right-2
              min-w-[16px] h-[16px]
              px-1
              bg-red-500 text-white text-[10px] font-bold
              rounded-full
              flex items-center justify-center
              animate-[pop_0.3s_ease-out]
            "
                  >
                    {wishlistCount}
                  </span>
                )}
                {isCart && items.length > 0 && (
                  <span
                    key={items.length}
                    className="
              absolute -top-1 -right-2
              min-w-[16px] h-[16px]
              px-1
              bg-red-500 text-white text-[10px] font-bold
              rounded-full
              flex items-center justify-center
              animate-[pop_0.3s_ease-out]
            "
                  >
                    {items.length}
                  </span>
                )}
              </button>
            </Link>
          );
        })}
      </div>
    </ContainerLayout>
  );
};

export default Navbar;
