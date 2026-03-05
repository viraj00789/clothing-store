import { useNavigate } from "react-router";
import { useWindow } from "../hooks/useWidth";
import { IoArrowBackSharp } from "react-icons/io5";
import { useTranslation } from "react-i18next";

const TermsAndConditions = () => {
  const { t } = useTranslation();
  const width = useWindow();
  const navigate = useNavigate();

  const sections = t("termsAndConditions:Sections", { returnObjects: true }) || [];

  return (
    <div className="min-h-screen px-3.75 lg:px-16 xl:px-32 pt-21 2xl:pt-30 2xl:pb-10">
      <div className="max-w-5xl mx-auto rounded-2xl">
        <div className="flex items-center gap-3 mb-6">
          {width >= 768 && (
            <IoArrowBackSharp
              size={30}
              className="cursor-pointer"
              onClick={() => navigate(-1)}
            />
          )}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            {t("termsAndConditions:Title")}
          </h1>
        </div>

        <p className="text-gray-600 mb-6 text-sm md:text-base leading-relaxed">
          {t("termsAndConditions:LastUpdated")}
        </p>

        <p className="text-gray-700 leading-relaxed mb-6 text-sm md:text-base">
          {t("termsAndConditions:Introduction")}
        </p>

        {sections.map((section, index) => (
          <div key={index}>
            <h2 className="text-xl md:text-2xl font-semibold mt-8 mb-4 text-gray-800">
              {section.title}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6 text-sm md:text-base">
              {section.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TermsAndConditions;
