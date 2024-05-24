import React from "react";
import TitleWithBar from "../TitleWithBar/TitleWithBar";
import ProductSlider from "../ProductSlider/ProductSlider";
import { cookies } from "next/headers";
import { fetchProducts } from "@/lib/product";

async function BestSelling() {
  const productData = await fetchProducts({
    page: 0,
    limit: 10,
  });

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
      <ProductSlider items={productData?.products} />
    </div>
  );
}

export default BestSelling;
