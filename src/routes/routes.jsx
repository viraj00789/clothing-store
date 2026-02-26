import SearchCategoryMobile from "../components/Search/SearchCategoryMobile";
import AddAddress from "../pages/AddAddress";
import AddPayment from "../pages/AddPayment";
import Cart from "../pages/Cart";
import Contact from "../pages/ContactUs";
import DeliveryAddress from "../pages/DeliveryAddress";
import Filters from "../pages/Filters";
import FinalSummary from "../pages/FinalSummary";
import ForgotPassword from "../pages/ForgotPassWord";
import Home from "../pages/Home";
import NewPassword from "../pages/NewPassWord";
import Orders from "../pages/Order";
import PaymentPage from "../pages/Payment";
import PrivacyPolicy from "../pages/PrivacyPolicyPage";
import ProductDetails from "../pages/ProductDetails";
import Profile from "../pages/Profile";
import Search from "../pages/Search";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import TermsAndConditions from "../pages/TermsAndConditions";
import VerifyCode from "../pages/VerifyCode";
import WishList from "../pages/WishList";

export const publicRoutes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/product/:id",
    element: <ProductDetails />,
  },
  // Needed for future use
  // {
  //   path: "/filters/:category",
  //   element: <Filters />,
  // },
  {
    path: "/searchcategory",
    element: <SearchCategoryMobile />,
  },
  {
    path: "/search/:category",
    element: <Search />,
  },
  {
    path: "/privacy-policy",
    element: <PrivacyPolicy />,
  },
  {
    path: "/terms-and-conditions",
    element: <TermsAndConditions />,
  },
  {
    path: "/contact-us",
    element: <Contact />,
  },
];

export const authRoutes = [
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/verify-code",
    element: <VerifyCode />,
  },
  {
    path: "/new-password",
    element: <NewPassword />,
  },
];

export const protectedRoutes = [
  {
    path: "/wishlist",
    element: <WishList />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/orders",
    element: <Orders />,
  },
  {
    path: "/address",
    element: <DeliveryAddress />,
  },
  {
    path: "/add-address",
    element: <AddAddress />,
  },
  {
    path: "/payment",
    element: <PaymentPage />,
  },
  {
    path: "/add-payment",
    element: <AddPayment />,
  },
  {
    path: "/final-summary",
    element: <FinalSummary />,
  },
];
