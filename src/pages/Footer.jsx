import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import ContainerLayout from "../layout/ContainerLayout";
import footerLogo from "../assets/footer-log.svg";
import email from "../assets/email.svg";
import facebook from "../assets/footer/facebook.svg";
import instgram from "../assets/footer/insta.svg";
import whatsapp from "../assets/footer/whatsapp.svg";
import twitter from "../assets/footer/twitter.svg";
import { IoSend } from "react-icons/io5";
import toast from "react-hot-toast";
import { Link } from "react-router";

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

const sections = [
  {
    title: "Women",
    items: [
      { label: "All Women", link: "/search/all?q=women" },
      { label: "Skirts", link: "/search/all?q=kurti" },
      { label: "T-Shirts", link: "/search/all?q=shirt" },
      { label: "Tops", link: "/search/all?q=top" },
      { label: "Jackets", link: "/search/all?q=jacket" },
    ],
  },
  {
    title: "Men",
    items: [
      { label: "All Men", link: "/search/all?q=men" },
      { label: "Shirts", link: "/search/all?q=shirt" },
      { label: "T-Shirts", link: "/search/all?q=tshirt" },
      { label: "Shorts", link: "/search/all?q=shorts" },
      { label: "Jackets", link: "/search/all?q=men" },
    ],
  },
  {
    title: "Kids",
    items: [
      { label: "All Kids", link: "/search/all?q=kid" },
      { label: "Shirts", link: "/search/all?q=shirt" },
      { label: "T-Shirts", link: "/search/all?q=shirt" },
      { label: "Shorts", link: "/search/all?q=shorts" },
      { label: "Jackets", link: "/search/all?q=jacket" },
    ],
  },
  {
    title: "Shopping",
    items: [
      { label: "Your cart", link: "/cart" },
      { label: "Your orders", link: "/orders" },
      { label: "Compared items", link: "/" },
      { label: "Wishlist", link: "/wishlist" },
      { label: "Shipping Details", link: "/" },
    ],
  },
  {
    title: "More links",
    items: [
      { label: "Blogs", link: "/" },
      { label: "Gift center", link: "/" },
      { label: "Buying guides", link: "/" },
      { label: "New arrivals", link: "/" },
      { label: "Clearance", link: "/" },
    ],
  },
];

const Footer = () => {
  const [open, setOpen] = useState(null);
  const [emailData, setEmailData] = useState("");

  const toggle = (i) => {
    setOpen(open === i ? null : i);
  };

  return (
    <ContainerLayout>
      <div className="text-white">
        <div className="px-3 md:px-6 xl:px-12.5 pt-6 pb-0 lg:pb-10 xl:pb-20 bg-dark-footer">
          <div className="flex flex-col sm:flex-row items-center font-bold gap-4 xl:gap-7.5 text-center sm:text-left px-2 md:px-0">
            <img
              src={footerLogo}
              alt="footer logo"
              className="w-10 h-10 xl:w-[76px] xl:h-[64px]"
              loading="lazy"
            />
            <p className="font-bold text-2xl lg:text-3xl xl:text-[64px]">
              Globex
            </p>
          </div>

          <div className="flex flex-col lg:flex-row flex-wrap justify-between 2xl:justify-center gap-4 lg:gap-10 xl:gap-15 2xl:gap-27.5 mt-4 lg:mt-10 xl:mt-[83px] ">
            {sections.map((sec, i) => (
              <div key={i} className="flex flex-col w-full lg:w-auto">
                {/* Header */}
                <button
                  onClick={() => toggle(i)}
                  className={`text-respo-24 text-left flex justify-between items-center py-2 lg:py-0 lg:pointer-events-none transition-colors cursor-pointer hover:bg-gray-900 p-2 md:p-0 rounded-lg ${
                    open === i ? "text-white" : ""
                  }`}
                >
                  {sec.title}

                  {/* React Icon Arrow */}
                  <FiChevronDown
                    className={`lg:hidden transition-transform duration-300 cursor-pointer ${
                      open === i ? "rotate-180" : "rotate-0"
                    }`}
                    size={22}
                  />
                </button>

                {/* Content */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out lg:block border-t lg:border-none ${
                    open === i ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  } lg:max-h-none lg:opacity-100`}
                >
                  <div className="flex flex-col gap-[15px] mt-2 lg:mt-[17px] p-2 md:p-0">
                    {sec.items.map((item, idx) => (
                      <Link
                        key={idx}
                        to={item.link}
                        className="font-normal text-lg cursor-pointer"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {/* Stay in Touch */}
            <div className="flex flex-col items-center lg:items-start gap-4 w-full lg:max-w-[445px] bg-dark-footer">
              <h3 className="text-respo-24">Stay In Touch</h3>
              <p className="font-normal text-lg max-w-[445px] text-center lg:text-left">
                Stay in touch to get special offers, free giveaways and once in
                a lifetime deals
              </p>
              <div className="relative w-full  max-w-[445px] flex flex-col items-center justify-center">
                <input
                  className="border border-white h-11 w-full px-15 placeholder:text-footer-input focus:outline-none placeholder:text-lg"
                  type="email"
                  placeholder="Enter your email"
                  value={emailData}
                  onChange={(e) => setEmailData(e.target.value)}
                />
                <img
                  src={email}
                  alt="email"
                  className="absolute left-3 top-3"
                  loading="lazy"
                />
                {emailData && (
                  <IoSend
                    size={20}
                    className="absolute right-3 top-3 cursor-pointer"
                    onClick={() => {
                      setEmailData("");
                      toast.success("Email sent successfully");
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:h-[1px] lg:bg-white"></div>

        <div className="pt-[39px] flex flex-col flex-wrap md:flex-row items-center justify-center gap-6 lg:gap-50 text-center pb-[100px] md:pb-[39px] bg-dark-footer">
          <Link
            to="/terms-and-conditions"
            className="cursor-pointer font-normal text-lg"
          >
            Terms & Conditions
          </Link>
          <Link
            to="/privacy-policy"
            className="cursor-pointer font-normal text-lg"
          >
            Privacy Policy
          </Link>
          <div className="flex justify-center gap-8.5">
            {images.map((image) => (
              <Link key={image.id} to={image.link} rel="noopener noreferrer">
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
    </ContainerLayout>
  );
};

export default Footer;
