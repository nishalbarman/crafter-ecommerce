import React from "react";

import TitleWithBar from "../TitleWithBar/TitleWithBar";
import ViewAllProducts from "../ExploreProducts/ViewAllProducts";

import { fetchProducts } from "@/lib/product";

import ProductItem from "../ProductItem/ProductItem";

async function ExploreProducts() {
  const projectData = await fetchProducts({
    page: 0,
    limit: 25,
  });

  return (
    <div className="w-full h-fit mt-10 lg:mt-[5rem]">
      <TitleWithBar title={"Our Products"} />
      <div className="relative">
        <div className="w-full flex justify-between items-center mb-10 max-[597px]:mb-6">
          <span className="text-2xl xl:text-3xl font-bold max-[597px]:text-[20px]">
            Explore Our Products
          </span>
        </div>

        <div className="grid grid-cols-2 gap-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 justify-center min-md:gap-4 items-stretch">
          {projectData?.products?.map((item, index) => (
            <div
              className="w-full h-fit flex flex-row justify-center p-1"
              key={index}>
              <ProductItem
                productDetails={{ ...item }}
                options={{
                  isRatingVisible: false,
                  isEyeVisible: true,
                  isWishlistIconVisible: true,
                  deleteCartIconVisible: false,
                  deleteWishlistIconVisible: false,
                }}
              />
            </div>
          ))}
        </div>
        {/* View All Butons */}
        <ViewAllProducts />
      </div>
    </div>
  );
}

export default ExploreProducts;
