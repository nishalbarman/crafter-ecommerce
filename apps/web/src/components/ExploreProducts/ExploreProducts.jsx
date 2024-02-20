import React from "react";
import TitleWithBar from "../TitleWithBar/TitleWithBar";
import AllExploreProducts from "../ExploreProducts/AllProducts";
import ViewAllProducts from "../ExploreProducts/ViewAllProducts";
import { getBackendUrl } from "../../helpter/utils";

// benifit of using server component
const getProducts = async () => {
  const backendUrl = getBackendUrl();
  const response = await fetch(
    `${backendUrl}api/v1/products?&page=1&limit=500`
  );
  const data = await response.json();
  return data.data;
};

async function ExploreProducts() {
  const data = await getProducts();

  return (
    <div className="w-full h-fit mt-10 lg:mt-[5rem]">
      <TitleWithBar title={"Our Products"} />
      <div className="relative">
        <div className="w-full flex justify-between items-center mb-10 max-[597px]:mb-6">
          <span className="text-2xl xl:text-3xl font-bold max-[597px]:text-[20px]">
            Explore Our Products
          </span>
        </div>
        
        <AllExploreProducts exploreProductData={data} />
        {/* View All Butons */}
        <ViewAllProducts />
      </div>
    </div>
  );
}

export default ExploreProducts;
