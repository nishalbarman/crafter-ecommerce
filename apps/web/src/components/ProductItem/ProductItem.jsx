import React from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useCookies } from "next-client-cookies";
import toast from "react-hot-toast";

import { addCartProduct, removeCartProduct } from "@store/redux/cartLocal";
import {
  addWishlistProduct,
  removeWishlistProduct,
} from "@store/redux/wishlistLocal";

function ProductItem(item) {
  const {
    _id,
    _cartProductId,
    previewUrl,
    title,
    category,
    discountedPrice,
    originalPrice,
    showPictures,
    description,
    stars,
    totalFeedbacks,
    shippingPrice,
    availableStocks,
    isSizeVaries,
    isColorVaries,
    availableSizes,
    availableColors,
    quantity,
    size,
    color,

    wishlistItems,
    cartItems,
    addNewWishlist,
    removeOneWishlist,
    addOneToCart,
    removeOneFromCart,

    isEyeVisible = true,
    isWishlistIconVisible = true,
    deleteCartIconVisible = false,
    deleteWishlistIconVisible = false,

    addToCartText = "Add To Cart",
  } = item;

  const dispatch = useDispatch();
  const navigator = useRouter();
  const cookiesStore = useCookies();
  const token = cookiesStore?.get("token") || null;

  const discount = Math.floor(
    ((originalPrice - discountedPrice) / originalPrice) * 100
  );

  const handleVisitProduct = (e) => {
    e.stopPropagation();
    navigator.push(`/product/${_id}`);
  };

  const handleAddToWishlist = (e) => {
    e.stopPropagation();
    if (!token) {
      return toast.success("You need to be logged in first.");
    }
    if (wishlistItems?.hasOwnProperty(_id)) {
      removeOneWishlist(_id);
      dispatch(removeWishlistProduct(_id));
    } else {
      addNewWishlist(_id);
      dispatch(
        addWishlistProduct({
          _id,
          _cartProductId,
          previewUrl,
          title,
          category,
          discountedPrice,
          originalPrice,
          showPictures,
          description,
          stars,
          totalFeedbacks,
          shippingPrice,
          availableStocks,
          isSizeVaries,
          isColorVaries,
          availableSizes,
          availableColors,
          quantity,
          size,
          color,
        })
      );
      if (cartItems?.hasOwnProperty(_id)) {
        removeOneFromCart(_id);
        dispatch(removeCartProduct(_id));
      }
    }
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (!token) {
      return toast.success("You need to be logged in first.");
    }
    if (cartItems?.hasOwnProperty(_id)) {
      removeOneFromCart(_id);
      dispatch(removeCartProduct(_id));
    } else {
      addOneToCart(_id);
      dispatch(
        addCartProduct({
          _id,
          _cartProductId,
          previewUrl,
          title,
          category,
          discountedPrice,
          originalPrice,
          showPictures,
          description,
          stars,
          totalFeedbacks,
          shippingPrice,
          availableStocks,
          isSizeVaries,
          isColorVaries,
          availableSizes,
          availableColors,
          quantity,
          size,
          color,
        })
      );

      if (wishlistItems?.hasOwnProperty(_id)) {
        removeOneWishlist(_id);
        dispatch(removeWishlistProduct(_id));
      }
    }
  };

  const handleCartProductRemove = (e) => {
    e.stopPropagation();
    if (!token) {
      return toast.success("You need to be logged in first.");
    }
    removeOneFromCart(_id);
    dispatch(removeCartProduct(_id));
  };

  const handleWishlistProductRemove = (e) => {
    e.stopPropagation();
    if (!token) {
      return toast.success("You need to be logged in first.");
    }
    removeOneWishlist(_id);
    dispatch(removeWishlistProduct(_id));
  };

  return (
    <div className="w-fill group/product_item">
      {/* IMAGE SECTION */}
      <div className="relative rounded flex items-center justify-center w-full h-[200px] md:h-[250px] bg-[rgb(244,244,245)]">
        {/* DISCOUNT */}
        {!!originalPrice && (
          <div className="z-[999] absolute top-3 left-3 w-[80px] rounded bg-[#DB4444] flex items-center justify-center max-[591px]:w-[60px] p-[3px_5px]">
            <span className="text-white text-[14px] max-[591px]:text-[12px] ">
              {discount}%
            </span>
          </div>
        )}

        {/* ADD TO CART BUTTON */}
        {!deleteCartIconVisible && (
          <button
            disabled={cartItems?.hasOwnProperty(_id)}
            className="w-[100%] justify-center items-center overflow-hidden bottom-0 translate-y-[55px] transition duration-300 ease-in-out min-[593px]:group-hover/product_item:flex min-[593px]:group-hover/product_item:translate-y-0 cursor-pointer absolute z-[1] max-sm:h-[40px] max-sm:text-[15px] flex items-center justify-center h-[48px] rounded-b bg-[rgba(0,0,0,0.7)] text-white "
            onClick={handleAddToCart}>
            {cartItems?.hasOwnProperty(_id) ? (
              <Image
                className="invert"
                src={"/assets/check.svg"}
                width={20}
                height={20}
              />
            ) : (
              <Image
                className="invert"
                src={"/assets/addcart.svg"}
                width={25}
                height={30}
              />
            )}
          </button>
        )}
        {/* addToCartText */}

        <div className="cursor-pointer absolute top-3 right-3 z-[999] flex flex-col gap-2 items-center w-fit">
          {/* ADD TO WISHLIST */}
          {isWishlistIconVisible && (
            <div
              className="flex items-center justify-center p-1 bg-white rounded-full w-[40px] h-[40px] hover:scale-[1.18] max-[597px]:w-[33px] max-[597px]:h-[33px] group-wishlist hover:invert shadow"
              onClick={handleAddToWishlist}>
              <Image
                className="group-hover/wishlist:invert-1 max-[597px]:w-[29px] max-[597px]:h-[29px]"
                src={
                  wishlistItems?.hasOwnProperty(_id)
                    ? "/assets/love-filled.svg"
                    : "/assets/love.svg"
                }
                width={29}
                height={29}
                alt={"wishlist icon"}
              />
            </div>
          )}

          {/* VIEW PRODUCT INFORMATION */}
          {isEyeVisible && (
            <div
              className="cursor-pointer flex items-center justify-center  p-1 bg-white rounded-full w-[40px] h-[40px] hover:scale-[1.18] max-[597px]:w-8 max-[597px]:h-8 group-viewproduct hover:invert shadow"
              onClick={handleVisitProduct}>
              <Image
                className="group-hover/viewproduct:invert-1 max-[597px]:w-5 max-[597px]:h-5"
                src="/assets/eye.svg"
                width={23}
                height={23}
                alt="eye icon"
              />
            </div>
          )}

          {/* DELETE ICON CART */}
          {deleteCartIconVisible && (
            <div
              className="cursor-pointer flex items-center justify-center  p-1 bg-white rounded-full w-[40px] h-[40px] hover:scale-[1.18] group-deletecart hover:invert shadow"
              onClick={handleCartProductRemove}>
              <Image
                className="group-hover/deletecart:invert"
                src="/assets/delete.svg"
                width={17}
                height={17}
                alt="delete cart icon"
              />
            </div>
          )}

          {/* DELETE ICON WISHLIST */}
          {deleteWishlistIconVisible && (
            <div
              className="cursor-pointer flex items-center justify-center  p-1 bg-white rounded-full w-[40px] h-[40px] hover:scale-[1.18] group-deletewishlist hover:invert shadow"
              onClick={handleWishlistProductRemove}>
              <Image
                className="group-hover/deletewishlist:invert-1"
                src="/assets/delete.svg"
                width={17}
                height={17}
                alt="delete wishlist icon"
              />
            </div>
          )}

          {/* ADD TO CART BUTTON
          {!deleteCartIconVisible && (
            <div
              className="max-[591px]:flex cursor-pointer hidden items-center justify-center p-1 bg-white rounded-full w-[40px] h-[40px] hover:scale-[1.18]"
              onClick={handleAddToCart}>
              {cartItems?.hasOwnProperty(_id) ? (
                <Image src={"/assets/addcart.svg"} width={22} height={22} />
              ) : (
                <Image
                  src="/assets/add_to_cart_icon.svg"
                  width={21}
                  height={21}
                  alt="add to cart icon"
                />
              )}
            </div>
          )} */}
        </div>

        {/* PRODUCT IMAGE */}
        {/* <div className="box-border p-5"> */}
        <div className="box-border p-0 h-[100%] w-[100%]">
          {/* <img
            className="object-scale-down mix-blend-multiply h-[200px] md:h-fit md:w-fit rounded aspect-sqaure"
            src={previewUrl}
            alt={title}
          /> */}
          <img
            className="object-cover mix-blend-multiply h-[100%] w-[100%] rounded aspect-sqaure"
            src={previewUrl}
            alt={title}
          />
        </div>
      </div>
      {/* body section */}
      <div className="relative w-[100%] flex flex-col items-left md:items-center gap-1 pt-[16px] pb-[16px] bg-white z-[999] overflow-hidden">
        <span className="text-lg md:text-[19px] font-semibold">{title}</span>
        <div className="flex gap-[16px] justify-left md:justify-center w-[100%]">
          <span className="text-[#DB4444] text-[16px] md:text-[18px]">
            &#8377;{discountedPrice} INR
          </span>
          {!!originalPrice && (
            <span className="line-through text-[#000] text-[16px] md:text-[18px] opacity-[0.6]">
              &#8377;{originalPrice} INR
            </span>
          )}
        </div>
        <div className="flex justify-left md:justify-center gap-4 w-[100%] overflow-hidden">
          <div className="flex items-center gap-1 mt-[5px] h-full w-fit">
            <Image
              src={"/assets/star-filled.svg"}
              width={20}
              height={20}
              alt="star icon"
            />
            <Image
              src={"/assets/star-filled.svg"}
              width={20}
              height={20}
              alt="star icon"
            />
            <Image
              src={"/assets/star-filled.svg"}
              width={20}
              height={20}
              alt="star icon"
            />
            <Image
              src={"/assets/star-filled.svg"}
              width={20}
              height={20}
              alt="star icon"
            />
            <Image
              src={"/assets/star.svg"}
              width={20}
              height={20}
              alt="star icon"
            />
            <Image
              src={"/assets/star.svg"}
              width={20}
              height={20}
              alt="star icon"
            />
            <Image
              src={"/assets/star.svg"}
              width={20}
              height={20}
              alt="star icon"
            />
          </div>
          <div className="flex items-center h-full max-sm:hidden">
            <span className="text-[#000] text-[18px] font-semibold opacity-[0.5]">
              ({totalFeedbacks})
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
