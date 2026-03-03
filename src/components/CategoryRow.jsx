import { CategoryImages } from "../../data/CategoryRowData";
import { useTranslation } from "react-i18next";

export default function CategoryRow() {
  const { t } = useTranslation();
  return (
    <div className="flex items-center gap-4 overflow-x-auto px-3.5 xs:px-[21px] py-[22px] trending-scroll">
      {CategoryImages.map((item) => (
        <div key={item.id} className="flex flex-col items-center min-w-[64px]">
          {/* Circle */}
          <div className="w-15.5 h-15.5 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
            <img
              src={item.src}
              alt={item.label}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          {/* Label */}
          <span className="text-sm md:text-md mt-2.5 font-normal text-gray-700">
            {t(`category_row:${item.label}`)}
          </span>
        </div>
      ))}
    </div>
  );
}
