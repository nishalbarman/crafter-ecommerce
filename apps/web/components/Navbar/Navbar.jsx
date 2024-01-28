import Image from "next/image";
import Link from "next/link";
import React from "react";
import MyAccount from "./MyAccount";

function Navbar({ title }) {
  const links = [
    {
      title: "Home",
      description: "Home page that I am currently on!",
      path: "/",
    },
    {
      title: "Contact",
      description: "Contact us page",
      path: "/",
    },
    {
      title: "About",
      description: "About Us page",
      path: "/",
    },
    {
      title: "Sign Up",
      description: "SignUp page",
      path: "/",
    },
  ];

  const cartTotal = 10;

  return (
    <div className="flex w-full border-[rgb(0,0,0,0.1)] border-b-[1px] justify-between h-[80px] bg-white lg:pl-[10%] lg:pr-[10%] pl-[3%] pr-[3%]">
      <div className="flex flex-center items-center w-fit">
        <span className="permanent-marker-font text-2xl uppercase font-bold text-black dark:text-white">
          {title}
        </span>
      </div>
      <div className="hidden min-[1168px]:flex flex-center gap-5 items-center">
        {links.map((item, index) => {
          return (
            <Link key={index} className="text-xl font-marker" href={item.path}>
              {item.title}
            </Link>
          );
        })}
      </div>
      <div className="flex items-center justify-center gap-5 h-[100%]">
        {/* search bar with icon */}
        <div className="hidden lg:flex items-center justify-center h-[42px] w-fit bg-[#F5F4F4] rounded-[4px]">
          <input
            className="flex items-center placeholder:text-sm h-full w-full border-none outline-none rounded-[4px] bg-[#F5F4F4] p-4"
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

        <div className="h-fit w-fit relative cursor-pointer">
          <div
            className={`box-content absolute z-10 flex items-center justify-center aspect-square right-[-5px] rounded-full p-1 absolute bottom-5 bg-[#DB4444]`}>
            <span className="text-[10px] text-white font-semibold">
              {cartTotal}
            </span>
          </div>
          <Image
            src="/assets/love.svg"
            alt="love logo"
            width={31}
            height={31}
          />
        </div>

        <div className="h-fit w-fit relative cursor-pointer">
          <div
            className={`box-content absolute z-10 flex items-center justify-center  aspect-square right-[-5px] rounded-full p-1 absolute bottom-5 bg-[#DB4444]`}>
            <span className="text-[10px] text-white font-semibold">
              {cartTotal}
            </span>
          </div>
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
            className="cursor-pointer transform translate-y-[0.4px]"
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
      </div>
    </div>
  );
}

export default Navbar;
