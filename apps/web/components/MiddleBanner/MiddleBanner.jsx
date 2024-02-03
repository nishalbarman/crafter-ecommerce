import React from "react";

function MiddleBanner() {
  return (
    <div className="rounded-md flex-col-reverse min-[500px]:flex-row flex max-w-full max-[390px]:aspect-[3/2.2] max-[400px]:pb-5 max-[390px]:h-fit max-[390px]:p-[5%] aspect-video lg:aspect-[3/1] xl:aspect-[3/1.6] 2xl:aspect-[3/1] bg-black mt-[4rem] mb-[6rem]">
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
          src="https://s3-alpha-sig.figma.com/img/3cc9/43ca/7e210f637fc0504b7d93cd207df744c2?Expires=1707696000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=kg3LsEhpMU~bOkeux378uaOnUMbfcW~urJWena3967ZvcIQjLl1BIb58riokShWyGHxhEJAR4G8yqb4Mlwxgm3nJctphOHNFYezj05wo1w3xF~AMdDLzKuBhBZNFxYLBd44d2vy~g-x2VYLanN-CAhegiwOsWN~CvcRP-UErS1alcCaJNO02zPCWgklOUCLqroqjTP2ETmPdJAdjaPoTokcquPoIO8e7rtkqhrq6l4jEKw4fmMAJSyjjZFLQGTe6ltLVNPkdnsTjZpLWi~Rp3nvS8FBkylZA8FfmQZFXiuvtRVUUgA5GHfjKV1RQwmIkNiOCNsH2YISU7bcShmAEFw__"
        />
      </div>
    </div>
  );
}

export default MiddleBanner;
