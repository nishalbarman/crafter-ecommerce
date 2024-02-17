import Image from "next/image";
import Link from "next/link";
import React from "react";

function MyAccount() {
  return (
    <div className="flex h-fit flex-col gap-1 p-[18px_12px_18px_12px] text-white w-[250px] justify-center items-center text-md bg-[rgba(0,0,0,0.2)] backdrop-blur">
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
  );
}

export default MyAccount;
