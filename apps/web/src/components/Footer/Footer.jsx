import React from "react";
import Image from "next/image";
import Link from "next/link";

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
            {/* <p className=" font-andika text-white font-semibold mb-[10px]">
              Subscribe
            </p> */}
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
            <p className=" font-andika font-andika text-white underline">
              <a href="mailto:cartshopping@gmail.com">cartshopping@gmail.com</a>
            </p>
            <p className=" font-andika font-andika text-white underline">
              <a
                href={"https://api.whatsapp.com/send?phone=1234567890"}
                target="_blank">
                Contact on Whatsapp
              </a>
            </p>
            <p className=" font-andika font-andika text-white">
              Nalbari, Assam, 781335.
            </p>
          </div>
        </div>

        {/* My accounts */}
        <div>
          <p className=" font-andika text-white text-xl font-bold mt-[24px] mb-[24px]">
            Account
          </p>
          <div className="font-andika flex flex-col gap-[16px]">
            <p className=" font-andika font-andika text-white">
              <Link href="/my-account">My Account</Link>
            </p>
            <p className=" font-andika font-andika text-white">
              <Link href="/auth/login">Login / Register</Link>
            </p>
            <p className=" font-andika font-andika text-white">
              <Link href="/cart">Cart</Link>
            </p>
            <p className=" font-andika font-andika text-white">
              <Link href="/wishlist">Wishlist</Link>
            </p>
          </div>
        </div>

        {/* quick links */}
        <div>
          <p className=" font-andika text-white text-xl font-bold mt-[24px] mb-[24px]">
            Quick Link
          </p>
          <div className="font-andika flex flex-col gap-[16px]">
            <p className=" font-andika font-andika text-white">
              <Link href={"/"}>Privacy Policy</Link>
            </p>
            <p className=" font-andika font-andika text-white">
              <Link href={"/"}>Terms Of Use</Link>
            </p>
            <p className=" font-andika font-andika text-white">
              <Link href={"/"}>Faq</Link>
            </p>
            <p className=" font-andika font-andika text-white">
              <Link href={"/"}>Contact</Link>
            </p>
          </div>
        </div>

        {/* credits links */}
        {/* <div>
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
            <p className="font-andika font-andika text-white">
              <a
                href="https://iconscout.com/icons/check"
                className="underline"
                target="_blank">
                check
              </a>{" "}
              by{" "}
              <a
                target="_blank"
                href="https://iconscout.com/contributors/google-inc"
                className="underline">
                Google Inc.
              </a>{" "}
              on{" "}
              <a
                target="_blank"
                href="https://iconscout.com"
                className="underline">
                IconScout
              </a>
            </p>
            <p className="font-andika font-andika text-white">
              <a
                href="https://iconscout.com/icons/cart"
                className="underline"
                target="_blank">
                Cart
              </a>{" "}
              by{" "}
              <a
                href="https://iconscout.com/contributors/google-inc"
                className="underline"
                target="_blank">
                Google Inc.
              </a>
            </p>
          </div>
        </div> */}
      </div>

      <div className="bg-[rgba(223,223,223,0.1)] mt-[3.5rem]  h-[1px] w-fill"></div>

      <div className="bg-black p-[1.5rem_0px] flex justify-center items-center pl-[3%] pr-[3%] lg:pl-[10%] lg:pr-[10%]">
        <span className="text-[#D9D9D9] text-center font-andika">
          © Copyright cartshopping.in {new Date().getFullYear()}. All right
          reserved
        </span>
      </div>
    </div>
  );
}

export default Footer;
