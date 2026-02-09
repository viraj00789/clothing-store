import ForgotPassword from "../pages/ForgotPassWord";
import Home from "../pages/Home";
import NewPassword from "../pages/NewPassWord";
import ProductDetails from "../pages/ProductDetails";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import VerifyCode from "../pages/VerifyCode";

export const publicRoutes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/product/:id",
    element: <ProductDetails />,
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
    path: "forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "verify-code",
    element: <VerifyCode />,
  },
  {
    path: "/new-password",
    element: <NewPassword />,
  },
];

export const protectedRoutes = [];
