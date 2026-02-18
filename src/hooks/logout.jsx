import { useDispatch } from "react-redux";
import { clearCart } from "../store/slices/cartSlice";
import { clearWishlist } from "../store/slices/wishlistSlice";
import { useNavigate } from "react-router";
import { removeItem } from "../utils/localStorage";

function useLogout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    removeItem("auth");
    dispatch(clearCart());
    dispatch(clearWishlist());
    navigate("/");
  };

  return logout;
}
export default useLogout;
