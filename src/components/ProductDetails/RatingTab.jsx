import { useEffect, useState } from "react";
import { reviewsData } from "../../../data/ProductSpectification";
import BlackStar from "../../assets/Icons/ProductDetails/rating-star.svg";
import WhiteStar from "../../assets/Icons/ProductDetails/white-star.svg";
import YellowStar from "../../assets/Icons/ProductDetails/yellow-star.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const RatingTab = () => {
  const [showAll, setShowAll] = useState(false);
  const [expanded, setExpanded] = useState({});
  const [previewImages, setPreviewImages] = useState([]);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const visibleReviews = showAll
    ? reviewsData.slice(0, 6)
    : reviewsData.slice(0, 3);

  const toggleReadMore = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    if (isPreviewOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isPreviewOpen]);

  useEffect(() => {
    if (!isPreviewOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsPreviewOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isPreviewOpen]);

  return (
    <div className="py-3 mt-0">
      <h2 className="text-2xl font-bold text-light-black pb-3  hidden-lg-flex">
        Ratings
      </h2>

      <div className="flex flex-col gap-4">
        <div className="flex gap-3">
          <p className="text-xl 2xl:text-5xl">4.4</p>
          <div className="flex items-center gap-2">
            {[...Array(4)].map((_, i) => (
              <img key={i} src={BlackStar} loading="lazy" />
            ))}
            <img src={WhiteStar} loading="lazy" />
          </div>
        </div>
        <p className="text-lg font-normal text-dark-gray lg:text-light-black">
          40 Verified Buyers
        </p>
      </div>

      <div className="mt-6 lg:mt-12 space-y-6 lg:space-y-[45px]">
        {visibleReviews.map((review) => {
          const isExpanded = expanded[review.id];
          const shortText = review.text.slice(0, 160);

          return (
            <div key={review.id} className="space-y-2.5 lg:space-y-[15px]">
              {/* Rating */}
              <p className="text-xl font-normal text-light-black">{review.review}</p>

              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  {[...Array(4)].map((_, i) => (
                    <img key={i} src={YellowStar} loading="lazy" />
                  ))}
                  <img src={WhiteStar} loading="lazy" />
                  <p className="font-normal text-lg">{review.rating}</p>
                </div>
                <div className="flex-lg-hidden gap-4">
                  <p className="text-lg text-dark-gray font-normal ">
                    {review.name}
                  </p>
                  <p className="text-lg text-dark-gray font-normal">
                    {review.date}
                  </p>
                </div>
              </div>

              {/* Text */}
              <p className="text-lg text-light-black font-normal max-w-[908px] cursor-pointer">
                {isExpanded ? review.text : shortText}
                {review.text.length > 160 && (
                  <button
                    onClick={() => toggleReadMore(review.id)}
                    className="text-dark-blue ml-2 text-lg cursor-pointer"
                  >
                    {isExpanded ? "Read Less" : "Read More"}
                  </button>
                )}
              </p>

              {/* Images */}
              {review.images.length > 0 && (
                <div className="flex gap-3">
                  {review.images.slice(0, 2).map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt=""
                      className="w-35 h-35 object-cover rounded-md"
                    />
                  ))}

                  {review.images.length > 2 && (
                    <div
                      className="relative w-35 h-35 rounded-md overflow-hidden cursor-pointer"
                      onClick={() => {
                        setPreviewImages(review.images);
                        setIsPreviewOpen(true);
                      }}
                    >
                      <img
                        src={review.images[2]}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-semibold text-lg">
                        +{review.images.length - 2}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Author */}
              <p className="text-lg text-light-black font-normal hidden lg:flex">
                {review.name} | {review.date}
              </p>
            </div>
          );
        })}

        {/* View All Button */}
        {!showAll ? (
          <button
            onClick={() => setShowAll(true)}
            className="text-dark-blue text-lg font-medium cursor-pointer"
          >
            View all Reviews
          </button>
        ) : (
          <button
            onClick={() => setShowAll(false)}
            className="text-dark-blue text-lg font-medium cursor-pointer"
          >
            View Less
          </button>
        )}
        {isPreviewOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Overlay */}
            <div
              className="absolute inset-0 bg-black/70"
              onClick={() => setIsPreviewOpen(false)}
            />

            {/* Modal */}
            <div className="relative bg-white p-4 rounded-lg max-w-3xl z-10">
              <p className="font-bold text-xl text-light-black mb-3 px-2 ">
                Preivew Image
              </p>
              <Swiper
                modules={[Pagination]}
                pagination={{ clickable: true }}
                spaceBetween={16}
                slidesPerView={1}
                loop={true}
                className="w-[280px] sm:w-[400px] max-w-lg"
              >
                {previewImages.map((img, idx) => (
                  <SwiperSlide key={idx}>
                    <img
                      src={img}
                      alt="Preview Image"
                      className="w-full max-h-[400px] object-cover rounded cursor-pointer opacity-96"
                      loading="lazy"
                      loop
                    />
                  </SwiperSlide>
                ))}
              </Swiper>

              <button
                onClick={() => setIsPreviewOpen(false)}
                className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RatingTab;
