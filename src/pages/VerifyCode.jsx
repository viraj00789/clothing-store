import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/clothing.png";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import User from "../assets/Icons/Home/GrayIcons/home-user.svg";

export default function VerifyCode() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    const value = formData.email.trim();

    if (!value) {
      newErrors.email = "Code is required.";
    } else if (!/^\d{5}$/.test(value)) {
      newErrors.email = "Enter a valid 5-digit verification code.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    navigate("/");
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white">
      {/* LEFT SIDE */}
      <div className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-[347px]">
          <div className="text-center flex items-center flex-col mb-10">
            {/* Need to Remove */}
            <img
              src={Logo}
              alt="Passbook Logo"
              width={72}
              height={72}
              className="mb-6.5"
              loading="lazy"
            />
            <p className="leading-6 text-light-blue font-bold text-lg">
              Enter Verification Code
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
              type="text"
              inputMode="numeric"
              placeholder="Enter OTP here"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                setErrors((prev) => ({ ...prev, email: undefined }));
              }}
              error={errors.email}
              maxLength={5} // (HTML ignores this for number, but your validation still protects)
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
          src="https://plus.unsplash.com/premium_photo-1669704098750-7cd22c35422b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fG1vZGVsc3xlbnwwfHwwfHx8MA%3D%3D"
          alt="Hero"
          className="object-cover h-screen w-full"
          loading="lazy"
        />
      </div>
    </div>
  );
}
