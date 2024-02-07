"use client";

import Image from "next/image";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CategoryItem from "./CategoryItem";

const CustomPrevArrow = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="absolute top-[-65px] md:top-[-75px] right-[102px] flex items-center justify-center text-white rounded-full h-[25px] w-[25px] bg-[#F5F5F5] backdrop-blur-[10px] flex items-center justify-center scale-[1.8] md:scale-[2] cursor-pointer z-10">
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
      className="absolute top-[-65px] md:top-[-75px] right-10 flex items-center justify-center text-white rounded-full h-[25px] w-[25px] bg-[#F5F5F5] backdrop-blur-[10px] flex items-center justify-center scale-[1.8] md:scale-[2] cursor-pointer z-10">
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
      {items?.map((item, index) => (
        <div
          className="w-full h-fit flex flex-row justify-center p-1"
          //   onClick={() => {
          //     navigator.push(item.path);
          //   }}
          key={index}>
          <CategoryItem {...item} />
        </div>
      ))}
    </Slider>
  );
}
