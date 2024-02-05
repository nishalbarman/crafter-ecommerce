import Image from "next/image";
import React from "react";

function MyAccount() {
  return (
    <div className="flex h-fit flex-col gap-5 p-[18px_12px_18px_20px] text-white w-[250px] justify-center items-center text-md bg-[rgba(0,0,0,0.2)] backdrop-blur">
      <div className="flex gap-1 items-center gap-4 w-[100%] cursor-pointer">
        <div className="h-fit w-fit">
          <Image src="/assets/user1.svg" alt="user logo" width={38} height={38} />
        </div>
        <span className="text-white">Manage My Account</span>
      </div>
      <div className="flex gap-1 items-center gap-4 w-[100%]  cursor-pointer">
        <div className="h-fit w-fit">
          <Image src="/assets/bag.svg" alt="bag logo" width={30} height={30} />
        </div>
        <span className="text-white">Manage Orders</span>
      </div>
      <div className="flex gap-1 items-center gap-4 w-[100%] cursor-pointer">
        <div className="h-fit w-fit">
          <Image src="/assets/cancel.svg" alt="cancel logo" width={30} height={30} />
        </div>
        <span className="text-white">My Cancelations</span>
      </div>
      <div className="flex gap-1 items-center gap-4 w-[100%] cursor-pointer">
        <div className="h-fit w-fit">
          <Image src="/assets/review.svg" alt="review logo" width={32} height={32} />
        </div>
        <span className="text-white">My Reviews</span>
      </div>
      <div className="flex gap-1 items-center gap-4 w-[100%] cursor-pointer">
        <div className="h-fit w-fit">
          <Image src="/assets/logout.svg" alt="logout logo" width={32} height={32} />
        </div>
        <span className="text-white">Logout</span>
      </div>
    </div>
  );
}

export default MyAccount;
