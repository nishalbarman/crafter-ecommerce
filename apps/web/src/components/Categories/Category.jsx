import React from "react";
import axios from "axios";
import TitleWithBar from "../TitleWithBar/TitleWithBar";
import CategorySlider from "../Categories/CategorySlider";
import { getBackendUrl } from "../../helpter/utils";

const getCategories = async () => {
  try {
    const backendUrl = getBackendUrl();
    const response = await axios.get(`${backendUrl}api/v1/categories`);
    return response.data.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default async function Category() {
  const categories = await getCategories();

  return (
    <div className="w-full h-fit mt-10 lg:mt-[3rem]">
      <TitleWithBar title={"Categories"} />
        <div className="w-full flex justify-between items-center mb-10 max-[597px]:mb-6">
          <span className="w-full text-left hidden xl:inline">-</span>
          <span className="text-2xl xl:text-3xl font-bold max-[597px]:text-[20px]">
            Browse By Category
          </span>
          <span className="w-full text-right hidden xl:inline">-</span>
        </div>
        <CategorySlider items={categories || []} />
    </div>
  );
}
