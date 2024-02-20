import React from "react";

function MiddleBanner() {
  return (
    <div className="rounded-md flex-col-reverse aspect-none h-fit min-[500px]:flex-row flex max-w-full max-[390px]:aspect-[3/2.2] max-[400px]:pb-5 max-[390px]:h-fit max-[390px]:p-[5%] aspect-video lg:aspect-[3/1] xl:aspect-[3/1.6] 2xl:aspect-[3/1] bg-black m-[11%_0]">
      <div className="flex flex-col gap-[6%] items-center min-[500px]:items-start justify-center w-full sm:w-[80%] h-full min-[500px]:pl-[6%]">
        <p className="font-semibold xl:text-lg text-[#0F6] font-andika">
          Categories
        </p>
        <p className="text-white max-[390px]:text-center text-[20px] sm:text-[20px] md:text-[28px] lg:text-[28px] xl:text-[50px]">
          Enhance Your Music Experience
        </p>
        <button className="h-[45px] w-[200px] xl:h-[60px] xl:w-[250px] mt-3 xl:mt-[15px] rounded-md bg-[#0F6] text-black">
          Buy Now
        </button>
      </div>
      <div className="flex items-center justify-center w-[100%] h-full">
        <img
          className="w-full h-full object-contain"
          src="https://www.boat-lifestyle.com/cdn/shop/products/main2_1_3b4cc1b8-e1ed-4809-9ded-38355df461a1.png?v=1651596525"
        />
      </div>
    </div>
  );
}

export default MiddleBanner;
