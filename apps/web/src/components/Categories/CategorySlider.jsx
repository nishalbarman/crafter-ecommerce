"use client";

import Image from "next/image";

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CategoryItem from "./CategoryItem";

const CustomPrevArrow = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="flex items-center justify-center rounded-full h-[45px] w-[45px] bg-[#F5F5F5] cursor-pointer z-10 max-[597px]:w-[37px] max-[597px]:h-[37px] shadow absolute top-[50%] translate-y-[-50%] max-[597px]:hidden">
      <Image
        src={"/assets/leftarrow.svg"}
        width={10}
        height={10}
        alt="left arrow"
      />
    </div>
  );
};

const CustomNextArrow = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="flex items-center justify-center rounded-full h-[45px] w-[45px] bg-[#F5F5F5] cursor-pointer z-10 max-[597px]:w-[37px] max-[597px]:h-[37px] shadow absolute top-[50%] translate-y-[-50%] right-0 max-[597px]:hidden">
      <Image
        src={"/assets/rightarrow.svg"}
        width={10}
        height={10}
        alt="right arrow"
      />
    </div>
  );
};

export default function CategorySlider({ items }) {
  const settings = {
    dots: false,
    infinite: false,
    speed: 2000,
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
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
    ],
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  return (
    <Slider {...settings}>
      {items?.map((item, index) => (
        <CategoryItem {...item} />
      ))}
    </Slider>
  );
}
