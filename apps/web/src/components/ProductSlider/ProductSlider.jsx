"use client";

import React from "react";
import Slider from "react-slick";
import { useRouter } from "next/navigation";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSelector } from "react-redux";

import ProductItem from "../ProductItem/ProductItem";
import Image from "next/image";

import {
  useAddWishlistMutation,
  useDeleteWishlistMutation,
} from "@store/redux";

import { useAddOneToCartMutation, useDeleteCartMutation } from "@store/redux";

const CustomPrevArrow = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="absolute flex items-center justify-center text-white rounded-full h-[25px] w-[25px] bg-[#F5F5F5] backdrop-blur-[10px] flex items-center justify-center left-0 scale-[2] top-[40%] transform translate-y-[-50%] cursor-pointer z-10 max-[597px]:w-4 max-[597px]:h-4 hover:invert group/rightarrow shadow">
      <Image
        className="group-hover/rightarrow:invert-1 max-[597px]:w-2 max-[597px]:h-2"
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
      className="absolute flex items-center justify-center text-white rounded-full h-[25px] w-[25px] bg-[#F5F5F5] backdrop-blur-[10px] flex items-center justify-center right-0 scale-[2] top-[40%] transform translate-y-[-50%] cursor-pointer z-10 max-[597px]:w-4 max-[597px]:h-4 hover:invert group/rightarrow shadow">
      <Image
        className="group-hover/rightarrow:invert-1 max-[597px]:w-2 max-[597px]:h-2"
        src={"/assets/rightarrow.svg"}
        width={10}
        height={10}
        alt="right arrow"
      />
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
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  const navigator = useRouter();

  const wishlistItems = useSelector((state) => state.wishlistSlice?.wishlists);
  console.log(wishlistItems);

  const cartItems = useSelector((state) => state.cartSlice?.cart);

  const [addNewWishlist, { isLoading, isError }] = useAddWishlistMutation();
  const [
    removeOneWishlist,
    { isLoading: isLoadingRmWishlist, isError: isErrorRmWishlist },
  ] = useDeleteWishlistMutation();

  const [addOneToCart, { isLoading: isCartLoading, isError: isCartError }] =
    useAddOneToCartMutation();
  const [
    removeOneFromCart,
    { isLoading: isCartRemoveLoading, isError: isCartRemoveError },
  ] = useDeleteCartMutation();

  return (
    <Slider {...settings}>
      {items?.map((item, index) => (
        <div
          className="w-full h-fit flex flex-row justify-center p-1"
          key={index}>
          <ProductItem
            productDetails={{ ...item }}
            options={{
              isRatingVisible: false,
              isEyeVisible: true,
              isWishlistIconVisible: true,
              deleteCartIconVisible: false,
              deleteWishlistIconVisible: false,
            }}
          />
        </div>
      ))}
    </Slider>
  );
};

export default ProductSlider;
