import React from "react";
import TitleWithBar from "../TitleWithBar/TitleWithBar";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import Image from "next/image";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CategoryItem from "../CategoryItem/CategoryItem";

const CustomPrevArrow = ({ className, style, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="absolute top-[-65px] md:top-[-75px] right-[102px] flex items-center justify-center text-white rounded-full h-[25px] w-[25px] bg-[#F5F5F5] backdrop-blur-[10px] flex items-center justify-center scale-[1.8] md:scale-[2] cursor-pointer z-10">
     <Image src={"/assets/leftarrow.svg"} width={10} height={10} />
    </div>
  );
};

const CustomNextArrow = ({ className, style, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="absolute top-[-65px] md:top-[-75px] right-10 flex items-center justify-center text-white rounded-full h-[25px] w-[25px] bg-[#F5F5F5] backdrop-blur-[10px] flex items-center justify-center scale-[1.8] md:scale-[2] cursor-pointer z-10">
      <Image src={"/assets/rightarrow.svg"} width={10} height={10} />
    </div>
  );
};

const CategorySlider = ({ items }) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 2000, // Adjust as needed
        settings: {
          slidesToShow: 7,
          slidesToScroll: 7,
        },
      },
      {
        breakpoint: 1700, // Adjust as needed
        settings: {
          slidesToShow: 6,
          slidesToScroll: 6,
        },
      },
      {
        breakpoint: 1364, // Adjust as needed
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 841, // Adjust as needed
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 571, // Adjust as needed
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  const navigator = useRouter();
  const dispatch = useDispatch();

  return (
    <Slider {...settings}>
      {items.map((item, index) => (
        <div
          className="w-full h-fit flex flex-row justify-center p-1"
          // onClick={() => {
          //   navigator.push(item.path);
          // }}
          key={index}>
          <CategoryItem {...item} />
        </div>
      ))}
    </Slider>
  );
};

function CategoryRow() {
  const categories = [
    {
      title: "Phones",
      imageUrl: "/assets/category/phones.svg",
      path: "/products?category=phones",
    },
    {
      title: "Computers",
      imageUrl: "/assets/category/computers.svg",
      path: "/products?category=computers",
    },
    {
      title: "SmartWatch",
      imageUrl: "/assets/category/smart-watch.svg",
      path: "/products?category=smartwatch",
      atings: 100,
      rating: 5,
    },
    {
      title: "Camera",
      imageUrl: "/assets/category/camera.svg",
      path: "/products?category=camera",
    },
    {
      title: "HeadPhones",
      imageUrl: "/assets/category/headphone.svg",
      path: "/products?category=headphones",
    },
    {
      title: "Gaming",
      imageUrl: "/assets/category/gaming.svg",
      path: "/products?category=gaming",
    },
  ];

  const navigator = useRouter();

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
        <CategorySlider items={categories} />
      </div>
    </div>
  );
}

export default CategoryRow;
