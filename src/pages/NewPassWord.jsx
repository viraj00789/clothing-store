import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "../assets/clothing.png";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import PasswordIcon from "../assets/Icons/LRF/password.svg";
import { FaEye } from "react-icons/fa";
import { RiEyeCloseLine } from "react-icons/ri";
import toast from "react-hot-toast";
import { getItem, setItem } from "../utils/localStorage"; // adjust path if needed
import { IoArrowBack } from "react-icons/io5";

export default function NewPassword() {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  // 🔒 Protect route: must come from verify page
  useEffect(() => {
    if (!location.state?.fromVerify) {
      toast.error("Unauthorized access ❌");
      navigate("/forgot-password");
    }
  }, [location.state, navigate]);

  const validate = () => {
    const newErrors = {};

    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required.";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      toast.error("Please fix the errors.");
      return;
    }

    // 💾 Get user from localStorage
    const user = getItem("user");

    if (!user) {
      toast.error("User not found.");
      navigate("/");
      return;
    }

    // ✅ Update password
    const updatedUser = {
      ...user,
      password: formData.password,
    };

    setItem("user", updatedUser);

    toast.success("Password updated successfully.");

    navigate("/");
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white">
      {/* LEFT SIDE */}
      <div className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-[347px]">
          <div className="text-center flex items-center flex-col mb-10">
            <div className="flex items-start justify-between w-full">
              <IoArrowBack
                size={22}
                onClick={() => navigate(-1)}
                className="cursor-pointer"
              />
              <img
                src={Logo}
                alt="Passbook Logo"
                width={72}
                height={72}
                className="mb-6.5"
                loading="lazy"
              />
              <div />
            </div>
            <p className="leading-6 text-light-blue-dark font-bold text-lg">
              New Password
            </p>
            <p className="mt-2 leading-6 text-dark-gray font-normal text-sm">
              Set new password for your account.
            </p>
          </div>

          <form className="space-y-2" onSubmit={handleSubmit} noValidate>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
                value={formData.password}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    password: e.target.value?.trimStart(),
                  });
                  setErrors((prev) => ({ ...prev, password: undefined }));
                }}
                error={errors.password}
                required
                icon={
                  <img
                    src={PasswordIcon}
                    alt="password"
                    width={18}
                    loading="lazy"
                  />
                }
              />

              <button
                type="button"
                className="absolute top-1/2 right-4 -translate-y-1/2 text-dark-gray"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FaEye /> : <RiEyeCloseLine />}
              </button>
            </div>

            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  confirmPassword: e.target.value?.trimStart(),
                });
                setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
              }}
              error={errors.confirmPassword}
              required
              icon={
                <img
                  src={PasswordIcon}
                  alt="password"
                  width={18}
                  loading="lazy"
                />
              }
            />

            <Button
              buttonType="submit"
              title="Update Password"
              className="w-full bg-primary text-gray-900 font-bold"
              buttonPadding="p-3.5 mt-7"
            />
          </form>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="hidden lg:block">
        <img
          src="https://plus.unsplash.com/premium_photo-1669704098750-7cd22c35422b?w=500&auto=format&fit=crop&q=60"
          alt="Hero"
          className="object-cover h-screen w-full"
          loading="lazy"
        />
      </div>
    </div>
  );
}
