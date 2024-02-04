import React from "react";
import Image from "next/image";

function FeatureItem({ imageUrl, title, subtitle }) {
  return (
    <div className="flex flex-col gap-2 items-center m-2">
      <div className="flex justify-center items-center w-[75px] h-[75px] p-[8px] rounded-full bg-[#c1c1d0] mb-5">
        <div className="flex justify-center items-center rounded-full h-[100%] w-[100%] bg-[black]">
          <Image src={imageUrl} width={30} height={30} alt={title}/>
        </div>
      </div>
      <p className="text-xl font-bold uppercase font-andika">{title}</p>
      <p className="text-lg normal-case font-andika">{subtitle}</p>
    </div>
  );
}

export default FeatureItem;
