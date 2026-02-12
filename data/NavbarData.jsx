import BlueHome from "../src/assets/Icons/Home/BlueIcons/home.svg";
import BlueSearch from "../src/assets/Icons/Home/BlueIcons/search.svg";
import BlueHeart from "../src/assets/Icons/Home/BlueIcons/heart.svg";
import BlueCart from "../src/assets/Icons/Home/BlueIcons/cart.svg";
import BlueUser from "../src/assets/Icons/Home/BlueIcons/user.svg";
import GrayHome from "../src/assets/Icons/Home/GrayIcons/home-gray.svg";
import GraySearch from "../src/assets/Icons/Home/GrayIcons/home-search.svg";
import GrayHeart from "../src/assets/Icons/Home/GrayIcons/home-heart.svg";
import GrayCart from "../src/assets/Icons/Home/GrayIcons/home-cart.svg";
import GrayUser from "../src/assets/Icons/Home/GrayIcons/home-user.svg";

export const navLinks = [
  { to: "/men", label: "Men" },
  { to: "/women", label: "Women" },
  { to: "/kids", label: "Kids" },
  { to: "/shop", label: "Shop" },
  { to: "/contact-us", label: "Contact us" },
];

export const navItems = [
  {
    id: "home",
    href: "/",
    blue: BlueHome,
    gray: GrayHome,
    label: "Home",
    topBar: { type: "title" }, // shows title
  },
  {
    id: "search",
    href: "/search",
    blue: BlueSearch,
    gray: GraySearch,
    label: "Search",
    topBar: { type: "search" }, // shows search input
  },
  {
    id: "heart",
    href: "/wishlist",
    blue: BlueHeart,
    gray: GrayHeart,
    label: "Wishlist",
    topBar: { type: "title" },
  },
  {
    id: "cart",
    href: "/cart",
    blue: BlueCart,
    gray: GrayCart,
    label: "Cart",
    topBar: { type: "custom" }, // 👈 custom UI
  },
  {
    id: "user",
    href: "/profile",
    blue: BlueUser,
    gray: GrayUser,
    label: "Profile",
    topBar: { type: "title" },
  },
];
