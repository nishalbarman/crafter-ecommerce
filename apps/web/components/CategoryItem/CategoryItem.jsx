import React from "react";
import Image from "next/image";
import Link from "next/link";

function CategoryItem({ imageUrl, title, path }) {
  return (
    <div className="transition duration-150 ease group/category rounded-md relative flex flex-col justify-center items-center gap-4 border-solid border-[1px] border-[rgba(0,0,0,0.2)] max-w-[100%] mr-3 ml-3 h-[145px]">
      <div className="transition duration-150 ease scale-0 rounded-full group-hover/category:rounded-none group-hover/category:flex z=[999] group-hover/category:scale-[1]  backdrop-blur-[2px] absolute flex items-center justify-center w-[100%] h-[100%] bg-[rgba(0,0,0,0.6)]">
        <Link
          href={path}
          className="text-white hover:underline underline-offset-1">
          Visit
        </Link>
      </div>
      <Image src={imageUrl} className="select-none" width={50} height={50} />
      <span className="block font-andika text">{title}</span>
    </div>
  );
}

export default CategoryItem;
