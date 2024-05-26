export const dynamic = "force-dynamic";

import mongoose from "mongoose";
import { NextResponse } from "next/server";

import * as cheerio from "cheerio";

import { connect } from "../../../../dbConfig/dbConfig";
import { Product } from "../../../../models/models";
import getTokenDetails from "@/helpter/getTokenDetails";
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

export async function POST(req) {
  try {
    const userToken = req.cookies.get("token") || null;
    const token = userToken?.token;
    if (!token) {
      return NextResponse.redirect("/auth/login", req.url);
    }

    const userDetails = getTokenDetails(token);
    if (!userDetails || !userDetails?.role || userDetails.role != 1) {
      return NextResponse.redirect("/auth/login", req.url);
    }

    const reqBody = await req.json();

    const isProductHasError = ({
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
      if (!isValidUrl(previewUrl)) {
        error.push("preview image is not valid");
      }

      if (!title || title < 7) {
        error.push("title should be of minimum 7 characters");
      }

      const ObjectId = mongoose.Types.ObjectId;
      if (
        !category ||
        !(ObjectId.isValid(id) && String(new ObjectId(id)) === id)
      ) {
        error.push("select a valid category");
      }

      if (!discountedPrice && !originalPrice) {
        error.push("price needs to be given");
      }

      if (
        !!discountedPrice &&
        !!originalPrice &&
        originalPrice <= discountedPrice
      ) {
        error.push("discounted price should be lesser that original price");
      }

      if (typeof showPictures !== "object") {
        error.push("pictures should be an array");
      }

      try {
        const html = cheerio.load(description);
      } catch (error) {
        error.push("description is not valid html");
      }

      if (!!shippingPrice && isNaN(parseInt(shippingPrice))) {
        error.push("shipping price should be a valid number");
      }

      if (!!availableStocks && isNaN(parseInt(availableStocks))) {
        error.push("stock should be a valid number");
      }

      if (
        !!isSizeVaries &&
        (!availableSizes || typeof availableSizes !== "object")
      ) {
        error.push(
          "available sizes should be an array of object, size with price"
        );
      }

      if (
        !!isColorVaries &&
        (!availableColors || typeof availableColors !== "object")
      ) {
        error.push("available colors should be an array of colors, with price");
      }

      return error;
    }; // validator function

    if (reqBody.productList) {
      // multi product is recieved
      // TODO : validate multi products and do whatever to do
      const errorProductList = [];
      const validProducts = productList.filter((singleProduct, index) => {
        const errorObject = {};
        const error = isProductHasError(singleProduct);
        if (error.length > 0) {
          errorObject.message = error.join(", ");
          errorObject.index = index;
          errorProductList.push(errorObject);
        } else {
          return singleProduct;
        }
      });

      await Product.insertMany(validProducts);
      return NextResponse.json({
        message: "Products created",
        error: errorProductList.length > 0 ? errorProductList : undefined,
      });
    }

    const error = isProductHasError(reqBody);
    if (error.length > 0) {
      return NextResponse.json({ message: error.join(", ") }, { status: 400 });
    }

    const product = new Product(reqBody);
    await product.save();

    return NextResponse.json(
      { message: "Product created", status: true },
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
