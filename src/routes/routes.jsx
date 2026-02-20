import SearchCategoryMobile from "../components/Search/SearchCategoryMobile";
import Cart from "../pages/Cart";
import DeliveryAddress from "../pages/DeliveryAddress";
import Filters from "../pages/Filters";
import FinalSummary from "../pages/FinalSummary";
import ForgotPassword from "../pages/ForgotPassWord";
import Home from "../pages/Home";
import NewPassword from "../pages/NewPassWord";
import Orders from "../pages/Order";
import PaymentPage from "../pages/Payment";
import ProductDetails from "../pages/ProductDetails";
import Profile from "../pages/Profile";
import Search from "../pages/Search";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
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
    path: "/payment",
    element: <PaymentPage />,
  },
  {
    path: "/final-summary",
    element: <FinalSummary />,
  },
];
