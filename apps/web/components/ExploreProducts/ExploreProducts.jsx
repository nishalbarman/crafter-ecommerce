import React from "react";
import TitleWithBar from "../TitleWithBar/TitleWithBar";
import AllExploreProducts from "../ExploreProducts/AllProducts";
import ViewAllProducts from "../ExploreProducts/ViewAllProducts";

// benifit of using server component
const getProducts = async () => {
  const response = await fetch(
    `http://localhost:3000/api/v1/products?&page=1&limit=25`
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
        <div className="w-full flex justify-between items-center pt-8 pb-8 md:pt-7 md:pb-10">
          <span className="text-2xl md:text-3xl font-andika font-bold">
            Explore Our Products
          </span>
        </div>
        {/* all products */}
        <AllExploreProducts exploreProductData={data} />
        {/* View All Butons */}
        <ViewAllProducts />
      </div>
    </div>
  );
}

export default ExploreProducts;
