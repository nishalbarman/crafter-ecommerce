"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import MyAccount from "./MyAccount";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useCookies } from "next-client-cookies";

import { useGetWishlistQuery } from "@store/redux/wishlist";
import { updateWishlist } from "@store/redux/wishlistLocal";

import { useGetCartQuery } from "@store/redux/cart";
import { updateCart } from "@store/redux/cartLocal";

export default function SearchCartWishlist() {
  const navigator = useRouter();

  const cookieStore = useCookies();

  const token = cookieStore?.get("token") || null;
  console.log("Client side token---->", token);

  if (!token) {
    return (
      <>
        <div className="flex items-center justify-center gap-5 h-[100%]">
          {/* search bar with icon */}
          <div className="hidden lg:flex items-center justify-center h-[42px] w-fit bg-[#F5F4F4] rounded-[4px]">
            <input
              className="font-andika tracking-[1px] flex items-center placeholder:text-sm h-full w-full border-none outline-none rounded-[4px] bg-[#F5F4F4] p-4"
              type="text"
              name="search-text"
              placeholder="What are you looking for?"
            />
            <div className="h-[25px] w-[25px] mr-3 flex items-center">
              <Image
                src="/assets/search.svg"
                alt="search logo"
                width={27}
                height={27}
              />
            </div>
          </div>

          <div className="h-[100%] w-fit relative group flex items-center">
            <button
              onClick={() => {
                navigator.push("/auth/login");
              }}
              className="focus:bg-[gray] p-[8px_40px] bg-[rgb(219,68,68)] rounded-md text-white font-semibold">
              Login
            </button>
          </div>
        </div>
      </>
    );
  }

  const { data, isError, isLoading } = useGetWishlistQuery();
  const {
    data: cartData,
    isError: isCartError,
    isLoading: isCartLoading,
  } = useGetCartQuery();

  const dispatch = useDispatch();

  const wishlistTotal = useSelector((state) => state.wishlistLocal.totalItems);
  const cartTotal = useSelector((state) => state.cartLocal.totalItems);

  // console.log(wishlistTotal, cartTotal);

  useEffect(() => {
    if (!isError && data?.length > 0) {
      const wishlistData = {};
      data?.forEach((item) => {
        wishlistData[item.product._id] = item.product;
      });
      dispatch(
        updateWishlist({
          totalCount: data.length || 0,
          wishlists: wishlistData,
        })
      );
    }
  }, [data]);

  useEffect(() => {
    if (!isCartError && cartData?.length > 0) {
      const cartDataForStore = {};
      cartData?.forEach((item) => {
        cartDataForStore[item.product._id] = item.product;
      });
      console.log(cartData);
      dispatch(
        updateCart({
          totalCount: cartData.length || 0,
          cartItems: cartDataForStore,
        })
      );
    }
  }, [cartData]);

  return (
    <div className="flex items-center justify-center gap-5 h-[100%]">
      {/* search bar with icon */}
      <div className="hidden lg:flex items-center justify-center h-[42px] w-fit bg-[#F5F4F4] rounded-[4px]">
        <input
          className="font-andika tracking-[1px] flex items-center placeholder:text-sm h-full w-full border-none outline-none rounded-[4px] bg-[#F5F4F4] p-4"
          type="text"
          name="search-text"
          placeholder="What are you looking for?"
        />
        <div className="h-[25px] w-[25px] mr-3 flex items-center">
          <Image
            src="/assets/search.svg"
            alt="search logo"
            width={27}
            height={27}
          />
        </div>
      </div>

      <div
        onClick={() => {
          navigator.push("/wishlist");
        }}
        className="h-fit w-fit relative cursor-pointer">
        {wishlistTotal != 0 && (
          <div
            className={`box-content absolute z-10 flex items-center justify-center aspect-square right-[-5px] rounded-full p-1 absolute bottom-5 bg-[#DB4444] min-w-4 min-h-4`}>
            <span className="text-[10px] text-white font-semibold">
              {wishlistTotal}
            </span>
          </div>
        )}
        <Image src="/assets/love.svg" alt="love logo" width={31} height={31} />
      </div>

      <div
        onClick={() => {
          navigator.push("/cart");
        }}
        className="h-fit w-fit relative cursor-pointer">
        {cartTotal != 0 && (
          <div
            className={`box-content absolute z-10 flex items-center justify-center  aspect-square right-[-5px] rounded-full p-1 absolute bottom-5 bg-[#DB4444] min-w-4 min-h-4`}>
            <span className="text-[10px] text-white font-semibold">
              {cartTotal}
            </span>
          </div>
        )}
        <Image
          className="transform translate-y-[1px] cursor-pointer"
          src="/assets/cart.svg"
          alt="cart logo"
          width={28.5}
          height={28.5}
        />
      </div>

      <div className="h-fit w-fit relative group mb-[8px]">
        <Image
          className="cursor-pointer transform translate-y-[0.14rem]"
          src="/assets/user.svg"
          alt="user logo"
          width={35}
          height={35}
        />
        <div className="absolute top-6 pt-2 right-[-15px] z-[999] ease-linear duration-300 group-hover:flex hidden">
          <div className="bg-black opacity-[0.8] rounded-[5px]">
            <MyAccount />
          </div>
        </div>
      </div>
    </div>
  );
}
