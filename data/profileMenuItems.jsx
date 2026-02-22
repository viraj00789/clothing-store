import Heart from "../src/assets/Icons/Profile/profile-wishlist.svg";
import Order from "../src/assets/Icons/Profile/profile-cart.svg";
import DeliveryAddress from "../src/assets/Icons/Profile/profile-location.svg";
import PaymentMethods from "../src/assets/Icons/Profile/profile-payment.svg";
import Notification from "../src/assets/Icons/Profile/profile-notification.svg";
import Help from "../src/assets/Icons/Profile/profile-help.svg";
import About from "../src/assets/Icons/Profile/profile-about.svg";

export const ProfileMenuItems = [
  { href: "/wishlist", label: "Wishlist", icon: Heart },
  { href: "/cart", label: "Carts", icon: Order },
  {
    href: "/add-address",
    label: "Delivery Address",
    icon: DeliveryAddress,
  },
  { href: "/orders", label: "My Orders", icon: Order },
  {
    href: "/add-payment",
    label: "Payment Methods",
    icon: PaymentMethods,
  },
  { href: "/notifications", label: "Notifications", icon: Notification },
  { href: "/help", label: "Help", icon: Help },
  { href: "/about", label: "About", icon: About },
];
