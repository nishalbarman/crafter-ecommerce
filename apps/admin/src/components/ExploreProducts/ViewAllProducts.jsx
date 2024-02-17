"use client";

import { useRouter } from "next/navigation";
import React from "react";

function ViewAllProducts() {
  const navigation = useRouter();

  return (
    <div className="flex items-center justify-center pt-10">
      <button
        className="pt-3 pb-3 pl-8 pr-8 text-sm md:pt-4 md:pb-4 md:pl-8 md:pr-8 rounded-lg bg-[#DB4444] text-white font-semibold font-andika cursor-poiner hover:scale-[1.05] max-sm:mt-[-15px] max-sm:p-[10px_30px]"
        onClick={() => {
          navigation.push("/explore");
        }}>
        Visit All Products
      </button>
    </div>
  );
}

export default ViewAllProducts;
