import React from "react";
import Link from "next/link";
import { fetchCart } from "@/lib/cart";
import { fetchWishlist } from "@/lib/wishlist";
import { cookies } from "next/headers";
import Image from "next/image";
import ClientWishlistIcon from "./ClientWishlistIcon";
import ClientCartIcon from "./ClientCartIcon";

async function Navbar({ title }) {
  const links = [
    {
      title: "Home",
      description: "Home screen, explore products",
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

  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  return (
    <div className="flex w-full border-[rgb(0,0,0,0.1)] border-b-[1px] justify-between h-[80px] bg-white lg:pl-[10%] lg:pr-[10%] pl-[3%] pr-[3%]">
      <div className="flex flex-center items-center w-fit">
        <span className="max-sm:font-inconsolata font-marker text-2xl uppercase font-bold text-black">
          <Link
            className="max-sm:font-inconsolata font-marker text-2xl uppercase font-bold text-black"
            href={"/"}>
            {title}
          </Link>
        </span>
      </div>
      {/* <div className="hidden min-[1168px]:flex flex-center gap-5 items-center">
        {links.map((item, index) => {
          return (
            <Link key={index} className="text-xl font-marker" href={item.path}>
              {item.title}
            </Link>
          );
        })}
      </div> */}
      <div className="flex items-center justify-center gap-5 h-[100%]">
        {token ? (
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

            <ClientWishlistIcon />

            <ClientCartIcon />

            <div className="h-fit w-fit relative group mb-[8px]">
              <Image
                className="cursor-pointer transform translate-y-[0.14rem]"
                src="/assets/user.svg"
                alt="user logo"
                width={35}
                height={35}
              />
              <div className="absolute top-6 pt-2 right-[-15px] z-[999] ease-linear duration-300 group-hover:flex hidden rounded-lg">
                <div className="bg-black opacity-[0.8] rounded-lg">
                  <div className="flex h-fit flex-col gap-1 p-[18px_12px_18px_12px] text-white w-[250px] justify-center items-center text-md bg-[rgba(0,0,0,0.2)] backdrop-blur rounded-lg">
                    <div className="flex gap-1 items-center gap-4 w-[100%] cursor-pointer">
                      <Link
                        className="hover:bg-[rgb(200,200,200,0.2)] p-[10px_7px] backdrop-blur-0 flex gap-4 items-center text-white w-[100%] rounded-md"
                        href={"/myaccount"}>
                        <div className="h-fit w-fit">
                          <Image
                            src="/assets/user2.svg"
                            alt="user logo"
                            width={30}
                            height={30}
                          />
                        </div>
                        Manage My Account
                      </Link>
                    </div>
                    <div className="flex gap-1 items-center gap-4 w-[100%]  cursor-pointer">
                      <Link
                        className="hover:bg-[rgb(200,200,200,0.2)] p-[10px_7px] backdrop-blur-0 flex gap-4 items-center text-white w-[100%] rounded-md"
                        href={"/myorders"}>
                        <div className="h-fit w-fit">
                          <Image
                            src="/assets/bag.svg"
                            alt="bag logo"
                            width={30}
                            height={30}
                          />
                        </div>
                        Manage Orders
                      </Link>
                    </div>
                    <div className="flex gap-1 items-center gap-4 w-[100%] cursor-pointer">
                      <Link
                        className="hover:bg-[rgb(200,200,200,0.2)] p-[10px_7px] backdrop-blur-0 flex gap-4 items-center text-white w-[100%] rounded-md"
                        href={"/mycancelations"}>
                        <div className="h-fit w-fit">
                          <Image
                            src="/assets/cancel.svg"
                            alt="cancel logo"
                            width={30}
                            height={30}
                          />
                        </div>
                        My Cancelations
                      </Link>
                    </div>
                    <div className="flex gap-1 items-center gap-4 w-[100%] cursor-pointer">
                      <Link
                        className="hover:bg-[rgb(200,200,200,0.2)] p-[10px_7px] backdrop-blur-0 flex gap-4 items-center text-white w-[100%] rounded-md"
                        href={"/myreviews"}>
                        <div className="h-fit w-fit">
                          <Image
                            src="/assets/review.svg"
                            alt="review logo"
                            width={32}
                            height={32}
                          />
                        </div>
                        My Reviews
                      </Link>
                    </div>
                    <div className="flex items-center gap-4 w-[100%] cursor-pointer">
                      <Link
                        className="hover:bg-[rgb(200,200,200,0.2)] p-[10px_7px] backdrop-blur-0 flex gap-4 items-center text-white w-[100%] rounded-md"
                        href={"/logout"}>
                        <div className="h-fit w-fit">
                          <Image
                            src="/assets/logout.svg"
                            alt="logout logo"
                            width={32}
                            height={32}
                          />
                        </div>
                        Logout
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
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
                <Link
                  className="underline align-center text-md font-semibold"
                  href={"/auth/login"}>
                  Login / Signup
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
