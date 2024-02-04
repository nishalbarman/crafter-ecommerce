"use client";

import React from "react";
import { useSelector } from "react-redux";
import Carousel from "../Carousel/Carousel";

import CategoryLink from "../CategoryLink/CategoryLink";

function BannerTop() {
  const bannerItems = useSelector((state) => state.banner.bannerItems); // baners
  const categoryLinks = [
    {
      categoryName: "Woman’s Fashion",
      categoryPath: "/",
      isRightArrowVisible: true,
      categoryExtraLinks: [
        { title: "Hi I am an link" },
        { title: "Hi I am an link" },
        { title: "Hi I am an link" },
        { title: "Hi I am an link" },
        { title: "Hi I am an link" },
        { title: "Hi I am an link" },
        { title: "Hi I am an link" },
      ],
    },
    {
      categoryName: "Men’s Fashion",
      categoryPath: "/",
      isRightArrowVisible: true,
      categoryExtraLinks: [
        { title: "Hi I am an link" },
        { title: "Hi I am an link" },
        { title: "Hi I am an link" },
        { title: "Hi I am an link" },
        { title: "Hi I am an link" },
        { title: "Hi I am an link" },
        { title: "Hi I am an link" },
      ],
    },
    {
      categoryName: "Electronics",
      categoryPath: "/",
      isRightArrowVisible: false,
    },
    {
      categoryName: "Home & Lifestyle",
      categoryPath: "/",
      isRightArrowVisible: false,
    },
    {
      categoryName: "Medicine",
      categoryPath: "/",
      isRightArrowVisible: false,
    },
    {
      categoryName: "Sports & Outdoor",
      categoryPath: "/",
      isRightArrowVisible: true,
      categoryExtraLinks: [
        { title: "Hi I am an link" },
        { title: "Hi I am an link" },
        { title: "Hi I am an link" },
        { title: "Hi I am an link" },
        { title: "Hi I am an link" },
        { title: "Hi I am an link" },
        { title: "Hi I am an link" },
      ],
    },
    {
      categoryName: "Baby’s & Toys",
      categoryPath: "/",
      isRightArrowVisible: true,
      categoryExtraLinks: [
        { title: "Hi I am an link" },
        { title: "Hi I am an link" },
        { title: "Hi I am an link" },
        { title: "Hi I am an link" },
        { title: "Hi I am an link" },
        { title: "Hi I am an link" },
        { title: "Hi I am an link" },
      ],
    },
    {
      categoryName: "Groceries & Pets",
      categoryPath: "/",
      isRightArrowVisible: false,
    },
    {
      categoryName: "Health & Beauty",
      categoryPath: "/",
      isRightArrowVisible: false,
    },
  ];

  return (
    <div className="flex justify-between gap-[6%] mt-[4px] lg:mt-10">
      {/* <div className="hidden flex-col items-center justify-center xl:flex gap-[30px] justify-start items-center w-[400px]">
        {categoryLinks.map((item) => (
          <CategoryLink {...item} />
        ))}
      </div> */}

      <div
        className={`pl-[2%] pr-[2%] lg:p-0 h-fit rounded-md border-0 outline-0 border-none outline-none focus:border-none focus:outline-none peer-focus-visible:border-none peer-focus-visible:outline-none mt-[3%] lg:mt-0 w-[100%] xl:w-[80%] xl:w-[100%]`}>
        <Carousel items={bannerItems} />
      </div>
    </div>
  );
}

export default BannerTop;
