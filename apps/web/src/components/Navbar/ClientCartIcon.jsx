"use client";

import { updateCart, useGetCartQuery } from "@store/redux";
import { useCookies } from "next-client-cookies";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

function ClientCartIcon() {
  const cookieStore = useCookies();
  const token = cookieStore.get("token");

  const dispatch = useDispatch();

  const { data: userCartItems } = useGetCartQuery();

  useEffect(() => {
    if (userCartItems?.length > 0 && token) {
      const cartDataForStore = {};

      userCartItems?.forEach((item) => {
        cartDataForStore[item.product._id] = {
          ...item.product, // to fix the override _id issue we should place this line in 2nd place
          ...item, //will override the previouse product _id
          _id: item.product._id, // we can also manually add the _id field to fix the issue
          cartId: item._id,
          product: null,
        };
      });

      dispatch(
        updateCart({
          totalCount: cartData.length || 0,
          cartItems: cartDataForStore,
        })
      );
    }
  }, [userCartItems]);

  return (
    <Link href="/cart">
      <div className="h-fit w-fit relative cursor-pointer">
        {userCartItems?.length && (
          <div
            className={`box-content absolute z-[1] flex items-center justify-center  aspect-square right-[-5px] rounded-full p-1 absolute bottom-5 bg-[#DB4444] min-w-4 min-h-4`}>
            <span className="text-[10px] text-white font-semibold">
              {userCartItems?.length}
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
    </Link>
  );
}

export default ClientCartIcon;
