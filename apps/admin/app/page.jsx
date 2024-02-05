"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import { Provider } from "react-redux";
// import { store } from "@store/redux";

import Navbar from "../components/Navbar/Navbar";
import BannerTop from "../components/SliderTop/BannerTop";
import FlashSale from "../components/FlashSale/FlashSale";
import BestSelling from "../components/BestSelling/BestSelling";
import MiddleBanner from "../components/MiddleBanner/MiddleBanner";
import Categories from "../components/CategorySlider/CategorySlider";
import ExploreProducts from "../components/ExploreProducts/ExploreProducts";
import NewArrivalSection from "../components/NewArrivalSection/NewArrivalSection";
import Features from "../components/Features/Features";
import Footer from "../components/Footer/Footer";

export default function Page() {
  return (
    // <Provider store={store}>
    <>
      <Navbar title={"Crafter"} logo={""} />
      <main className="min-h-[100vh] ml-[3%] mr-[3%] lg:ml-[10%] lg:mr-[10%]">
        <BannerTop />
        <FlashSale />
        <div className="w-full h-[1px] bg-black opacity-[0.1] mt-[3.6rem]"></div>
        <Categories />
        <div className="w-full h-[1px] bg-black opacity-[0.1] mt-[3.6rem]"></div>
        <BestSelling />
        <MiddleBanner />
        <ExploreProducts />
        <NewArrivalSection />
        <Features />
      </main>
      <Footer />
    </>
    // </Provider>
  );
}
