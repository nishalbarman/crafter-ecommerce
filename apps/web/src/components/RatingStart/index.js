"use client";

import Image from "next/image";
import React from "react";

function RateStar({ stars = 0 }) {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) =>
        index + 1 <= stars ? (
          <Image
            src={"/assets/star-filled.svg"}
            width={20}
            height={20}
            alt="star icon"
          />
        ) : (
          <Image
            src={"/assets/star.svg"}
            width={20}
            height={20}
            alt="star icon"
          />
        )
      )}
    </>
  );
}

export default RateStar;
