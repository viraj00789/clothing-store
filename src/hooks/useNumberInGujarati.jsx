import { useTranslation } from "react-i18next";

const useNumberInGujarati = () => {
  const { i18n } = useTranslation();

  const formatNumber = (num) => {
    if (num === null || num === undefined) return "";

    if (i18n.language === "gj") {
      return Number(num).toLocaleString("gu-IN", { numberingSystem: "gujr" });
    }

    return Number(num).toLocaleString("en-IN");
  };

  return { formatNumber };
};

export default useNumberInGujarati;