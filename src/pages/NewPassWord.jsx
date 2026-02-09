import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/clothing.png";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import PasswordIcon from "../assets/Icons/LRF/password.svg";
import { FaEye } from "react-icons/fa";
import { RiEyeCloseLine } from "react-icons/ri";

export default function NewPassword() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({});

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
                  setFormData({ ...formData, password: e.target.value });
                  setErrors((prev) => ({ ...prev, password: undefined }));
                }}
                error={errors.password}
                required
                icon={<img src={PasswordIcon} alt="password" width={18} loading="lazy"/>}
              />

              <button
                type="button"
                className="absolute top-1/2 right-4 -translate-y-1/2 text-dark-gray"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <FaEye className="cursor-pointer text-dark-gray" />
                ) : (
                  <RiEyeCloseLine className="cursor-pointer text-dark-gray" />
                )}
              </button>
            </div>

            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={(e) => {
                setFormData({ ...formData, confirmPassword: e.target.value });
                setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
              }}
              error={errors.confirmPassword}
              required
              icon={<img src={PasswordIcon} alt="password" width={18} loading="lazy"/>}
            />

            <Button
              buttonType="submit"
              title="Send Verification"
              className="w-full bg-primary text-gray-900 font-bold"
              buttonPadding="p-3.5 mt-7"
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
