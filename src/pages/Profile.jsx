import { FiLogOut, FiChevronRight } from "react-icons/fi";
import { getItem } from "../utils/localStorage";
import { Link, useNavigate } from "react-router";
import useLogout from "../hooks/logout";
import { ProfileMenuItems } from "../../data/profileMenuItems";
import { IoArrowBack } from "react-icons/io5";
import ContainerLayout from "../layout/ContainerLayout";
import { useWindow } from "../hooks/useWidth";
import { IoLanguage } from "react-icons/io5";
import { useTranslation } from "react-i18next";

const Profile = () => {
  const { name, email } = getItem("user") || {};
  const navigate = useNavigate();
  const logout = useLogout();
  const width = useWindow();
  const { t, i18n } = useTranslation("profile");

  const handleLanguage = () => {
    const newLang = i18n.language === "en" ? "gj" : "en";
    i18n.changeLanguage(newLang);
    localStorage.setItem("lang", newLang);
  };

  return (
    <ContainerLayout>
      <div className="w-full max-w-2xl mx-auto bg-white flex flex-col justify-between mb-8 md:mb-20 mt-20 md:mt-30">
        {width >= 768 && (
          <div className="mb-4">
            <IoArrowBack
              size={30}
              onClick={() => navigate(-1)}
              className="cursor-pointer"
            />
          </div>
        )}
        <div className="  sm:rounded-xl p-3 md:p-10 md:border border-light-gray-2">
          {/* Top Section */}
          <div>
            {/* Profile Info */}
            <div className="flex items-center gap-4 mb-7.5">
              <img
                src="https://plus.unsplash.com/premium_photo-1689977968861-9c91dbb16049?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG9tbWV8ZW58MHx8MHx8fDA%3D"
                alt="User"
                className="w-14 h-14 rounded-full object-cover"
              />
              <div>
                <h3 className="font-bold text-lg text-black">{name}</h3>
                <p className="text-sm text-dark-gray font-normal">{email}</p>
              </div>
            </div>

            {/* Menu Items */}
            <div className="space-y-4">
              {ProfileMenuItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 transition cursor-pointer"
                  onClick={() => navigate(item.href)}
                >
                  <div className="flex items-center justify-center gap-3 text-gray-700 leading-1">
                    <img src={item.icon} className="w-5 h-5" alt={item.label} />
                    <p className={`text-md font-medium text-light-black ${i18n.language === "gj" ? "mt-1" : "mt-0"}`}>
                      {t(`profile:${item.label}`)}
                    </p>
                  </div>

                  <FiChevronRight className="text-light-black-2" size={20} />
                </div>
              ))}
            </div>

            {/* Toggle Language */}
            <div className="mt-4">
              <div className="flex items-center justify-between px-3 ">
                <div className="flex items-center gap-3  rounded-lg ">
                  <IoLanguage size={20} />
                  <span className="text-md font-medium">
                    {t("profile:ChangeLanguage")}
                  </span>
                </div>
                {/* <FiChevronRight className="text-light-black-2" size={20} /> */}
                {/* 🌍 Language Switch */}
                <div className="flex justify-end z-1">
                  <button
                    onClick={handleLanguage}
                    className="relative w-24 h-10 bg-gray-100 rounded-full p-1 shadow-inner transition-all duration-300 cursor-pointer"
                  >
                    {/* Sliding Active Background */}
                    <span
                      className={`absolute top-1 left-1 w-11 h-8 rounded-full bg-white shadow-md transition-all duration-300 ${
                        i18n.language === "gj"
                          ? "translate-x-11"
                          : "translate-x-px"
                      }`}
                    />

                    {/* Labels */}
                    <span className="relative z-10 flex items-center justify-between h-full px-3 text-sm font-semibold">
                      <span
                        className={`transition-colors duration-300 ${
                          i18n.language === "en"
                            ? "text-black"
                            : "text-gray-400"
                        }`}
                      >
                        EN
                      </span>

                      <span
                        className={`transition-colors duration-300 ${
                          i18n.language === "gj"
                            ? "text-black text-md"
                            : "text-gray-400 text-lg leading-2 mb-1.5"
                        }`}
                      >
                        ગુજ
                      </span>
                    </span>
                  </button>
                </div>
              </div>
            </div>
            {/* Logout */}
            <div className="mt-4">
              <div
                className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-red-50 transition cursor-pointer text-red-600"
                onClick={() => logout()}
              >
                <FiLogOut />
                <span className="text-md font-medium">
                  {t("profile:Logout")}
                </span>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="text-md text-center text-gray-400 mt-6">
            <Link to="/privacy-policy">{t("profile:PrivacyPolicy")}</Link> |
            <Link to="/terms-and-conditions">
              {" "}
              {t("profile:TermsAndConditions")}{" "}
            </Link>
          </div>
        </div>
      </div>
    </ContainerLayout>
  );
};

export default Profile;
