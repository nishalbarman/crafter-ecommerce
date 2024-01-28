"use client";

import Navbar from "../components/Navbar/Navbar";
import BannerTop from "../components/BannerTop/BannerTop";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Provider } from "react-redux";
import { store } from "@store/redux";

import FlashSale from "../components/FlashSale/FlashSale";
import BestSelling from "../components/BestSelling/BestSelling";

export default function Page() {
  return (
    <Provider store={store}>
      <Navbar title={"Crafter"} logo={""} />
      <main className="min-h-[100vh] ml-[3%] mr-[3%] lg:ml-[10%] lg:mr-[10%]">
        <BannerTop />
        <FlashSale />
        <BestSelling />
      </main>
    </Provider>
  );
}
