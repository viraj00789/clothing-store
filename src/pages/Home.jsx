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

const Home = () => {
  const [open, setOpen] = useState(true);

  return (
    <>
      <ContainerLayout>
        <div className="mt-20">
          {open && (
            <div className="w-full p-3.75 bg-light-gray-1 flex items-start md:items-center justify-between">
              <div />
              <div className="flex flex-col lg:flex-row items-center justify-center gap-3.75">
                <p className="text-sm lg:text-lg font-normal text-center">
                  Invite Friends and get 50% off on your next purchase
                </p>
                <Link to="/" className="text-dark-blue">
                  Invite Now
                </Link>
              </div>
              <div className="mt-0.5 md:mt-0">
                <RxCross2
                  className="cursor-pointer"
                  onClick={() => setOpen(false)}
                />
              </div>
            </div>
          )}

          {/* Main slider */}
          <HomePageSlider />

          {/* Trending section */}
          <TrendingSection />

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
        </div>
      </ContainerLayout>
    </>
  );
};

export default Home;
