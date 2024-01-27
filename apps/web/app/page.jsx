"use client";

import Navbar from "../components/Navbar/Navbar";
import BannerTop from "../components/BannerTop/BannerTop";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Provider } from "react-redux";
import { store } from "@store/redux";

export default function Page() {
  return (
    <Provider store={store}>
      <Navbar title={"Crafter"} logo={""} />
      <main className="h-[100vh]">
        <BannerTop />
      </main>
    </Provider>
  );
}
