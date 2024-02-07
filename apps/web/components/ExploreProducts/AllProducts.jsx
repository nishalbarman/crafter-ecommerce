"use client";

import React from "react";
import ProductItem from "../ProductItem/ProductItem";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

function AllProducts({ exploreProductData }) {
  const navigator = useRouter();

  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);
  const cartItems = useSelector((state) => state.cart.cartItems);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 justify-center gap-4 items-stretch">
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
          />
        </div>
      ))}
    </div>
  );
}

export default AllProducts;
