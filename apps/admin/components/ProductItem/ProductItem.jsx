import React from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { addCartProduct, removeCartProduct } from "@store/redux/cart";
import {
  addWishlistProduct,
  removeWishlistProduct,
} from "@store/redux/wishlist";

function ProductItem(item) {
  const {
    _id,
    title,
    imageUrl,
    originalPrice,
    discountedPrice,
    totalNumberOfRatings,
    wishlistItems,
    cartItems,

    isEyeVisible = true,
    isWishlistIconVisible = true,
    deleteCartIconVisible = false,
    deleteWishlistIconVisible = false,
  } = item;

  const dispatch = useDispatch();

  const discount = Math.floor(
    ((originalPrice - discountedPrice) / originalPrice) * 100
  );

  const handleVisitProduct = () => {
    navigator.push(`/product/${_id}`);
  };

  const handleAddToWishlist = () => {
    console.log(wishlistItems?.hasOwnProperty(item._id));
    if (wishlistItems?.hasOwnProperty(item._id)) {
      console.log(item._id);
      dispatch(removeWishlistProduct(item._id));
    } else {
      dispatch(addWishlistProduct(item));
    }
  };

  const handleAddToCart = () => {
    if (cartItems?.hasOwnProperty(item._id)) {
      dispatch(removeCartProduct(item._id));
    } else {
      dispatch(addCartProduct(item));
    }
  };

  const handleCartProductRemove = () => {
    dispatch(removeCartProduct(item._id));
  };

  const handleWishlistProductRemove = () => {
    dispatch(removeWishlistProduct(item._id));
  };

  return (
    <div className="w-full sm:w-[270px] group/product_item">
      {/* IMAGE SECTION */}
      <div className="relative rounded flex items-center justify-center w-full h-[200px] md:h-[250px] bg-[rgb(244,244,245)]">
        {/* DISCOUNT */}
        <div className="z-[999] h-8 absolute top-3 left-3 w-[80px] p-3 rounded bg-[#DB4444] flex items-center justify-center">
          <span className="text-white text-[15px]">{discount}%</span>
        </div>

        {/* ADD TO CART BUTTON */}
        <button
          disabled={cartItems?.hasOwnProperty(item._id)}
          className="overflow-hidden bottom-0 translate-y-[55px] transition duration-300 ease-in-out group-hover/product_item:block group-hover/product_item:translate-y-0 w-full cursor-pointer absolute z-[999] h-[48px] rounded-b bg-[rgba(0,0,0,0.7)] text-white"
          onClick={handleAddToCart}>
          {cartItems?.hasOwnProperty(item._id)
            ? "Item added to Cart"
            : "Add To Cart"}
        </button>

        <div className="cursor-pointer absolute top-3 right-3 z-[999] flex flex-col gap-2 items-center w-fit">
          {/* ADD TO WISHLIST */}
          {isWishlistIconVisible && (
            <div
              className="flex items-center justify-center p-1 bg-white rounded-full w-[40px] h-[40px] hover:scale-[1.18]"
              onClick={handleAddToWishlist}>
              <Image
                src={
                  wishlistItems?.hasOwnProperty(item._id)
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
              className="cursor-pointer flex items-center justify-center  p-1 bg-white rounded-full w-[40px] h-[40px] hover:scale-[1.18]"
              onClick={handleVisitProduct}>
              <Image
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
              className="cursor-pointer flex items-center justify-center  p-1 bg-white rounded-full w-[40px] h-[40px] hover:scale-[1.18]"
              onClick={handleCartProductRemove}>
              <Image
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
              className="cursor-pointer flex items-center justify-center  p-1 bg-white rounded-full w-[40px] h-[40px] hover:scale-[1.18]"
              onClick={handleWishlistProductRemove}>
              <Image
                src="/assets/delete.svg"
                width={17}
                height={17}
                alt="delete wishlist icon"
              />
            </div>
          )}
        </div>
        {/* PRODUCT IMAGE */}
        <div className="box-border p-5">
          <img
            className="object-scale-down mix-blend-multiply h-[200px] md:h-fit md:w-fit rounded aspect-sqaure"
            // src={imageUrl || "https://static-assets-web.flixcart.com/www/linchpin/batman-returns/images/fk-default-image-75ff340b.png?q=90"}
            src={
              "https://imgs.search.brave.com/rKZrmkTSLXfWaqAnvfSt_tW5IIPY3CC1G9d_ujAhEPo/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTM5/NTE5MTU4NC9waG90/by9ibHVldG9vdGgt/c3BlYWtlci1pc29s/YXRlZC1vbi13aGl0/ZS5qcGc_cz02MTJ4/NjEyJnc9MCZrPTIw/JmM9cFVhVWk1TVNq/SmJpbXdkXzBrQ2Nv/a1BlWHQ0WHlhQ3Qx/UnQ2S2h3ZXJzYz0"
            }
            alt={title}
          />
        </div>
      </div>
      {/* body section */}
      <div className="relative w-full flex flex-col min-[0px]:items-center gap-1 pt-[16px] pb-[16px] bg-white z-[999]">
        <span className="text-lg md:text-[19px] font-semibold font-andika">
          {title}
        </span>
        <div className="flex gap-[16px]">
          <span className="text-[#DB4444] text-[16px] md:text-[18px]">
            &#8377;{discountedPrice} INR
          </span>
          <span className="line-through text-[#000] text-[16px] md:text-[18px] opacity-[0.6]">
            &#8377;{originalPrice} INR
          </span>
        </div>
        <div className="flex items-center  gap-4">
          <div className="flex items-center gap-1 mt-[5px] h-full">
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
          <div className="flex items-center h-full">
            <span className="text-[#000] text-[18px] font-semibold opacity-[0.5]">
              ({totalNumberOfRatings})
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
