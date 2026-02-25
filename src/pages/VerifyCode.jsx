import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "../assets/clothing.png";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import toast from "react-hot-toast";
import { IoArrowBack } from "react-icons/io5";

export default function VerifyCode() {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    otp: "",
  });

  const [errors, setErrors] = useState({});

  const generatedOtp = useState(() => {
    if (!location.state?.fromForgot) return null;

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log("Generated OTP:", otp);
    return otp;
  })[0];

  useEffect(() => {
    if (!location.state?.fromForgot) {
      toast.error("Unauthorized access to verification page.");
      navigate("/forgot-password");
    }
  }, [navigate, location.state?.fromForgot]);

  const validate = () => {
    const newErrors = {};
    const value = formData.otp.trim();

    if (!value) {
      newErrors.otp = "OTP is required.";
    } else if (!/^\d{6}$/.test(value)) {
      newErrors.otp = "Enter a valid 6-digit OTP.";
    } else if (value !== generatedOtp) {
      newErrors.otp = "Invalid OTP";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      toast.error("Invalid OTP");
      return;
    }

    toast.success("OTP verified successfully.");
    navigate("/new-password", { state: { fromVerify: true } });
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
                alt="Logo"
                width={72}
                height={72}
                className="mb-6.5"
                loading="lazy"
              />
              <div />
            </div>
            <p className="leading-6 text-light-blue-dark font-bold text-lg">
              Enter Verification Code
            </p>
            <p className="mt-2 leading-6 text-dark-gray font-normal text-sm">
              <span className="text-red-500">*</span> Enter the 6-digit OTP sent
              to you
            </p>
          </div>

          <form className="space-y-2" onSubmit={handleSubmit} noValidate>
            <Input
              id="otp"
              name="otp"
              type="text"
              inputMode="numeric"
              placeholder="Enter 6-digit OTP"
              value={formData.otp}
              onChange={(e) => {
                setFormData({ otp: e.target.value.trimStart() });
                setErrors((prev) => ({ ...prev, otp: undefined }));
              }}
              error={errors.otp}
              maxLength={6}
              required
            />

            <Button
              buttonType="submit"
              title="Confirm"
              className="w-full bg-primary text-gray-900 font-bold"
              buttonPadding="p-3.5 mt-10.5"
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
