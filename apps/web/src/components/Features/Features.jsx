"use client";

import React from "react";
import FeatureItem from "../Features/FeatureItem";

function Features() {
  const features = [
    {
      imageUrl: "/assets/services/car.svg",
      title: "FREE AND FAST DELIVERY",
      subtitle: "Free delivery for all products",
    },
    {
      imageUrl: "/assets/services/earphone.svg",
      title: "24/7 CUSTOMER SERVICE",
      subtitle: "Friendly 24/7 customer support",
    },
    {
      imageUrl: "/assets/services/garantee.svg",
      title: "MONEY BACK GUARANTEE",
      subtitle: "We reurn money within 30 days",
    },
  ];

  return (
    <div className="flex gap-5 w-fill justify-evenly flex-wrap max-[597px]:m-[20px_0px] mt-[10%] mb-[10%]">
      {features.map((item, index) => (
        <FeatureItem key={index} {...item} />
      ))}
    </div>
  );
}

export default Features;
