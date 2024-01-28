import React, { useEffect, useRef } from "react";
import Slider from "react-slick";
import { useRouter } from "next/navigation";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch } from "react-redux";
import axios from "axios";

import ProductItem from "../ProductItem/ProductItem";
import Image from "next/image";

// const CustomPrevArrow = ({ className, style, onClick }) => {
//   return (
//     <div
//       onClick={onClick}
//       className="absolute top-[-75px] right-[102px] flex items-center justify-center text-white rounded-sm p-3 h-[5px] w-[5px] bg-[rgba(0,0,0,0.4)] backdrop-blur-[10px] flex items-center justify-center scale-[1.8] md:scale-[2] cursor-pointer z-10">
//       {"<"}
//     </div>
//   );
// };

// const CustomNextArrow = ({ className, style, onClick }) => {
//   return (
//     <div
//       onClick={onClick}
//       className="absolute top-[-75px] right-10 flex items-center justify-center text-white rounded-sm p-3 h-[5px] w-[5px] bg-[rgba(0,0,0,0.4)] backdrop-blur-[10px] flex items-center justify-center scale-[1.8] md:scale-[2] cursor-pointer z-10">
//       {">"}
//     </div>
//   );
// };

const CustomPrevArrow = ({ className, style, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="absolute flex items-center justify-center text-white rounded-full h-[25px] w-[25px] bg-[#F5F5F5] backdrop-blur-[10px] flex items-center justify-center left-0 scale-[2] top-[40%] transform translate-y-[-50%] cursor-pointer z-10">
      <Image src={"/assets/leftarrow.svg"} width={10} height={10} />
    </div>
  );
};

const CustomNextArrow = ({ className, style, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="absolute flex items-center justify-center text-white rounded-full h-[25px] w-[25px] bg-[#F5F5F5] backdrop-blur-[10px] flex items-center justify-center right-0 scale-[2] top-[40%] transform translate-y-[-50%] cursor-pointer z-10">
      <Image src={"/assets/rightarrow.svg"} width={10} height={10} />
    </div>
  );
};

const ProductSlider = ({ items }) => {
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
          slidesToShow: 5,
          slidesToScroll: 5,
        },
      },
      {
        breakpoint: 1700, // Adjust as needed
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 1364, // Adjust as needed
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 883, // Adjust as needed
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 528, // Adjust as needed
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
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
          onClick={() => {
            navigator.push(item.path);
          }}
          key={index}>
          <ProductItem {...item} />
        </div>
      ))}
    </Slider>
  );
};

export default ProductSlider;
