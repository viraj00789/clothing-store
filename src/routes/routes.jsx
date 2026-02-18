import Cart from "../pages/Cart";
import Filters from "../pages/Filters";
import ForgotPassword from "../pages/ForgotPassWord";
import Home from "../pages/Home";
import NewPassword from "../pages/NewPassWord";
import Orders from "../pages/Order";
import ProductDetails from "../pages/ProductDetails";
import Profile from "../pages/Profile";
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
  {
    path: "/filters/:category",
    element: <Filters />,
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
];
