import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/clothing.png";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Google from "../assets/Icons/LRF/google.svg";
import Apple from "../assets/Icons/LRF/apple.svg";
import FaceBook from "../assets/Icons/LRF/facebook.svg";
import User from "../assets/Icons/Home/GrayIcons/home-user.svg";
import Password from "../assets/Icons/LRF/password.svg";
import { FaEye } from "react-icons/fa";
import { RiEyeCloseLine } from "react-icons/ri";
import { getItem, setItem } from "../utils/localStorage";
import toast from "react-hot-toast";

export default function SignIn() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    const newErrors = {};

    const value = formData.email.trim();

    if (!value) {
      newErrors.email = "Email or phone number is required.";
    } else {
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      const isPhone = /^[0-9]{10}$/.test(value);

      if (!isEmail && !isPhone) {
        newErrors.email = "Enter a valid email or phone number.";
      }
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    const isAuthenticated = !!localStorage.getItem("auth");
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    const savedUser = getItem("user");

    if (!savedUser) {
      toast.error("No account found. Please register first.");
      return;
    }

    const isMatch =
      savedUser.email === formData.email &&
      savedUser.password === formData.password;

    if (!isMatch) {
      toast.error("Invalid email/phone or password");
      return;
    }

    setItem("auth", {
      isAuthenticated: true,
      name: savedUser.name,
      email: savedUser.email,
    });

    navigate("/");
  };

  return (
    <div className="w-full h-full flex bg-white">
      {/* LEFT SIDE */}
      <div className="flex items-center justify-center px-6 py-12 w-full h-[calc(100vh-1px)] overflow-auto">
        <div className="w-full max-w-[343px]">
          <div className="text-center flex items-center flex-col mb-13">
            <img
              src={Logo}
              alt="Passbook Logo"
              width={72}
              height={72}
              className="mb-6.5"
              loading="lazy"
            />
            <p className="leading-6 text-light-blue-dark font-bold text-lg">
              Welcome back to E-Com!
            </p>
            <p className="mt-2 leading-6 text-dark-gray font-bold text-lg">
              Sign in to continue
            </p>
          </div>

          <form className="space-y-2" onSubmit={handleSubmit} noValidate>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Your Email / Phone Number"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                setErrors((prev) => ({ ...prev, email: undefined }));
                setLoginError("");
              }}
              error={errors.email}
              required
              icon={
                <img
                  src={User}
                  loading="lazy"
                  alt="user"
                  width={17.63}
                  height={18.66}
                />
              }
            />

            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={formData.password}
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                  setErrors((prev) => ({ ...prev, password: undefined }));
                  setLoginError("");
                }}
                error={errors.password}
                icon={
                  <img
                    src={Password}
                    loading="lazy"
                    alt="password"
                    width={17.63}
                    height={18.66}
                  />
                }
                required
              />

              <button
                type="button"
                className="absolute top-6.25 right-4 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <FaEye className="text-dark-gray" />
                ) : (
                  <RiEyeCloseLine className="text-dark-gray" />
                )}
              </button>
            </div>

            {loginError && (
              <p className="text-sm text-red-400 font-medium text-center">
                {loginError}
              </p>
            )}

            <div className="flex justify-between items-center my-5.5">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  id="remember"
                  name="remember"
                  className="border border-[#BDC0CD]"
                />
                <span className="text-sm text-dark-gray">Remember me</span>
              </label>

              <Link
                to="/forgot-password"
                className="text-xs text-dark-button-blue font-bold"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              buttonType="submit"
              title="Login"
              className="w-full bg-primary text-gray-900 font-bold"
              buttonPadding="p-3.5"
            />
          </form>

          <div className="flex gap-4.5 mt-5 items-center mb-4.5">
            <p className="h-px w-full bg-light-gray-2"></p>
            <p className="text-sm text-dark-gray font-bold">OR</p>
            <p className="h-px w-full bg-light-gray-2"></p>
          </div>
          <div className="text-center mt-6">
            <p className="text-[15px] text-light-black-1 font-normal">
              Login using
            </p>
            <p className="flex items-center justify-center gap-10.5 mt-4">
              <img
                src={Apple}
                alt="Facebook"
                width={29}
                height={35}
                className="cursor-pointer"
                loading="lazy"
              />
              <img
                src={FaceBook}
                alt="Twitter"
                width={29}
                height={35}
                className="cursor-pointer"
                loading="lazy"
              />
              <img
                src={Google}
                alt="Google"
                width={29}
                height={35}
                className="cursor-pointer"
                loading="lazy"
              />
            </p>
          </div>
          <div className="text-center mt-8">
            <p className=" text-md font-semibold text-dark-gray">
              Don't have an account?{" "}
              <Link to={"/sign-up"}>
                <span className="text-light-purple cursor-pointer">
                  Register
                </span>
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="hidden lg:block max-h-screen w-full">
        <img
          src="https://plus.unsplash.com/premium_photo-1669704098750-7cd22c35422b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fG1vZGVsc3xlbnwwfHwwfHx8MA%3D%3D"
          alt="Hero"
          className="object-cover h-full w-full"
          loading="lazy"
        />
      </div>
    </div>
  );
}
