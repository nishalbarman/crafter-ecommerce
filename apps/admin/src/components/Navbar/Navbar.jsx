import React from "react";
import SearchCartWishlist from "./SearchCartWishlist";
import { Link } from "react-router-dom";

function Navbar({ title = "Crafter Admin" }) {
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
      <div className="hidden min-[1168px]:flex flex-center gap-5 items-center">
        {links.map((item, index) => {
          return (
            <Link key={index} className="text-xl font-marker" href={item.path}>
              {item.title}
            </Link>
          );
        })}
      </div>
      <SearchCartWishlist />
    </div>
  );
}

export default Navbar;
