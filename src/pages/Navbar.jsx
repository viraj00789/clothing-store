import { Link, NavLink, useLocation, useNavigate } from "react-router";
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
import { HideNavbarOn, navItems, navLinks } from "../../data/NavbarData";
import { clearCart } from "../store/slices/cartSlice";
import { products } from "../../data/ProductDetailsData";

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
  const isSearch = currentPath.startsWith("/search");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const queryFromURL = new URLSearchParams(location.search).get("q") || "";

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

  const userMenuItems = [
    {
      label: "Profile",
      to: "/profile",
      show: (authUser) => !!authUser,
    },
    {
      label: "Forgot Password",
      to: "/forgot-password",
      show: (authUser) => !!authUser, // or true if you want always visible
    },
    {
      label: "Logout",
      action: ({ navigate, dispatch }) => {
        removeItem("auth");
        navigate("/");
        dispatch(clearWishlist());
        dispatch(clearCart());
      },
      danger: true,
      show: (authUser) => !!authUser,
    },
  ];

  const handleSearch = () => {
    if (!value.trim()) {
      navigate("/search/all");
    } else {
      navigate(`/search/all?q=${value}`);
    }
  };

  const handleSearchOnMobile = () => {
    if (!value.trim()) {
      navigate("/search/all");
    } else {
      navigate(`/search/all?q=${value}`);
    }
  };

  useEffect(() => {
    setValue(queryFromURL);
  }, [queryFromURL]);

  return (
    <ContainerLayout>
      {/* Sticky navbar */}
      <div className="shadow-[0px_0px_15px_0px_#0000001A] max-w-480 w-full z-10 px-3.75 pl-3.75 2xl:pl-12.5 pr-3.75  2xl:pr-[17px] py-4 fixed top-0 bg-white mb-10">
        {/* Top bar */}
        <div className="flex w-full max-w-480 items-center justify-between gap-0 xl:gap-2">
          {/* Logo + desktop links */}
          <div className="flex items-center gap-2 lg:hidden w-full">
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
              <div className="relative w-full mr-3">
                <input
                  type="search"
                  placeholder="Search"
                  value={value}
                  onChange={(e) => {
                    const input = e.target.value;

                    if (input.startsWith(" ")) return;

                    setValue(input);
                    setShowSuggestions(true);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setShowSuggestions(false);
                      handleSearchOnMobile();
                    }
                  }}
                  className="w-full h-9 bg-light-gray focus:outline-none rounded-lg px-9 pr-10 text-sm"
                />
                {showSuggestions && value && (
                  <div className="absolute top-full left-0 w-full mt-2 bg-white shadow-lg rounded-xl z-50 overflow-hidden">
                    {products
                      ?.filter((p) =>
                        p?.title?.toLowerCase()?.includes(value?.toLowerCase()),
                      )
                      .slice(0, 3) // show only 3 suggestions
                      .map((p) => (
                        <div
                          key={p.id}
                          onClick={() => {
                            navigate(`/product/${p.id}`);
                            setValue("");
                            setOpen(false); // close mobile menu if open
                          }}
                          className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-100 transition"
                        >
                          <img
                            src={
                              p.image ||
                              `https://source.unsplash.com/60x60/?${encodeURIComponent(
                                p.name,
                              )}`
                            }
                            alt={p.title}
                            className="w-12 h-12 object-cover rounded-lg flex-shrink-0"
                          />
                          <div className="flex flex-col">
                            <span className="font-medium text-gray-800">
                              {p.title}
                            </span>
                            <span className="text-sm text-gray-500">
                              Rs. {p.price}
                            </span>
                          </div>
                        </div>
                      ))}

                    {/* Optional: "See all results" */}
                    <div
                      onClick={() => {
                        navigate(`/search/all?q=${value}`);
                        setShowSuggestions(false);
                      }}
                      className="px-4 py-3 text-center text-dark-blue font-medium cursor-pointer hover:bg-blue-50 transition truncate max-w-full"
                    >
                      See all results for "{value}"
                    </div>
                  </div>
                )}
                {value && (
                  <button
                    type="button"
                    onClick={() => {
                      setValue("");
                      setShowSuggestions(false);
                      navigate("/search/all");
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    <IoClose size={16} />
                  </button>
                )}
                <img
                  src={Search}
                  alt="search"
                  className="absolute left-2 top-1/2 -translate-y-1/2 opacity-50"
                  loading="lazy"
                  width={19}
                  height={19}
                />
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

          <div className="flex items-center gap-4 xl:gap-8 2xl:gap-[161px]">
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
            <ul className="hidden lg:flex gap-4 xl:gap-8">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `
          relative font-medium text-lg truncate
          transition-colors duration-300
          ${
            isActive
              ? "text-dark-blue"
              : "text-light-black hover:text-dark-blue"
          }
          after:content-['']
          after:absolute
          after:left-0
          after:-bottom-1
          after:h-[2px]
          after:w-full
          after:bg-dark-blue
          after:transition-transform
          after:duration-300
          after:origin-left
          ${
            isActive
              ? "after:scale-x-100"
              : "after:scale-x-0 hover:after:scale-x-100"
          }
        `
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Desktop right section */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-8 2xl:gap-15">
            <div className="relative">
              <div className="relative w-full 2xl:w-[534px]">
                <img
                  src={Search}
                  alt="search"
                  className="absolute top-3 right-4"
                  loading="lazy"
                />
                <input
                  type="search"
                  placeholder="Search the desired product....."
                  value={value}
                  onChange={(e) => {
                    const input = e.target.value;

                    if (input.startsWith(" ")) return;

                    setValue(input);
                    setShowSuggestions(true);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setShowSuggestions(false);
                      handleSearch();
                    }
                  }}
                  className="w-full h-12 bg-light-gray focus:outline-none rounded-lg px-6 pr-18 appearance-none text-gray-600
                   [&::-webkit-search-cancel-button]:hidden
                   [&::-webkit-search-decoration]:hidden
                   [&::-ms-clear]:hidden"
                />

                {value && (
                  <button
                    type="button"
                    onClick={() => {
                      setValue("");
                      navigate("/search/all");
                    }}
                    className="absolute right-12 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
                  >
                    <IoClose size={20} />
                  </button>
                )}

                {/* Mobile Search Suggestions */}
                {showSuggestions && value && (
                  <div className="absolute top-full left-0 w-full mt-2 bg-white shadow-lg rounded-xl z-50 overflow-hidden">
                    {products
                      ?.filter((p) =>
                        p?.title?.toLowerCase()?.includes(value?.toLowerCase()),
                      )
                      .slice(0, 3) // show only 3 suggestions
                      .map((p) => (
                        <div
                          key={p.id}
                          onClick={() => {
                            navigate(`/product/${p.id}`);
                            setValue("");
                            setOpen(false); // close mobile menu if open
                          }}
                          className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-100 transition"
                        >
                          <img
                            src={
                              p.image ||
                              `https://source.unsplash.com/60x60/?${encodeURIComponent(
                                p.name,
                              )}`
                            }
                            alt={p.title}
                            className="w-12 h-12 object-cover rounded-lg flex-shrink-0"
                          />
                          <div className="flex flex-col">
                            <span className="font-medium text-gray-800">
                              {p.title}
                            </span>
                            <span className="text-sm text-gray-500">
                              Rs. {p.price}
                            </span>
                          </div>
                        </div>
                      ))}

                    {/* Optional: "See all results" */}
                    <div
                      onClick={() => {
                        navigate(`/search/all?q=${value}`);
                        setShowSuggestions(false);
                      }}
                      className="px-4 py-3 text-center text-dark-blue font-medium cursor-pointer hover:bg-blue-50 transition truncate max-w-full"
                    >
                      See all results for "{value}"
                    </div>
                  </div>
                )}
              </div>
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
                  onClick={(e) => {
                    e.stopPropagation();
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
                  id="cart-icon"
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
                <div className="relative group flex items-center gap-[13px] cursor-pointer">
                  <img
                    src={
                      "https://plus.unsplash.com/premium_photo-1689977968861-9c91dbb16049?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG9tbWV8ZW58MHx8MHx8fDA%3D"
                    }
                    alt="logo"
                    loading="lazy"
                    className="w-10 h-10 rounded-full object-cover cursor-pointer"
                  />
                  <p className="font-normal text-lg truncate text-mid-dark-gray hidden xl:block">
                    {authUser?.name}
                  </p>

                  {/* Dropdown menu */}
                  <div
                    className="
        absolute right-0 top-full mt-2
        opacity-0 invisible
        group-hover:opacity-100 group-hover:visible
        transition-all duration-200
        bg-white border border-gray-200 shadow-md
        text-sm font-semibold
        px-2 py-2 rounded-md
        z-50
        whitespace-nowrap
        w-[180px]
      "
                  >
                    {userMenuItems
                      .filter((item) =>
                        item.show ? item.show(authUser) : true,
                      )
                      .map((item) => (
                        <button
                          key={item.label}
                          onClick={() => {
                            if (item.to) {
                              navigate(item.to);
                            } else if (item.action) {
                              item.action({ navigate, dispatch });
                            }
                          }}
                          className={`
              block w-full text-left px-3 py-2 rounded
              hover:bg-gray-100 cursor-pointer
              ${item.danger ? "text-red-600" : "text-gray-700"}
            `}
                        >
                          {item.label}
                        </button>
                      ))}
                  </div>
                </div>
              ) : (
                <Link to="/sign-in">
                  <p className="font-bold text-cl">Sign In</p>
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
            {/* <div className="relative">
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
            </div> */}

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
            {/* Mobile user menu */}
            {authUser && (
              <div className="flex flex-col gap-4 pt-2x">
                {userMenuItems
                  .filter((item) => (item.show ? item.show(authUser) : true))
                  .map((item) => (
                    <p
                      key={item.label}
                      className={`
            text-lg cursor-pointer
            ${item.danger ? "text-red-600" : "text-gray-700"}
          `}
                      onClick={() => {
                        setOpen(false); // close mobile menu
                        if (item.to) {
                          navigate(item.to);
                        } else if (item.action) {
                          item.action({ navigate, dispatch });
                        }
                      }}
                    >
                      {item.label}
                    </p>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Bottom Navigation */}
      {!HideNavbarOn.includes(currentPath) && (
        <div
          className="fixed bottom-0 left-0 right-0 h-[65px] bg-white border-t border-gray-200 flex lg:hidden justify-center items-center gap-10 xxs:gap-10 xs:gap-14 z-20 w-full shadow-[0_-1px_6px_rgba(0,0,0,0.06)]
"
        >
          {navItems
            ?.filter((item) => !item.hidden)
            ?.map((item) => {
              const isActive = currentPath === item.href;
              const isHeart = item.id === "heart";
              const isCart = item.id === "cart";

              return (
                <button
                  key={item.id}
                  id={isCart ? "down-icon" : undefined} // 👈 move ID here
                  onClick={() => {
                    if (item.id === "search") {
                      if (window.innerWidth >= 500) {
                        navigate("/search/all");
                      } else {
                        navigate("/searchcategory");
                      }
                    } else {
                      navigate(item.href);
                    }
                  }}
                  className="flex flex-col items-center justify-center cursor-pointer relative"
                >
                  <img
                    src={isActive ? item.blue : item.gray}
                    alt={item.label}
                    className="w-6 h-6"
                    loading="lazy"
                  />

                  {/* Wishlist badge */}
                  {isHeart && wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-2 min-w-[16px] h-[16px] px-1 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                      {wishlistCount}
                    </span>
                  )}

                  {/* Cart badge */}
                  {isCart && items.length > 0 && (
                    <span className="absolute -top-1 -right-2 min-w-[16px] h-[16px] px-1 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                      {items.length}
                    </span>
                  )}
                </button>
              );
            })}
        </div>
      )}
    </ContainerLayout>
  );
};

export default Navbar;
