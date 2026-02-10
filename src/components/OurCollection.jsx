import { useState, useEffect } from "react";
import Heart from "../assets/Icons/Home/GrayIcons/home-heart.svg";
import PinkHeart from "../assets/Icons/Home/pink-heart.svg";
import WhiteBag from "../assets/Icons/Home/white-bag.svg";

const allImages = [
  "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1520975916090-3105956dac38?w=800&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&auto=format&fit=crop&q=60",
];
import { IoIosArrowBack } from "react-icons/io";

const OurCollection = () => {
  const [open, setOpen] = useState(false);
  const [liked, setLiked] = useState(false);

  const images = {
    big: allImages[0],
    topRight: allImages[1],
    bottomRight: allImages[2],
  };

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  return (
    <div className="xl:space-y-[27px] mt-6 lg:mt-[85px] px-3.5 lg:px-0 w-full">
      <h3 className="lg:px-3.75 xl:px-12.5 text-light-black font-bold text-2xl lg:text-4xl lg:mb-0 pb-4.5">
        Our Collection
      </h3>
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-2.5 h-[220px] md:h-[226px]">
          {/* Left big image */}
          <div
            className="col-span-2 row-span-2 rounded-xl bg-cover bg-center"
            style={{ backgroundImage: `url(${images.big})` }}
          />

          {/* Top right */}
          <div
            className="rounded-xl bg-cover bg-center"
            style={{ backgroundImage: `url(${images.topRight})` }}
          />

          {/* Bottom right with +2 */}
          <button
            onClick={() => setOpen(true)}
            className="relative rounded-xl bg-cover bg-center overflow-hidden"
            style={{ backgroundImage: `url(${images.bottomRight})` }}
          >
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer">
              <span className="text-white text-4xl font-bold">
                + {allImages.length - 3}
              </span>
            </div>
          </button>
        </div>
        <div className="space-y-1 rounded-b-[10px]">
          <div className="font-medium text-xl text-light-black">
            Womens White Shirt
          </div>

          <div className="flex gap-7.5 items-center">
            <p className="text-lg font-normal text-light-black">Brand Name</p>
          </div>

          <div className="flex gap-[17px] truncate">
            <p className="text-dark-gray line-through text-lg font-normal ">
              Rs. 999
            </p>
            <p className="font-normal text-xl whitespace-nowrap text-light-black">
              Rs. 777
            </p>
            <p className="text-lg text-green-off">(20% off)</p>
          </div>
        </div>
        <div className="flex justify-between w-full gap-[13px]">
          <div
            onClick={() => setLiked(!liked)}
            className="w-full h-9.5 border border-dark-button-blue rounded-10 cursor-pointer flex items-center justify-center gap-[23.23px] group transition-all duration-150"
          >
            <button className="font-normal text-sm text-light-black">
              WishList
            </button>

            <img
              src={liked ? PinkHeart : Heart}
              alt="WishList"
              loading="lazy"
              width={14.73}
              height={13.04}
              className={`transition-all duration-200 ease-out group-hover:scale-120 active:scale-120 ${liked ? "scale-145" : "scale-100"}`}
            />
          </div>

          <div className="w-full h-9.5 bg-dark-button-blue text-white rounded-10 cursor-pointer flex items-center justify-center gap-[23.23px]">
            <button className="font-normal text-sm text-white">
              Add to Bag
            </button>
            <img
              src={WhiteBag}
              alt="WishList"
              loading="lazy"
              width={14.88}
              height={17}
            />
          </div>
        </div>
      </div>

      {/* Fullscreen Modal */}
      {open && (
        <div className="fixed inset-0 z-100 bg-black flex flex-col">
          {/* Close button */}
          <div className="px-2 py-6 flex justify-start items-center">
            <IoIosArrowBack
              onClick={() => setOpen(false)}
              className="text-white text-2xl font-bold"
            />
            <p className="text-white text-xl font-bold">Our Collections</p>
          </div>

          {/* Scrollable images */}
          <div className="flex-1 overflow-y-auto px-2 pb-4 space-y-5 trending-scroll">
            {allImages.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`collection-${i}`}
                className="w-full rounded-lg object-cover max-h-[600px] h-full bg-top"
                loading="lazy"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default OurCollection;
