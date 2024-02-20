"use client";

import React from "react";
import TitleWithBar from "../TitleWithBar/TitleWithBar";
import { useRouter } from "next/navigation";
import NewArrivalProducts from "./NewArrivalProducts";

function NewArrivalSection() {
  const flashSaleProducts = [
    {
      title: "HAVIT HV-G92 Gamepad",
      originalPrice: 120,
      discountedPrice: 60,
      imageUrl:
        "https://s3-alpha-sig.figma.com/img/5d5c/2e52/50752d55f8b60f2aa2923183dadbc135?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Jm4FizuRBm9yRM44XP5syZYsGJ5H-khmmgjp9nGugg5KThB4b8nQLZwNVUiDlF9PGOip5rf22mil8a74HPRBtKt6CcrgFBAraCzuagMRZtWw50nv0NFQGq~N2hVrq4BhdFi8G2WHWPC1XR1gwumhlTJd92fKIRl-jdmOKhVYD~ZXIjuWon8Q6R9~~-QWgMOUjiTxKQLzps8jX9jkUoidLf12XHbyRe7gg8oi6xK4vJI2vbrarx3MC5kmBNvzOtFySB6R71scdXlnvRGhqvNPwZjpwT6sp~20FA-TQ9d3tb0Re1WpmlSlX2hgfH3zWPe5knKu~fqrLi3xqaRlC~FpQw__",
      totalNumberOfRatings: 88,
      rating: 5,
    },
    {
      title: "AK-900 Wired Keyboard",
      originalPrice: 65,
      discountedPrice: 10,
      imageUrl:
        "https://s3-alpha-sig.figma.com/img/e59d/9f34/8cc24eeff489863523b63971c3ff8e4a?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=pkS0Fjkyo3qutdpGQbWBrNmMbMG6S8sBK5aQJg96FZnXZnjiDnf3ZLSIZmiheaT5dOHp-baEatT82TR5ON5M7TU05cF9sC194Y3CE~GOB-k5s4dq2KsvpgT~NSZGVVSIUDzr6SYGpnOLxiHXFzxT0giIrcHrbauxD2nMywLD5RTb-lkjZHj2dZCuALwo9xL-UqZEIENuqfbSNPMARl0zoVVQg~AQ23O63QvliTxMSQDxsAetFq0MV-2-wkUyE2t-oVZpZcAu~MNqH9dyJYnI2VPp2v9va5Hu0agY5oWvjhBTRM0bX9GVrsJn1Ug4wnEx-VM4VcshefTc21M37JEUYQ__",
      totalNumberOfRatings: 50,
      rating: 4,
    },
    {
      title: "IPS LCD Gaming Monitor",
      originalPrice: 370,
      discountedPrice: 400,
      imageUrl:
        "https://s3-alpha-sig.figma.com/img/5e63/4682/db5174aff99bb9337d2dc9598a0b44e4?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=SkO4U6vo6BKPPyINEU9WpZbF1lRk3WuhFCmfCyBJyyIbFYsF0JBvVtLjk8od2~~cmu~xpeeK6WsdSKEwi7QpVzV1Fcct3QoooQRjkaCb7IRmWqP3m0OuR4~aQRmfOLDFSbq8Cl25vXBp1sXs8wR9SpaFCZZn7NJAgJwWJ84BHsGE5FO4OW0teqbtnhpxfTz6QE69u4pF5N4XLVN4uKeegb-Pg0ZSYZ9XVAKSCcZk5NhxZQB70LHdBdiq3fYCakRAEr8tRPEnVaNkkktP7~5mL720o~BOT8uDbisjEfdBV7j0pC-yyydzRmZY2QLoG--2fqi043g1P6V9AGaZIYBzUQ__",
      totalNumberOfRatings: 100,
      rating: 5,
    },
    {
      title: "HAVIT HV-G92 Gamepad",
      originalPrice: 120,
      discountedPrice: 60,
      imageUrl:
        "https://s3-alpha-sig.figma.com/img/5d5c/2e52/50752d55f8b60f2aa2923183dadbc135?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Jm4FizuRBm9yRM44XP5syZYsGJ5H-khmmgjp9nGugg5KThB4b8nQLZwNVUiDlF9PGOip5rf22mil8a74HPRBtKt6CcrgFBAraCzuagMRZtWw50nv0NFQGq~N2hVrq4BhdFi8G2WHWPC1XR1gwumhlTJd92fKIRl-jdmOKhVYD~ZXIjuWon8Q6R9~~-QWgMOUjiTxKQLzps8jX9jkUoidLf12XHbyRe7gg8oi6xK4vJI2vbrarx3MC5kmBNvzOtFySB6R71scdXlnvRGhqvNPwZjpwT6sp~20FA-TQ9d3tb0Re1WpmlSlX2hgfH3zWPe5knKu~fqrLi3xqaRlC~FpQw__",
      totalNumberOfRatings: 88,
      rating: 5,
    },
  ];

  return (
    <div className="w-full h-fit mt-10 lg:mt-[3rem]">
      <TitleWithBar title={"Featured"} />
      <div className="w-full flex justify-between items-center mb-10 max-[597px]:mb-6">
        <span className="text-2xl xl:text-3xl font-bold max-[597px]:text-[20px]">
          New Arrival
        </span>
      </div>
      <NewArrivalProducts />
    </div>
  );
}

export default NewArrivalSection;
