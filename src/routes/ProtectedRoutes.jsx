import { Navigate, Outlet } from "react-router-dom";
import { getItem } from "../utils/localStorage";

const isAuthenticated = () => {
  return getItem("auth");
};

export default function ProtectedRoute() {
  if (!isAuthenticated()) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}
