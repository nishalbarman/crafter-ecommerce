import React from "react";
import Image from "next/image";
import Link from "next/link";

function CategoryItem({ categoryImageUrl, categoryName, categoryKey }) {
  return (
    <div className="relative transition duration-150 ease group/category rounded-md flex flex-col justify-center items-center gap-4 border-solid border-[1px] border-[rgba(0,0,0,0.2)] mr-3 ml-3 h-[145px] bg-white max-[553px]:w-[96%] max-[597px]:h-[120px]">
      {/* <div className="transition duration-300 ease  translate-y-[-150px] group-hover/category:translate-y-0 backdrop-blur-[2px] absolute flex items-center justify-center w-[100%] h-[100%] bg-[rgba(0,0,0,0.6)] max-[597px]:hidden">
        <Link
          href={categoryKey}
          className="text-white hover:underline underline-offset-1">
          Visit
        </Link>
      </div> */}
      <Image
        src={categoryImageUrl}
        className="select-none max-[597px]:h-[40px]"
        width={50}
        height={50}
        alt={categoryName}
      />
      <Link
        href={categoryKey}
        className="group-hover/category:underline hidden text-black underline underline-offset-1 max-[597px]:inline">
        {categoryName}
      </Link>
      <Link href={categoryKey}>
        <span className="max-[597px]:hidden group-hover/category:underline inline block font-andika text-black">
          {categoryName}
        </span>
      </Link>
    </div>
  );
}

export default CategoryItem;
