import { Link } from "react-router";
import ContainerLayout from "../layout/ContainerLayout";
import Search from "../assets/search.svg";
import ClothingLogo from "../assets/clothing.png";
import Heart from "../assets/heart.svg";
import Cart from "../assets/cart.svg";
import Girl from "../assets/logged-girl.svg";
import { RxCross2, RxHamburgerMenu } from "react-icons/rx";
import { useEffect, useEffectEvent, useState } from "react";
import { IoClose } from "react-icons/io5";

const navLinks = [
  { to: "/men", label: "Men" },
  { to: "/women", label: "Women" },
  { to: "/kids", label: "Kids" },
  { to: "/shop", label: "Shop" },
  { to: "/contact-us", label: "Contact us" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

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
      <div className="shadow-md max-w-480 w-full p-4 2xl:px-4 fixed top-0 z-50 bg-white mb-10">
        {/* Top bar */}
        <div className="flex w-full items-center justify-between gap-0 xl:gap-2">
          {/* Logo + desktop links */}
          <div className="flex items-center gap-4 2xl:gap-[161px]">
            <Link to="/" className="w-8 h-8 2xl:w-[57px] 2xl:h-[48px]">
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
              <div className="relative w-full xl:w-133">
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
              />
            </div>
            <div className="flex items-center gap-4 xl:gap-8">
              <img
                src={Heart}
                alt="logo"
                loading="lazy"
                className="w-[29px] h-[29px] cursor-pointer"
              />
              <img
                src={Cart}
                alt="logo"
                loading="lazy"
                className="w-[29px] h-[29px] cursor-pointer"
              />
              <div className="flex items-center gap-[13px]">
                <img
                  src={Girl}
                  alt="logo"
                  loading="lazy"
                  className="w-[29px] h-[29px]"
                />
                <p className="font-normal text-lg truncate text-mid-dark-gray">
                  Anna Doe
                </p>
              </div>
            </div>
          </div>

          {/* Mobile hamburger */}
          <div className="lg:hidden flex items-center gap-3">
            <img src={Heart} alt="logo" className="w-[29px] h-[29px] cursor-pointer" />
            <img src={Cart} alt="logo" className="w-[29px] h-[29px] cursor-pointer" />
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
                  className="w-full h-12 bg-light-gray focus:outline-none rounded-lg px-9 pr-12 appearance-none
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
              />
            </div>

            {/* Mobile links */}
            <ul className="flex flex-col gap-4 mx-2">
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
            <div className="flex items-center gap-4 mx-2">
              <div className="flex items-center gap-[13px]">
                <img src={Girl} alt="logo" className="w-[29px] h-[29px]" />
                <p className="text-lg">Anna Doe</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ContainerLayout>
  );
};

export default Navbar;
