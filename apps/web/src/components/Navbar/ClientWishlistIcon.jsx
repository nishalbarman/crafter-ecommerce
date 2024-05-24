"use client";

import { updateWishlist, useGetWishlistQuery } from "@store/redux";
import { useCookies } from "next-client-cookies";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

function ClientWishlistIcon() {
  const cookieStore = useCookies();
  const token = cookieStore.get("token");

  const dispatch = useDispatch();

  const { data: userWishlistItems } = useGetWishlistQuery();

  useEffect(() => {
    if (token && userWishlistItems?.length > 0) {
      const wishlistData = {};

      userWishlistItems?.forEach((item) => {
        wishlistData[item.product._id] = {
          ...item.product, // to fix the override _id issue we should place this line in 2nd place
          ...item, //will override the previouse product _id
          _id: item.product._id, // we can also manually add the _id field to fix the issue
          wishlistId: item._id,
          product: null,
        };
      });
      dispatch(
        updateWishlist({
          totalCount: data.length || 0,
          wishlists: wishlistData,
        })
      );
    }
  }, [userWishlistItems]);

  return (
    <Link href={"/wishlist"}>
      <div className="h-fit w-fit relative cursor-pointer">
        {userWishlistItems?.length && (
          <div
            className={`box-content absolute z-[1] flex items-center justify-center aspect-square right-[-5px] rounded-full p-1 absolute bottom-5 bg-[#DB4444] min-w-4 min-h-4`}>
            <span className="text-[10px] text-white font-semibold">
              {userWishlistItems?.length || 0}
            </span>
          </div>
        )}
        <Image src="/assets/love.svg" alt="love logo" width={31} height={31} />
      </div>
    </Link>
  );
}

export default ClientWishlistIcon;
