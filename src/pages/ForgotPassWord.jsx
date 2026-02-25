import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/clothing.png";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import User from "../assets/Icons/Home/GrayIcons/home-user.svg";
import { getItem } from "../utils/localStorage";
import toast from "react-hot-toast";
import { IoArrowBack } from "react-icons/io5";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
  });

  const [errors, setErrors] = useState({});
  const emailFromStorage = getItem("user")?.email;

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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    if (emailFromStorage === formData.email) {
      navigate("/verify-code", { state: { fromForgot: true } });
    } else {
      toast.error("Enter the registered Email/Phone number");
      return;
    }

    setFormData({ email: "" });
    toast.success("Email/Phone number verified successfully");
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
            <p className="leading-6 text-dark-blue font-bold text-lg">
              Forgot Password
            </p>
            <p className="mt-2 leading-6 text-dark-gray font-normal text-sm">
              <span className="text-red-500">*</span> We will send you a message
              to set or reset your new password
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

            <Button
              buttonType="submit"
              title="Send Verification"
              className="w-full bg-primary text-gray-900 font-bold"
              buttonPadding="p-3.5 mt-10.5"
            />
          </form>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="hidden lg:block">
        <img
          src="https://plus.unsplash.com/premium_photo-1669704098750-7cd22c35422b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fG1vZGVsc3xlbnwwfHwwfHx8MA%3D%3D"
          alt="Hero"
          className="object-cover h-screen w-full"
          loading="lazy"
        />
      </div>
    </div>
  );
}
