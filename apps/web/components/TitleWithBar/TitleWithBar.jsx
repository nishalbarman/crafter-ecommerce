import React from "react";
import Image from "next/image";

function TitleWithBar({ title }) {
  return (
    <div className="w-full flex gap-2 items-center ">
      <Image src="/assets/red_bar.svg" height={23} width={18} />
      <span className="text-[18px] text-[#DB4444] font-semibold">{title}</span>
    </div>
  );
}

export default TitleWithBar;
