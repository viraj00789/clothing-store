import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en/index";
import gj from "./locales/gj/index";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en,
      gj,
    },
    lng: localStorage.getItem("lang") || "en",
    fallbackLng: "en",
    ns: ["profile", "navbar", "category_row", "fashion_slides", "products", "headers", "offers", "services","about","footer", "productSpecification"],
    keySeparator: false,
    interpolation: { escapeValue: false },
  });

export default i18n;