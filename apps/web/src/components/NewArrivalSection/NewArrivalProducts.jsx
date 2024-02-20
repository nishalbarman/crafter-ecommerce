import Link from "next/link";
import React from "react";

function NewArrivalProducts() {
  return (
    <div className="grid text-white grid-rows-2 grid-col-8 grid-flow-row gap-2 grid-cols-4 h-[600px]">
      <div
        style={{
          background: "url(/assets/playstation.png)",
          backgroundPosition: "bottom",
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          backgroundColor: "black",
          backgroundClip: "border-box",
          padding: "10px",
        }}
        className="relative rounded-lg row-start-1 row-end-3 max-xl:row-end-2 col-start-1 col-end-3 bg-[black]">
        <div className="absolute bottom-0 m-5 ">
          <p className="text-xl font-semibold font-andika text-white">
            Playstation 5
          </p>
          <p className="mt-2 mb-2 text-[#D9D9D9] font-andika">
            Black and White version of the PS5 coming out on sale.{" "}
          </p>
          <Link
            className="text-white text-md underline underline-offset-2 font-andika"
            href="">
            Shop Now
          </Link>
        </div>
      </div>
      <div
        style={{
          background: "url(/assets/women.png)",
          backgroundPosition: "right",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundColor: "black",
        }}
        className="relative rounded-lg row-start-1 row-end-2 col-start-3 col-end-5 bg-[black]">
        <div className="absolute bottom-0 m-5">
          <p className="text-xl font-semibold font-andika text-white">
            Playstation 5
          </p>
          <p className="mt-2 mb-2 text-[#D9D9D9] font-andika">
            Black and White version of the PS5 coming out on sale.{" "}
          </p>
          <Link
            className="text-white text-md underline underline-offset-2 font-andika"
            href="">
            Shop Now
          </Link>
        </div>
      </div>
      <div
        style={{
          background: "url(/assets/speaker.svg)",
          backgroundPosition: "center",
          backgroundSize: "60%",
          backgroundRepeat: "no-repeat",
          backgroundColor: "black",
        }}
        className="relative rounded-lg row-start-2 col-start-3 max-xl:col-start-1 max-xl:col-end-3 bg-[black]">
        <div className="absolute bottom-0 m-5">
          <p className="text-xl font-semibold font-andika text-white">
            Playstation 5
          </p>
          <p className="mt-2 mb-2 text-[#D9D9D9] font-andika">
            Black and White version of the PS5 coming out on sale.{" "}
          </p>
          <Link
            className="text-white text-md underline underline-offset-2 font-andika"
            href="">
            Shop Now
          </Link>
        </div>
      </div>
      <div
        style={{
          background: "url(/assets/perfume.svg)",
          backgroundPosition: "center",
          backgroundSize: "60%",
          backgroundRepeat: "no-repeat",
          backgroundColor: "black",
        }}
        className="relative rounded-lg row-start-2 col-start-4 max-xl:col-start-3 max-xl:col-end-5 bg-[black]">
        <div className="absolute bottom-0 m-5">
          <p className="text-xl font-semibold font-andika text-white">
            Playstation 5
          </p>
          <p className="mt-2 mb-2 text-[#D9D9D9] font-andika">
            Black and White version of the PS5 coming out on sale.{" "}
          </p>
          <Link
            className="text-white text-md underline underline-offset-2 font-andika"
            href="">
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NewArrivalProducts;
