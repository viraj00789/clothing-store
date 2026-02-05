import flag from "../../../assets/Services/flag.svg";
import box from "../../../assets/Services/box.svg";
import headphone from "../../../assets/Services/headphone.svg";
import offer from "../../../assets/Services/offer.svg";
import trucks from "../../../assets/Services/truck.svg";

const ServiceesArray = [
  {
    id: 1,
    label: "Locally Owned",
    image: flag,
    desc: "We have local business and sell best quality clothes",
  },
  {
    id: 2,
    label: "Fast Delivery",
    image: trucks,
    desc: "We provide fast delivery to our customers",
  },
  {
    id: 3,
    label: "Easy Return",
    image: box,
    desc: "We provide easy return policy.",
  },
  {
    id: 4,
    label: "Online Support",
    image: headphone,
    desc: "We give 24/7 online support",
  },
  {
    id: 5,
    label: "Best Offers",
    image: offer,
    desc: "We give best offers to our customers",
  },
];

export default function Services() {
  return (
    <div
      className="px-3.75 xl:px-12.5 pb-2 mt-3 md:mt-6 lg:mt-[85px] lg:py-5 flex items-center justify-between gap-3 overflow-auto
    trending-scroll "
    >
      {ServiceesArray.map((item) => (
        <div
          className="bg-light-gray flex flex-col items-center justify-center min-w-[318px] lg:w-[318px] rounded-[10px] p-5 space-y-2.5 h-[250px] lg:h-[202px] gap-2 lg:gap-0"
          key={item.id}
        >
          <div className="h-12.5 w-12.5">
            <img src={item.image} />
          </div>
          <div className="text-center space-y-3 lg:space-y-4">
            <p className="font-bold text-xl lg:text-2xl">{item.label}</p>
            <p>{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
