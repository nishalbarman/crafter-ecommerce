"use client";

import React from "react";
import { useSelector } from "react-redux";

import { useDeleteWishlistMutation } from "@store/redux/wishlist";
import {
  useAddOneToCartMutation,
  useDeleteCartMutation,
} from "@store/redux/cart";

import ProductItem from "../../components/ProductItem/ProductItem";

function Wishlist() {
  const wishlist = useSelector((state) => state.wishlistLocal.wishlistItems);
  const wishlistCount = useSelector((state) => state.wishlistLocal.totalItems);

  const [
    removeOneWishlist,
    { isLoading: isLoadingRmWishlist, isError: isErrorRmWishlist },
  ] = useDeleteWishlistMutation();

  const [addOneToCart, { isLoading: isCartLoading, isError: isCartError }] =
    useAddOneToCartMutation();

  return (
    <>
      <div className="flex justify-between items-center">
        <p className="text-xl font-andika">Wishlist ({wishlistCount})</p>
        <button className="rounded-[4px] border-[1px] border-[black] h-[45px] p-[0px_20px]">
          Move All to Bag
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl-grid-cols-6 gap-5 items-center m-[40px_0] w-[100%]">
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
    </>
  );
}

export default Wishlist;
