export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { connect } from "../../../../dbConfig/dbConfig";
import { Product } from "../../../../models/models";
import { isValidUrl } from "validators";

const TAG = "products/route.js:--";

connect();

export async function GET(req) {
  try {
    const searchParams = req.nextUrl.searchParams;

    const PAGE = searchParams.get("page") || 1;
    const LIMIT = searchParams.get("limit") || 50;
    const SKIP = (PAGE - 1) * LIMIT;

    const products = await Product.find({})
      .sort({ createdAt: "desc" })
      .skip(SKIP)
      .limit(LIMIT);

    return NextResponse.json({ data: products, status: true }, { status: 200 });
  } catch (error) {
    console.error(TAG, error);
    return NextResponse.json(
      { message: "Some error occured", status: false },
      { status: 500 }
    );
  }
}

const isProductHashError = ({
  previewUrl,
  title,
  category,
  discountedPrice,
  originalPrice,
  showPictures,
  description,
  shippingPrice,
  availableStocks,
  isSizeVaries,
  isColorVaries,
  availableSizes,
  availableColors,
}) => {
  const error = [];
  if (isValidUrl(previewUrl)) {
  }
};

export async function POST(req) {
  try {
    // const searchParams = req.nextUrl.searchParams;

    const reqBody = await req.json();

    if (reqBody.productList) {
      // multi product is recieved
    }

    const {
      previewUrl,
      title,
      category,
      discountedPrice,
      originalPrice,
      showPictures,
      description,
      shippingPrice,
      availableStocks,
      isSizeVaries,
      isColorVaries,
      availableSizes,
      availableColors,
    } = reqBody;

    const products = await Product.find({});

    return NextResponse.json(
      { message: "Product inserted", status: true },
      { status: 200 }
    );
  } catch (error) {
    console.error(TAG, error);
    return NextResponse.json(
      { message: error.message, status: false },
      { status: 500 }
    );
  }
}
