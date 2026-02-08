import { Link } from "react-router";
import { RxCross2 } from "react-icons/rx";
import { useState } from "react";
import HomePageSlider from "../components/ui/home/MainSlider/HomePageSlider";
import ContainerLayout from "../layout/ContainerLayout";
import TrendingSection from "../components/ui/home/TrendingSection";
import DealsForDays from "../components/ui/home/DealsForDays";
import OfferSlider from "../components/ui/home/OffersSlider/Offers";
import FashionSlider from "../components/ui/home/FashionSlider/FashionSlider";
import Categories from "../components/ui/home/Categories";
import CustomerSay from "../components/ui/home/CustomerSay/CustomerSay";
import FeaturedBlog from "../components/ui/home/FeaturedBlog";
import Services from "../components/ui/home/Services";
import AboutUs from "../components/ui/home/AboutUs";
import CategoryRow from "../components/CategoryRow";
import OurCollection from "../components/OurCollection";
import MobileDealsForDay from "../components/ui/home/MobileDealsForDay/MobileDealsForDay";

const Home = () => {
  const [open, setOpen] = useState(true);
  const [closing, setClosing] = useState(false);

  return (
    <>
      <ContainerLayout>
        <div className="mt-16 lg:mt-20">
          {open && (
            <div
              className={`
      w-full p-3.75 bg-light-gray-1 hidden-md-flex items-start md:items-center justify-between
      transition-all duration-500 ease-in-out 
      ${closing ? "opacity-0 max-h-0 overflow-hidden" : "opacity-100 max-h-40"}
    `}
              onTransitionEnd={() => {
                if (closing) {
                  setOpen(false); // finally remove from DOM after animation
                  setClosing(false);
                }
              }}
            >
              <div />

              <div className="flex flex-col lg:flex-row items-center justify-center gap-[15px]">
                <p className="text-sm lg:text-lg font-normal text-center text-light-black">
                  Invite Friends and get 50% off on your next purchase
                </p>
                <Link to="/" className="text-dark-blue">
                  Invite Now
                </Link>
              </div>

              <div className="mt-0.5 md:mt-0">
                <RxCross2
                  size={17.11}
                  className="cursor-pointer text-dark-gray"
                  onClick={() => setClosing(true)}
                />
              </div>
            </div>
          )}

          <div className="flex-md-hidden">
            <CategoryRow />
          </div>

          <div className="flex-md-hidden pb-7.5">
            <FashionSlider />
          </div>

          {/* Main slider */}
          <div className="transition-all duration-500 ease">
            <HomePageSlider />
          </div>

          {/* Trending section */}
          <TrendingSection />

          <div className="flex-md-hidden">
            <OurCollection />
          </div>
          <div className="flex-md-hidden">
            <OurCollection />
          </div>
          <div className="flex-md-hidden">
            <OurCollection />
          </div>

          <div clasnsName="flex-md-hidden">
            <MobileDealsForDay />
          </div>

          {/* Deals for Days*/}
          <DealsForDays />

          {/* Trending Offers */}
          <OfferSlider />

          {/* Fashion Slider */}
          <FashionSlider />

          {/* Categorie Section */}
          <Categories />

          {/* Customer Say */}
          <CustomerSay />

          {/* Featured Blogs */}
          <FeaturedBlog />

          {/* Services */}
          <Services />

          {/* AboutUs */}
          <AboutUs />
        </div>
      </ContainerLayout>
    </>
  );
};

export default Home;
