"use client";

import React from "react";
import { useSelector } from "react-redux";

import { useDeleteWishlistMutation } from "@store/redux/wishlist";
import ProductItem from "../../components/ProductItem/ProductItem";

function Wishlist() {
  const wishlist = useSelector((state) => state.wishlistLocal.wishlistItems);
  const wishlistCount = useSelector((state) => state.wishlistLocal.totalItems);

  const [
    removeOneWishlist,
    { isLoading: isLoadingRmWishlist, isError: isErrorRmWishlist },
  ] = useDeleteWishlistMutation();

  return (
    <>
      <div className="flex justify-between items-center">
        <p className="text-xl font-andika">Wishlist ({wishlistCount})</p>
        <button className="rounded-[4px] border-[1px] border-[black] h-[56px] w-[223px] p-[0px_5px]">
          Move All to Bag
        </button>
      </div>

      <div className="flex flex-wrap gap-5 items-center m-[40px_0]">
        {Object.values(wishlist)?.map((item) => {
          return (
            <ProductItem
              {...item}
              isEyeVisible={false}
              isWishlistIconVisible={false}
              deleteWishlistIconVisible={true}
              removeOneWishlist={removeOneWishlist}
            />
          );
        })}
      </div>
    </>
  );
}

export default Wishlist;
