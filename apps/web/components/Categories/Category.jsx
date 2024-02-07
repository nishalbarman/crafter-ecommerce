import React from "react";
import axios from "axios";
import TitleWithBar from "../TitleWithBar/TitleWithBar";
import CategorySlider from "../Categories/CategorySlider";

const getCategories = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/api/v1/categories`);
    return response.data.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default async function Category() {
  console.log("Category is a server component");

  const categories = await getCategories();
  console.log(categories);

  return (
    <div className="w-full h-fit mt-10 lg:mt-[3rem]">
      <TitleWithBar title={"Categories"} />
      <div className="relative">
        <div className="w-full flex justify-between items-center pt-8 pb-8 md:pt-7 md:pb-[4rem]">
          <span className="w-full text-left hidden xl:inline">-</span>
          <span className="text-2xl xl:text-3xl xl:text-center xl:w-full font-andika font-bold">
            Browse By Category
          </span>
          <span className="w-full text-right hidden xl:inline">-</span>
        </div>
        <CategorySlider items={categories || []} />
      </div>
    </div>
  );
}
