import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Navbar from "../components/Navbar/Navbar";
import BannerTop from "../components/SliderTop/TopSlider";
import FlashSale from "../components/FlashSale/FlashSale";
import BestSelling from "../components/BestSelling/BestSelling";
import MiddleBanner from "../components/MiddleBanner/MiddleBanner";
import Categories from "../components/Categories/Category";
import ExploreProducts from "../components/ExploreProducts/ExploreProducts";
import NewArrivalSection from "../components/NewArrivalSection/NewArrivalSection";
import Features from "../components/Features/Features";
import Footer from "../components/Footer/Footer";
import { getBackendUrl } from "../helpter/utils";

const getSaleDetails = async () => {
  try {
    const backendUrl = getBackendUrl();
    const response = await fetch(`${backendUrl}api/v1/sale-details`);
    const data = await response.json();
    return data;
  } catch (error) {
    return {};
  }
};

export default async function Page() {
  const data = await getSaleDetails();
  const isFlashSaleEnabled = data?.isFlashSaleEnabled || null;
  const saleEndTime = data?.saleEndTime || null;

  return (
    <>
      <main className="min-h-[100vh] ml-[3%] mr-[3%] lg:ml-[10%] lg:mr-[10%]">
        <BannerTop />
        {isFlashSaleEnabled && <FlashSale saleEndTime={saleEndTime} />}
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
  );
}
