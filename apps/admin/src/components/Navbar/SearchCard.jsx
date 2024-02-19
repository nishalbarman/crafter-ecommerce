import React from "react";
import MyAccount from "./MyAccount";
import { useNavigate } from "react-router-dom";

function SearchCard({ cartTotal, wishlistTotal }) {
  const navigator = useNavigate();

  return (
    <>
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

      <div
        onClick={() => {
          navigator("/wishlist");
        }}
        className="h-fit w-fit relative cursor-pointer">
        {wishlistTotal != 0 && (
          <div
            className={`box-content absolute z-[1] flex items-center justify-center aspect-square right-[-5px] rounded-full p-1 absolute bottom-5 bg-[#DB4444] min-w-4 min-h-4`}>
            <span className="text-[10px] text-white font-semibold">
              {wishlistTotal}
            </span>
          </div>
        )}
        <Image src="/assets/love.svg" alt="love logo" width={31} height={31} />
      </div>

      <div
        onClick={() => {
          navigator("/cart");
        }}
        className="h-fit w-fit relative cursor-pointer">
        {cartTotal != 0 && (
          <div
            className={`box-content absolute z-[1] flex items-center justify-center  aspect-square right-[-5px] rounded-full p-1 absolute bottom-5 bg-[#DB4444] min-w-4 min-h-4`}>
            <span className="text-[10px] text-white font-semibold">
              {cartTotal}
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

      <div className="h-fit w-fit relative group mb-[8px]">
        <Image
          className="cursor-pointer transform translate-y-[0.14rem]"
          src="/assets/user.svg"
          alt="user logo"
          width={35}
          height={35}
        />
        <div className="absolute top-6 pt-2 right-[-15px] z-[999] ease-linear duration-300 group-hover:flex hidden">
          <div className="bg-black opacity-[0.8] rounded-[5px]">
            <MyAccount />
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchCard;
