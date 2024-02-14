"use client";

import React from "react";
import ProductItem from "../ProductItem/ProductItem";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

import {
  useAddWishlistMutation,
  useDeleteWishlistMutation,
} from "@store/redux/wishlist";

import {
  useAddOneToCartMutation,
  useDeleteCartMutation,
} from "@store/redux/cart";

function AllProducts({ exploreProductData }) {
  const navigator = useRouter();

  const wishlistItems = useSelector(
    (state) => state.wishlistLocal.wishlistItems
  );
  const cartItems = useSelector((state) => state.cartLocal.cartItems);

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
    <div className="grid grid-cols-2 gap-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 justify-center min-md:gap-4 items-stretch">
      {exploreProductData?.map((item, index) => (
        <div
          className="w-full h-fit flex flex-row justify-center p-1"
          onClick={() => {
            navigator.push("/products/" + item._id);
          }}
          key={index}>
          <ProductItem
            {...item}
            wishlistItems={wishlistItems}
            cartItems={cartItems}
            addNewWishlist={addNewWishlist}
            removeOneWishlist={removeOneWishlist}
            addOneToCart={addOneToCart}
            removeOneFromCart={removeOneFromCart}
          />
        </div>
      ))}
    </div>
  );
}

export default AllProducts;
