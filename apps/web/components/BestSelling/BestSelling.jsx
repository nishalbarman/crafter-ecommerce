import React from "react";
import TitleWithBar from "../TitleWithBar/TitleWithBar";
import ProductSlider from "../ProductSlider/ProductSlider";

const getProducts = async () => {
  const response = await fetch(
    `http://localhost:3000/api/v1/products?&page=1&limit=25`
  );
  const data = await response.json();
  return data.data;
};

async function BestSelling() {
  const data = await getProducts();

  return (
    <div className="w-full h-fit mt-10 lg:mt-[3rem]">
      <TitleWithBar title={"This Month"} />
      <div className="relative">
        <div className="w-full flex justify-between items-center pt-8 pb-8 md:pt-7 md:pb-10">
          <span className="text-2xl md:text-3xl font-andika font-bold">
            Best Selling Products
          </span>
          <div className="flex items-center justify-center">
            <button className="pt-3 pb-3 pl-8 pr-8 text-sm md:pt-3 md:pb-3 md:pl-8 md:pr-8 rounded-lg bg-[#DB4444] text-white font-semibold font-andika cursor-poiner hover:scale-[1.05]">
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
