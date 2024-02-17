import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useNavigate } from "react-router-dom";

import { useGetWishlistQuery } from "@store/redux/wishlist";
import { useGetCartQuery } from "@store/redux/cart";

import SearchCard from "./SearchCard";
import axios from "axios";

export default function SearchCartWishlist() {
  const navigator = useNavigate();

  const cookieStore = useCookies();

  const token = cookieStore?.get("token") || null;

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
                navigator("/auth/login");
              }}
              className="focus:bg-[gray] p-[8px_40px] bg-[rgb(219,68,68)] rounded-md text-white font-semibold">
              Login
            </button>
          </div>
        </div>
      </>
    );
  }

  const getCartData = async () => {
    try {
      const response = await axios.get(`/api/v1/cart`);
      setCartData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getWishlistData = async () => {
    try {
      const response = await axios.get(`/api/v1/wishlist`);
      setWishlistData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [cartData, setCartData] = useState([]);
  const [data, setWishlistData] = useState([]);

  // const { data, isError, isLoading } = useGetWishlistQuery();
  // const {
  //   data: cartData,
  //   isError: isCartError,
  //   isLoading: isCartLoading,
  // } = useGetCartQuery();

  const dispatch = useDispatch();

  useEffect(() => {
    if (data?.length > 0) {
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
    if (cartData?.length > 0) {
      const cartDataForStore = {};
      cartData?.forEach((item) => {
        cartDataForStore[item.product._id] = {
          ...item.product, // to fix the override _id issue we should place this line in 2nd place
          ...item, //will override the previouse product _id
          _id: item.product._id, // we can also manually add the _id field to fix the issue
          _cartProductId: item._id,
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
  }, [cartData]);

  useEffect(() => {
    getCartData();
    getWishlistData();
  }, []);

  return (
    <div className="flex items-center justify-center gap-5 h-[100%]">
      <SearchCard />
    </div>
  );
}