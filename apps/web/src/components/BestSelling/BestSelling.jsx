import React from "react";
import axios from "axios";

import TitleWithBar from "../TitleWithBar/TitleWithBar";
import ProductSlider from "../ProductSlider/ProductSlider";
import { getBackendUrl } from "../../helpter/utils";

const getProducts = async () => {
  const backendUrl = getBackendUrl();
  const response = await axios.get(
    `${backendUrl}api/v1/products?&page=1&limit=25`
  );
  const data = response.data;
  return data.data;
};

async function BestSelling() {
  const data = await getProducts();

  return (
    <div className="w-full h-fit mt-10 lg:mt-[3rem]">
      <TitleWithBar title={"This Month"} />
      <div className="w-full flex justify-between items-center mb-10 max-[597px]:mb-6">
        <span className="text-2xl xl:text-3xl font-bold align-center max-[597px]:text-[20px]">
          Best Selling Products
        </span>
        <button className="pt-3 pb-3 pl-8 pr-8 text-sm rounded-lg bg-[#DB4444] text-white font-semibold cursor-poiner hover:scale-[1.05] max-[597px]:p-[8px_25px]">
          View All
        </button>
      </div>
      <ProductSlider items={data} />
    </div>
  );
}

export default BestSelling;
