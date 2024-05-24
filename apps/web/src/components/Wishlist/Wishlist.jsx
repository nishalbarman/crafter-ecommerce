"use client";

import React from "react";
import { useSelector } from "react-redux";

import { useDeleteWishlistMutation } from "@store/redux";
import { useAddOneToCartMutation, useDeleteCartMutation } from "@store/redux";

import ProductItem from "../../components/ProductItem/ProductItem";
import Link from "next/link";
import Image from "next/image";

function Wishlist() {
  const wishlist = useSelector((state) => state.wishlistSlice.wishlistItems);
  const wishlistCount = useSelector((state) => state.wishlistSlice.totalItems);

  const [
    removeOneWishlist, { isLoading: isLoadingRmWishlist, isError: isErrorRmWishlist },
  ] = useDeleteWishlistMutation();

  const [addOneToCart, { isLoading: isCartLoading, isError: isCartError }] =
    useAddOneToCartMutation();

  return (
    <>
      {/* empty wishlist display */}
      {wishlistCount <= 0 && (
        <div className="flex flex-col justify-center items-center gap-[10px] mt-[40px]">
          <Image
            draggable={false}
            className="m-auto w-[300px] select-none user-drag-none"
            src="/assets/empty-cart.svg"
            width={500}
            height={500}
            alt="empty-bag"
            style={{ margin: "auto" }}
          />
          <p className="text-[18px] text-[rgb(0,0,0,0.8)] text-center">
            Nothing in wishlist
          </p>
          <Link
            className="p-[12px_20px] border-[2opx] border-[black] inline-block mt-[15px] text-[white] mb-[20px] font-bold text-center bg-[rgb(219,68,68)] rounded"
            href="/products">
            Continue Shopping
          </Link>
        </div>
      )}

      {wishlistCount > 0 && (
        <div className="flex justify-between items-center">
          <p className="text-xl font-andika">Wishlist ({wishlistCount})</p>
          <button className="rounded-[4px] border-[1px] border-[black] h-[45px] p-[0px_20px]">
            Move All to Bag
          </button>
        </div>
      )}

      {wishlistCount > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl-grid-cols-6 gap-5 items-center m-[40px_0] w-[100%] z-1">
          {Object.values(wishlist)?.map((item) => {
            return (
              <div className="min-md:w-[250px]">
                <ProductItem
                  {...item}
                  wishlistItems={wishlist}
                  isEyeVisible={false}
                  isWishlistIconVisible={false}
                  deleteWishlistIconVisible={true}
                  removeOneWishlist={removeOneWishlist}
                  addOneToCart={addOneToCart}
                  addToCartText="Move to Cart"
                />
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

export default Wishlist;
