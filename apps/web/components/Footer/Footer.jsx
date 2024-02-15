import React from "react";
import Image from "next/image";

function Footer() {
  ("Is it a server component or client component!");

  return (
    <div className="bg-black ">
      <div className="flex flex-wrap justify-between gap-5 w-[100%] bg-black p-10 pl-[5%] pr-[5%] lg:pl-[10%] lg:pr-[10%]">
        {/* Exclusive */}
        <div>
          <p className=" font-andika text-white text-xl font-bold mt-[24px] mb-[24px]">
            Exclusive
          </p>
          <div className="flex flex-col gap-4">
            <p className=" font-andika text-white font-semibold mb-[10px]">
              Subscribe
            </p>
            <p className=" font-andika text-white text-sm">
              Get 10% of your first order
            </p>
            <div className="flex items-center pr-[15px] justify-between gap-1 w-full h-[45px] border-white border rounded-lg">
              <input
                placeholder="Enter your email"
                className="outline-none border-none pl-[15px] rounded-lg bg-[black] h-full w-fill placeholder:text-[#D9D9D9] text-white"
              />
              <Image
                src="/assets/right-triangle.svg"
                width={20}
                height={20}
                alt="right arrow"
              />
            </div>
          </div>
        </div>

        {/* Supports */}
        <div>
          <p className=" font-andika text-white text-xl font-bold mt-[24px] mb-[24px]">
            Support
          </p>
          <div className="font-andika flex flex-col gap-[16px]">
            <p className=" font-andika font-andika text-white">
              111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.
            </p>
            <p className=" font-andika font-andika text-white">
              exclusive@gmail.com
            </p>
            <p className=" font-andika font-andika text-white">
              +88015-88888-9999
            </p>
          </div>
        </div>

        {/* My accounts */}
        <div>
          <p className=" font-andika text-white text-xl font-bold mt-[24px] mb-[24px]">
            Account
          </p>
          <div className="font-andika flex flex-col gap-[16px]">
            <p className=" font-andika font-andika text-white">My Account</p>
            <p className=" font-andika font-andika text-white">
              Login / Register
            </p>
            <p className=" font-andika font-andika text-white">Cart</p>
            <p className=" font-andika font-andika text-white">Wishlist</p>
          </div>
        </div>

        {/* quick links */}
        <div>
          <p className=" font-andika text-white text-xl font-bold mt-[24px] mb-[24px]">
            Quick Link
          </p>
          <div className="font-andika flex flex-col gap-[16px]">
            <p className=" font-andika font-andika text-white">
              Privacy Policy
            </p>
            <p className=" font-andika font-andika text-white">Terms Of Use</p>
            <p className=" font-andika font-andika text-white">Faq</p>
            <p className=" font-andika font-andika text-white">Contact</p>
          </div>
        </div>

        {/* credits links */}
        <div>
          <p className=" font-andika text-white text-xl font-bold mt-[24px] mb-[24px]">
            Credits
          </p>
          <div className="font-andika flex flex-col gap-[16px]">
            <a
              className="font-andika font-andika text-white"
              target="_blank"
              href="https://www.flaticon.com/free-icons/tick"
              title="tick icons">
              Vectors Market - Flaticon
            </a>
          </div>
        </div>
      </div>

      <div className="bg-[rgba(223,223,223,0.1)] mt-[3.5rem]  h-[1px] w-fill"></div>

      <div className="bg-black p-[1.5rem_0px] flex justify-center items-center pl-[3%] pr-[3%] lg:pl-[10%] lg:pr-[10%]">
        <span className="text-[#D9D9D9] text-center font-andika">
          © Copyright Crafter.In 2024. All right reserved
        </span>
      </div>
    </div>
  );
}

export default Footer;
