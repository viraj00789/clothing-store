import { useState } from "react";
import ContainerLayout from "../layout/ContainerLayout";
import facebook from "../assets/footer/facebook.svg";
import instgram from "../assets/footer/insta.svg";
import whatsapp from "../assets/footer/whatsapp.svg";
import twitter from "../assets/footer/twitter.svg";
import { Link, useNavigate } from "react-router";
import { IoArrowBack } from "react-icons/io5";
import { useWindow } from "../hooks/useWidth";

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    phone: "",
    message: "",
    agree: false,
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const width = useWindow();

  const images = [
    {
      id: 1,
      img: facebook,
      alt: "facebook",
      link: "https://facebook.com",
    },
    {
      id: 2,
      img: instgram,
      alt: "instagram",
      link: "https://instagram.com",
    },
    {
      id: 3,
      img: whatsapp,
      alt: "whatsapp",
      link: "https://wa.me/1234567890",
    },
    {
      id: 4,
      img: twitter,
      alt: "twitter",
      link: "https://twitter.com",
    },
  ];

  const validate = () => {
    let newErrors = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";

    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.company.trim()) newErrors.company = "Company is required";

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";

    if (!formData.agree) newErrors.agree = "You must accept the privacy policy";

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value?.trimStart(),
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length === 0) {
      setErrors({});
      setSuccess(true);
      setFormData({
        firstName: "",
        lastName: "",
        company: "",
        email: "",
        phone: "",
        message: "",
        agree: false,
      });
    } else {
      setErrors(validationErrors);
      setSuccess(false);
    }
  };

  return (
    <ContainerLayout>
      <div className="w-full flex flex-col px-3 md:px-25 lg:px-20 xl:px-45 2xl:px-85 pt-20 lg:pt-30 pb-15 lg:pb-20 space-y-6 xl:space-y-12">
        {width >= 768 && (
          <div className="flex items-center gap-3">
            <IoArrowBack
              size={30}
              onClick={() => navigate(-1)}
              className="cursor-pointer"
            />
            <p className="text-xl md:text-2xl lg:text-4xl font-bold ">
              Contact US
            </p>
          </div>
        )}
        <div className="grid lg:grid-cols-3 gap-10 w-full">
          {/* LEFT PANEL */}
          <div className="text-white bg-dark-button-blue p-4 lg:p-10 rounded-10 lg:rounded-2xl shadow-xl space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-white">
                Get in touch
              </h3>
            </div>

            <div>
              <h4 className="font-semibold mb-2 text-white text-lg">
                Visit us
              </h4>
              <p className="text-white text-sm">
                67 Fashion Avenue <br />
                New York, NY 10001
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2 text-white text-lg">
                Chat to us
              </h4>
              <p className="text-white text-sm">support@clothingstore.com</p>
            </div>

            <div>
              <h4 className="font-semibold mb-2 text-white text-lg">Call us</h4>
              <p className="text-white text-sm">
                Mon–Fri 9am–6pm <br />
                +1 (470) 601-1911
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2 text-white text-lg">
                Social media
              </h4>
              <div className="flex gap-4">
                {images.map((image) => (
                  <Link
                    key={image.id}
                    to={image.link}
                    rel="noopener noreferrer"
                  >
                    <img
                      src={image.img}
                      alt={image.alt}
                      className="cursor-pointer hover:opacity-80 transition"
                      loading="lazy"
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="lg:col-span-2 bg-white text-light-black">
            {success && (
              <div className="mb-6 bg-green-600/20 border border-green-500 text-green-400 p-3 rounded">
                Message sent successfully!
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* First & Last Name */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full bg-white text-light-black border border-gray-700 rounded-lg p-3 focus:outline-none"
                  />
                  {errors.firstName && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.firstName}
                    </p>
                  )}
                </div>

                <div>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full bg-white text-light-black border border-gray-700 rounded-lg p-3 focus:outline-none"
                  />
                  {errors.lastName && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              {/* Company */}
              <div>
                <input
                  type="text"
                  name="company"
                  placeholder="Company Name"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full bg-white text-light-black border border-gray-700 rounded-lg p-3 focus:outline-none"
                />
                {errors.company && (
                  <p className="text-red-400 text-sm mt-1">{errors.company}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-white text-light-black border border-gray-700 rounded-lg p-3 focus:outline-none"
                />
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-white text-light-black border border-gray-700 rounded-lg p-3 focus:outline-none"
                />
                {errors.phone && (
                  <p className="text-red-400 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <textarea
                  name="message"
                  rows="4"
                  placeholder="Tell us what we can help you with"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-white text-light-black border border-gray-700 rounded-lg p-3 focus:outline-none resize-none"
                ></textarea>
                {errors.message && (
                  <p className="text-red-400 text-sm mt-1">{errors.message}</p>
                )}
              </div>

              {/* Privacy Checkbox */}
              <div>
                <label className="flex items-start gap-2 text-sm text-black cursor-pointer">
                  <input
                    type="checkbox"
                    name="agree"
                    checked={formData.agree}
                    onChange={handleChange}
                    className="mt-1 cursor-pointer"
                  />
                  I agree to the Privacy Policy
                </label>
                {errors.agree && (
                  <p className="text-red-400 text-sm mt-1">{errors.agree}</p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full text-white bg-dark-button-blue py-3 rounded-lg font-semibold hover:opacity-90 transition cursor-pointer"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </ContainerLayout>
  );
}
