"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import Carousel from "../Carousel/Carousel";

function BannerTop() {
  const bannerItems = useSelector((state) => state.banner.bannerItems);
  console.log(
    "Banner items direct track from BannerTop -------->",
    bannerItems
  );
  return (
    <div className="flex justify-between gap-[6%] mt-[4px] lg:mt-10">
      <div className="hidden flex-col items-center justify-center xl:flex gap-[30px] justify-start items-center w-[400px]">
        <div className="cursor-pointer hover:scale-[1.02] group/link flex justify-between items-center h-[20px] w-[100%]">
          <Link className="text-lg font-andika text-nowrap w-full" href={"/"}>
            Woman’s&nbsp;Fashion
          </Link>
          &nbsp;
          <Image
            className="group-hover/link:translate-x-[10px] transform ease-linear duration-300 align-right justify-self-end"
            src="/assets/right-arrow.svg"
            alt="right arrow"
            width={20}
            height={20}
          />
        </div>

        <div className="cursor-pointer hover:scale-[1.02] group/link flex justify-between items-center h-[20px] w-[100%]">
          <Link className="text-lg font-andika text-nowrap w-full" href={"/"}>
            Men’s&nbsp;Fashion
          </Link>
          &nbsp;
          <Image
            className="group-hover/link:translate-x-[10px] transform ease-linear duration-300 align-right justify-self-end"
            src="/assets/right-arrow.svg"
            alt="right arrow"
            width={20}
            height={20}
          />
        </div>

        <div className="cursor-pointer hover:scale-[1.02] flex justify-between items-center h-[20px] w-[100%]">
          <Link className="text-lg font-andika text-nowrap w-full" href={"/"}>
            Electronics
          </Link>
        </div>

        <div className="cursor-pointer hover:scale-[1.02] flex justify-between items-center h-[20px] w-[100%]">
          <Link className="text-lg font-andika text-nowrap w-full" href={"/"}>
            Home & Lifestyle
          </Link>
        </div>

        <div className="cursor-pointer hover:scale-[1.02] flex justify-between items-center h-[20px] w-[100%]">
          <Link className="text-lg font-andika text-nowrap w-full" href={"/"}>
            Medicine
          </Link>
          &nbsp;
        </div>

        <div className="cursor-pointer hover:scale-[1.02] group/link flex justify-between items-center h-[20px] w-[100%]">
          <Link className="text-lg font-andika text-nowrap w-full" href={"/"}>
            Sports & Outdoor
          </Link>
          &nbsp;
          <Image
            className="group-hover/link:translate-x-[10px] transform ease-linear duration-300 align-right justify-self-end"
            src="/assets/right-arrow.svg"
            alt="right arrow"
            width={20}
            height={20}
          />
        </div>

        <div className="cursor-pointer hover:scale-[1.02] group/link flex justify-between items-center h-[20px] w-[100%]">
          <Link className="text-lg font-andika text-nowrap w-full" href={"/"}>
            Baby’s & Toys
          </Link>
          &nbsp;
          <Image
            className="group-hover/link:translate-x-[10px] transform ease-linear duration-300  align-right justify-self-end"
            src="/assets/right-arrow.svg"
            alt="right arrow"
            width={20}
            height={20}
          />
        </div>

        <div className="cursor-pointer hover:scale-[1.02] flex justify-between items-center h-[20px] w-[100%]">
          <Link className="text-lg font-andika text-nowrap w-full" href={"/"}>
            Groceries & Pets
          </Link>
        </div>

        <div className="cursor-pointer hover:scale-[1.02] flex justify-between items-center h-[20px] w-[100%]">
          <Link className="text-lg font-andika text-nowrap w-full" href={"/"}>
            Health & Beauty
          </Link>
        </div>
      </div>

      <div
        className={`pl-[2%] pr-[2%] lg:p-0 h-fit rounded-md border-0 outline-0 border-none outline-none focus:border-none focus:outline-none peer-focus-visible:border-none peer-focus-visible:outline-none mt-[3%] lg:mt-0 w-[100%] xl:w-[80%]`}>
        <Carousel items={bannerItems} />
      </div>
    </div>
  );
}

export default BannerTop;
