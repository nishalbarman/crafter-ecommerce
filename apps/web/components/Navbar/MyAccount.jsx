import Image from "next/image";
import Link from "next/link";
import React from "react";

function MyAccount() {
  return (
    <div className="flex h-fit flex-col gap-5 p-[18px_12px_18px_20px] text-white w-[250px] justify-center items-center text-md bg-[rgba(0,0,0,0.2)] backdrop-blur">
      <div className="flex gap-1 items-center gap-4 w-[100%] cursor-pointer">
        <div className="h-fit w-fit">
          <Image
            src="/assets/user1.svg"
            alt="user logo"
            width={38}
            height={38}
          />
        </div>
        <Link href={"/"} className="text-white">
          Manage My Account
        </Link>
      </div>
      <div className="flex gap-1 items-center gap-4 w-[100%]  cursor-pointer">
        <div className="h-fit w-fit">
          <Image src="/assets/bag.svg" alt="bag logo" width={30} height={30} />
        </div>
        <Link href={"/"} className="text-white">
          Manage Orders
        </Link>
      </div>
      <div className="flex gap-1 items-center gap-4 w-[100%] cursor-pointer">
        <div className="h-fit w-fit">
          <Image
            src="/assets/cancel.svg"
            alt="cancel logo"
            width={30}
            height={30}
          />
        </div>
        <Link href={"/"} className="text-white">
          My Cancelations
        </Link>
      </div>
      <div className="flex gap-1 items-center gap-4 w-[100%] cursor-pointer">
        <div className="h-fit w-fit">
          <Image
            src="/assets/review.svg"
            alt="review logo"
            width={32}
            height={32}
          />
        </div>
        <Link href={"/"} className="text-white">
          My Reviews
        </Link>
      </div>
      <div className="flex gap-1 items-center gap-4 w-[100%] cursor-pointer">
        <div className="h-fit w-fit">
          <Image
            src="/assets/logout.svg"
            alt="logout logo"
            width={32}
            height={32}
          />
        </div>
        <Link href={"/logout"} className="text-white">
          Logout
        </Link>
      </div>
    </div>
  );
}

export default MyAccount;
