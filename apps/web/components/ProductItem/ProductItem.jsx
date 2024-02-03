import React from "react";
import Image from "next/image";

function ProductItem(item) {
  const {
    _id,
    title,
    imageUrl,
    originalPrice,
    discountedPrice,
    totalNumberOfRatings,
  } = item;

  const handleVisitProduct = () => {
    navigator.push(`/product/${_id}`);
  };

  const handleAddToWishlist = () => {
    alert("Item added to wishlist!");
    dispatch(addToCart(item));
  };

  const handleAddToCart = () => {
    alert("Item added to cart!");
    dispatch(addToCart(item));
  };

  return (
    <div className="w-full sm:w-[270px] group/product_item">
      {/* image section */}
      <div className="relative rounded flex items-center justify-center w-full h-[200px] md:h-[250px] bg-[rgb(244,244,245)]">
        <div className="h-8 absolute top-3 left-3 w-[80px] p-3 rounded bg-[#DB4444] flex items-center justify-center">
          <span className="text-white text-[15px]">-15%</span>
        </div>
        <button
          className="overflow-hidden bottom-0 translate-y-[55px] transition duration-300 ease-in-out group-hover/product_item:block group-hover/product_item:translate-y-0 w-full cursor-pointer absolute z-[999] h-[48px] rounded-b bg-[rgba(0,0,0,0.7)] text-white"
          onClick={handleAddToCart}>
          Add To Cart
        </button>
        {/* </div> */}
        <div className="cursor-pointer absolute top-3 right-3 z-[999] flex flex-col gap-2 items-center w-fit">
          <div
            className="flex items-center justify-center p-1 bg-white rounded-full w-[40px] h-[40px] hover:scale-[1.18]"
            onClick={handleAddToWishlist}>
            <Image src="/assets/love.svg" width={29} height={29} />
          </div>
          <div
            className="cursor-pointer flex items-center justify-center  p-1 bg-white rounded-full w-[40px] h-[40px] hover:scale-[1.18]"
            onClick={handleVisitProduct}>
            <Image src="/assets/eye.svg" width={23} height={23} />
          </div>
        </div>
        <div className="box-border p-5">
          <img
            className="object-contain mix-blend-multiply h-[200px] md:h-fit md:w-fit rounded aspect-sqaure"
            src={imageUrl}
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
            <Image src={"/assets/star-filled.svg"} width={20} height={20} />
            <Image src={"/assets/star-filled.svg"} width={20} height={20} />
            <Image src={"/assets/star-filled.svg"} width={20} height={20} />
            <Image src={"/assets/star-filled.svg"} width={20} height={20} />
            <Image src={"/assets/star.svg"} width={20} height={20} />
            <Image src={"/assets/star.svg"} width={20} height={20} />
            <Image src={"/assets/star.svg"} width={20} height={20} />
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
