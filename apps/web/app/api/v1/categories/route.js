export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { connect } from "../../../../dbConfig/dbConfig";
import { Category } from "../../../../models/models";

const TAG = "products/route.js:--";

export async function GET() {
  try {
    const categories = [
      {
        title: "Phones",
        imageUrl: "/assets/category/phones.svg",
        path: "/products?category=phones",
      },
      {
        title: "Computers",
        imageUrl: "/assets/category/computers.svg",
        path: "/products?category=computers",
      },
      {
        title: "SmartWatch",
        imageUrl: "/assets/category/smart-watch.svg",
        path: "/products?category=smartwatch",
        atings: 100,
        rating: 5,
      },
      {
        title: "Camera",
        imageUrl: "/assets/category/camera.svg",
        path: "/products?category=camera",
      },
      {
        title: "HeadPhones",
        imageUrl: "/assets/category/headphone.svg",
        path: "/products?category=headphones",
      },
      {
        title: "Gaming",
        imageUrl: "/assets/category/gaming.svg",
        path: "/products?category=gaming",
      },
    ];

    return NextResponse.json(
      { data: categories, status: true },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error", status: false },
      { status: 500 }
    );
  }
}
