import { CategoryImages } from "../../data/CategoryRowData";

export default function CategoryRow() {
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
            />
          </div>

          {/* Label */}
          <span className="text-sm mt-2.5 font-normal text-gray-700">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}
