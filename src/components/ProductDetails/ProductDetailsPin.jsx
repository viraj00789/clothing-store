import { useState } from "react";
import { useTranslation } from "react-i18next";

const ProductDetailsPin = () => {
  const [pincode, setPincode] = useState("");
  const { t, i18n } = useTranslation("products");
  return (
    <div className="space-y-2 max-w-[400px]">
      <p className="font-medium lg:font-bold text-lg text-light-black">{t(`products:DeliveryDetails`)}</p>
      <div className="relative border border-dark-gray py-3.5 px-5.5 rounded-10">
        <input
          type="number"
          value={pincode}
          onChange={(e) => {
            const val = e.target.value.slice(0, 6);
            setPincode(val);
          }}
          placeholder={t(`products:EnterPincode`)}
          className={`input focus:outline-none placeholder:text-light-black placeholder:text-sm placeholder:font-normal ${i18n.language === "gj" ? "mt-1" : "mt-0"}`}
        />
        <button className={`absolute w-fit right-5 text-sm text-light-black cursor-pointer ${i18n.language === "gj" ? "mt-1" : "mt-0"}`}>
          {t(`products:Check`)}
        </button>
      </div>
    </div>
  );
};

export default ProductDetailsPin;
