"use client";

import React, { useEffect, useState, useRef } from "react";
import Slider from "react-slick";
import { useRouter } from "next/navigation";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./Carousel.module.css";
// import { updateBanner } from "@store/redux"
import axios from "axios";

const CustomPrevArrow = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="absolute flex items-center justify-center text-white rounded-sm bg-[rgba(0,0,0,0.4)] backdrop-blur-[10px] flex items-center justify-center left-0 scale-[2] top-[50%] transform translate-y-[-50%] cursor-pointer z-10 font-marker p-1">
      {"<"}
    </div>
  );
};

const CustomNextArrow = ({ className, style, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="absolute flex items-center justify-center text-white rounded-sm bg-[rgba(0,0,0,0.4)] backdrop-blur-[10px] flex items-center justify-center right-0 scale-[2] top-[50%] transform translate-y-[-50%] cursor-pointer z-10 font-marker p-1">
      {">"}
    </div>
  );
};

const Carousel = ({ items = [] }) => {
  const sliderRef = useRef();
  const settings = {
    dots: true,
    // fade: true,
    draggable: false, // Disable dragging
    swipeToSlide: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    cssEase: "linear",
    // speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768, // Adjust as needed
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  const [bannerItems, setBannerItems] = useState(items);

  const navigator = useRouter();

  useEffect(() => {
    if (
      items &&
      (items[0]?.bgColor === undefined || items[0]?.bgColor === null)
    ) {
      const calculateAverageColor = async () => {
        const itemsWithBGColorPromises = items.map(async (item) => {
          const response = await axios.post(`/api/v1/get-image-color`, {
            imageUrl: `${item.imageUrl}`,
          });

          const { averageColor } = await response.data;

          return { ...item, bgColor: `rgba(${averageColor}, 0.8)` };
        });

        const itemsWithColors = await Promise.all(itemsWithBGColorPromises);

        setBannerItems(itemsWithColors);
        // dispatch(updateBanner(itemsWithColors));
      };

      calculateAverageColor();
    }
  }, [items]);

  return (
    <Slider {...settings} ref={sliderRef}>
      {bannerItems?.map((item, index) => (
        <div
          onClick={() => {
            navigator.push(item.link);
          }}
          style={{
            backgroundColor: item.bgColor,
          }}
          className={`group/banner cursor-pointer h-fit aspect-video md:aspect-[3/1.2] lg:aspect-[3/1.2] rounded-md w-full h-full outline-none border-none peer-focus-visible:border-none peer-focus-visible:outline-none`}
          key={index}>
          <div
            className="cursor-pointer h-fit aspect-video md:aspect-[3/1.2] lg:aspect-[3/1.2] rounded-md w-full h-full outline-none border-none peer-focus-visible:border-none peer-focus-visible:outline-none"
            style={{
              backgroundColor: item.bgColor,
            }}>
            <img
              style={{
                backgroundColor: item.bgColor,
                backdropFilter: "blur(15px)",
              }}
              className={`${styles.image} group-hover/banner:flex object-contain gradient-ring w-full h-full md:aspect-video rounded-md aspect-video`}
              src={item.imageUrl}
              title={item.title}
              aria-description={item.description}
              alt={item.altText}
            />
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default Carousel;
