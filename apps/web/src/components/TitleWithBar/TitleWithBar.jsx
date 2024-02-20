import React from "react";
import Image from "next/image";

function TitleWithBar({ title }) {
  return (
    <div className="w-full flex gap-2 items-center mb-7 max-[597px]:mb-[13px]">
      <Image
        className="max-[597px]:w-3 h-[23px] "
        src="/assets/red_bar.svg"
        height={23}
        width={13}
        alt="red bar"
      />
      <span className="text-[18px] text-[#DB4444] font-semibold max-[597px]:text-[18px]">
        {title}
      </span>
    </div>
  );
}

export default TitleWithBar;
