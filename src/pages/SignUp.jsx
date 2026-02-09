import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/clothing.png";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import User from "../assets/Icons/Home/GrayIcons/home-user.svg";
import PasswordIcon from "../assets/Icons/LRF/password.svg";
import { FaEye } from "react-icons/fa";
import { RiEyeCloseLine } from "react-icons/ri";
import { setItem } from "../utils/localStorage";
import Email from "../assets/Icons/LRF/mail.svg";
import Google from "../assets/Icons/LRF/google.svg";
import Apple from "../assets/Icons/LRF/apple.svg";
import FaceBook from "../assets/Icons/LRF/facebook.svg";

export default function SignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    const isAuthenticated = !!localStorage.getItem("auth");
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    const value = formData.email.trim();
    if (!value) {
      newErrors.email = "Email or phone number is required";
    } else {
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      const isPhone = /^[0-9]{10}$/.test(value);

      if (!isEmail && !isPhone) {
        newErrors.email = "Enter a valid email or phone number";
      }
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    const userData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    };

    setItem("user", userData);

    navigate("/sign-in");
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white">
      {/* LEFT SIDE */}
      <div className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-[343px]">
          <div className="text-center flex items-center flex-col mb-7">
            <img
              src={Logo}
              alt="Logo"
              width={72}
              height={72}
              className="mb-6.5"
            />
            <p className="leading-6 text-light-blue font-bold text-lg">
              Welcome back to E-Com!
            </p>
            <p className="mt-2 leading-6 text-dark-gray font-bold text-lg">
              Let’s make your account.
            </p>
          </div>

          <form className="space-y-2.5" onSubmit={handleSubmit} noValidate>
            {/* Name */}
            <Input
              placeholder="Name"
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
                setErrors((prev) => ({ ...prev, name: undefined }));
              }}
              error={errors.name}
              icon={<img src={User} alt="user" width={18} />}
              required
            />

            {/* Email / Phone */}
            <Input
              placeholder="Email / Phone Number"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                setErrors((prev) => ({ ...prev, email: undefined }));
              }}
              error={errors.email}
              icon={<img src={Email} alt="user" width={18} />}
              required
            />

            {/* Password */}
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={formData.password}
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                  setErrors((prev) => ({ ...prev, password: undefined }));
                }}
                error={errors.password}
                icon={<img src={PasswordIcon} alt="password" width={18} />}
                required
              />
              <button
                type="button"
                className="absolute top-6 right-4 -translate-y-1/2"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <FaEye className="text-dark-gray cursor-pointer" />
                ) : (
                  <RiEyeCloseLine className="text-dark-gray cursor-pointer" />
                )}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <Input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={(e) => {
                  setFormData({ ...formData, confirmPassword: e.target.value });
                  setErrors((prev) => ({
                    ...prev,
                    confirmPassword: undefined,
                  }));
                }}
                error={errors.confirmPassword}
                icon={<img src={PasswordIcon} alt="password" width={18} />}
                required
              />
              <button
                type="button"
                className="absolute top-6 right-4 -translate-y-1/2"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                {showConfirmPassword ? (
                  <FaEye className="text-dark-gray cursor-pointer" />
                ) : (
                  <RiEyeCloseLine className="text-dark-gray cursor-pointer" />
                )}
              </button>
            </div>

            <Button
              buttonType="submit"
              title="Register"
              className="w-full bg-primary text-gray-900 font-bold mt-3.5"
              buttonPadding="p-3.5"
            />
          </form>
          <div className="flex gap-4.5 mt-8 items-center mb-4.5">
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
              />
              <img
                src={FaceBook}
                alt="Twitter"
                width={29}
                height={35}
                className="cursor-pointer"
              />
              <img
                src={Google}
                alt="Google"
                width={29}
                height={35}
                className="cursor-pointer"
              />
            </p>
          </div>

          <div className="text-center mt-15.5">
            <p className="text-xs text-dark-gray">
              Already have an account?{" "}
              <Link to="/sign-in" className="text-light-purple font-bold">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="hidden lg:block">
        <img
          src="https://images.unsplash.com/photo-1520975916090-3105956dac38"
          alt="Hero"
          className="object-cover h-screen w-full"
          loading="lazy"
        />
      </div>
    </div>
  );
}
