import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import ContainerLayout from "../layout/ContainerLayout";
import footerLogo from "../assets/footer-log.svg";
import email from "../assets/email.svg";
import facebook from "../assets/footer/facebook.svg";
import instgram from "../assets/footer/insta.svg";
import whatsapp from "../assets/footer/whatsapp.svg";
import twitter from "../assets/footer/twitter.svg";

const images = [
  { id: 1, img: facebook, alt: "facebook" },
  { id: 2, img: instgram, alt: "instgram" },
  { id: 3, img: whatsapp, alt: "whatsapp" },
  { id: 4, img: twitter, alt: "twitter" },
];

const sections = [
  {
    title: "Women",
    items: ["All Women", "Skirts", "T-Shirts", "Tops", "Jackets"],
  },
  {
    title: "Men",
    items: ["All Men", "Shirts", "T-Shirts", "Shorts", "Jackets"],
  },
  {
    title: "Kids",
    items: ["All Kids", "Shirts", "T-Shirts", "Shorts", "Jackets"],
  },
  {
    title: "Shopping",
    items: [
      "Your cart",
      "Your orders",
      "Compared items",
      "Wishlist",
      "Shipping Details",
    ],
  },
  {
    title: "More links",
    items: [
      "Blogs",
      "Gift center",
      "Buying guides",
      "New arrivals",
      "Clearance",
    ],
  },
];

const Footer = () => {
  const [open, setOpen] = useState(null);

  const toggle = (i) => {
    setOpen(open === i ? null : i);
  };

  return (
    <ContainerLayout>
      <div className="bg-dark-footer text-white mt-6 lg:mt-29">
        <div className="px-3 md:px-6 xl:px-12.5 pt-9 mb-0 lg:mb-10 xl:mb-20">
          <div className="flex flex-col sm:flex-row items-center font-bold gap-4 xl:gap-7.5 text-center sm:text-left px-2 md:px-0">
            <img src={footerLogo} alt="footer logo" className="w-10 h-10 xl:w-[76px] xl:h-[64px]" />
            <p className="font-bold text-2xl lg:text-3xl xl:text-[79px]">Globex</p>
          </div>

          <div className="flex flex-col lg:flex-row flex-wrap justify-between 2xl:justify-center gap-4 lg:gap-10 xl:gap-15 2xl:gap-27.5 mt-4 lg:mt-10 xl:mt-[83px]">
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
                  <div className="flex flex-col gap-3 mt-2 lg:mt-4.75 p-2 md:p-0">
                    {sec.items.map((item, idx) => (
                      <p
                        key={idx}
                        className="font-normal text-lg cursor-pointer"
                      >
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {/* Stay in Touch */}
            <div className="flex flex-col items-center lg:items-start gap-4.75 w-full lg:max-w-[445px]">
              <h3 className="text-respo-24">Stay In Touch</h3>
              <p className="font-normal text-lg max-w-[445px] text-center lg:text-left">
                Stay in touch to get special offers, free giveaways and once in
                a lifetime deals
              </p>
              <div className="relative w-full  max-w-[445px] flex flex-col items-center justify-center">
                <input
                  className="border border-white h-11 w-full pl-11 placeholder:text-footer-input focus:outline-none"
                  type="email"
                  placeholder="Enter your email"
                />
                <img
                  src={email}
                  alt="email"
                  className="absolute left-3 top-3"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="lg:border"></div>

        <div className="py-[39px] flex flex-col flex-wrap md:flex-row items-center justify-center gap-6 lg:gap-50 text-center">
          <p className="cursor-pointer">Terms and Conditions</p>
          <p className="cursor-pointer">Privacy Policy</p>
          <div className="flex justify-center gap-8.5">
            {images.map((image) => (
              <img
                key={image.id}
                src={image.img}
                alt={image.alt}
                className="cursor-pointer"
              />
            ))}
          </div>
        </div>
      </div>
    </ContainerLayout>
  );
};

export default Footer;
