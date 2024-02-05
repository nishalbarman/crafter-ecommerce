"use client";

import { Provider } from "react-redux";
import { store } from "@store/redux";
import Image from "next/image";

import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";
import Link from "next/link";

export default function Page() {
  return (
    <Provider store={store}>
      <Navbar title={"Crafter"} logo={""} />
      <main className="flex m-[20px_0] sm:items-center min-h-[80vh] ml-[3%] mr-[3%] lg:ml-[10%] lg:mr-[10%]">
        <div className="grid grid-col-1 md:grid-cols-3 h-fill w-[100%] justify-center">
          {/* <div className="bg-[#CBE4E8] bg-[url(/assets/cart_mobile.png)] bg-no-repeat bg-contain h-[100%]"></div> */}
          <div className="flex flex-col col-start-1  md:col-start-2 gap-[20px]">
            <h3 className="text-3xl font-semibold font-andika">
              Login to Crafter
            </h3>
            <p className="text-xl font-andika">Enter your details below</p>
            <div className="flex flex-col gap-[40px] mt-[20px]">
              <input
                className="h-[32px] text-black text-lg font-andika placeholder:text-[#989998] outline-none border-[#818081] border-b-[1px] focus:border-b-[black] transition duration-150 p-[0px_5px] pl-0"
                type="email"
                placeholder="Email or Phone Number"
                name="email"
              />
              <input
                className="h-[32px] text-black text-lg font-andika placeholder:text-[#989998] outline-none border-[#818081] border-b-[1px] focus:border-b-[black] transition duration-150 p-[0px_5px] pl-0"
                type="password"
                placeholder="Password"
                name="password"
              />
              <button className="h-[56px] font-andika bg-[#DA4544] text-white text-lg p-[0px_15px] rounded-[5px]">
                Log In
              </button>
              <button className="flex items-center gap-2 justify-center h-[56px] font-andika text-black text-lg p-[0px_15px] rounded-[5px] bg-white border-[2px] border-[#98998] mt-[-15px]">
                <Image src="/assets/google.svg" width={20} height={20} />
                Sign in with Google
              </button>
              <div className="mt-[8px] flex justify-center gap-3">
                <span className="text-lg">
                  Forgot password?{" "}
                  <Link
                    className="text-md font-andika font-semibold underline"
                    href={"/auth/login"}>
                    Reset
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </Provider>
  );
}
