import {
  FaShoppingCart,
  FaMapMarkerAlt,
  FaCreditCard,
  FaFileInvoice,
} from "react-icons/fa";

export const checkoutSteps = [
  { label: "Cart", path: "/cart", icon: FaShoppingCart },
  { label: "Address", path: "/address", icon: FaMapMarkerAlt },
  { label: "Payment", path: "/payment", icon: FaCreditCard },
  { label: "Summary", path: "/final-summary", icon: FaFileInvoice },
];
