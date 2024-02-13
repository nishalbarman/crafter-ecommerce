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
      <div className="relative">
        <div className="w-full flex justify-between items-center pt-8 pb-8 md:pt-7 md:pb-10 max-sm:mt-[-10px]">
          <span className="text-2xl md:text-3xl font-andika font-bold">
            Best Selling Products
          </span>
          <div className="flex items-center justify-center">
            <button className="pt-3 pb-3 pl-8 pr-8 text-sm md:pt-3 md:pb-3 md:pl-8 md:pr-8 rounded-lg bg-[#DB4444] text-white font-semibold font-andika cursor-poiner hover:scale-[1.05] max-sm:p-[10px_30px]">
              View All
            </button>
          </div>
        </div>
        <ProductSlider items={data} />
      </div>
    </div>
  );
}

export default BestSelling;
