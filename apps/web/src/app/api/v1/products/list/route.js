export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";

import { connect } from "../../../../../dbConfig/dbConfig";
import { Product } from "@/models/product.model";
import { Category } from "@/models/category.model";

const TAG = "products/route.js:--";

connect();

export async function GET(req) {
  try {
    const searchParams = req.nextUrl.searchParams;

    let PAGE = searchParams.get("page") || 0;
    const LIMIT = searchParams.get("limit") || 50;
    const SKIP = PAGE * LIMIT;

    const SORT = searchParams.get("sort");
    const FILTER = searchParams.get("filter");

    // filter result by query params
    // const TYPE = "both";
    const CATEGORY = searchParams.get("category");
    const QUERY = searchParams.get("query");

    const filter = {}; // blank filter object

    filter.productType = { $in: ["both"] };

    if (!!QUERY) {
      filter["$text"] = { $search: QUERY };
    }

    if (CATEGORY) {
      filter.category = CATEGORY;
    }

    if (!!FILTER) {
      const parsedFilter = JSON.parse(decodeURIComponent(FILTER));

      if (parsedFilter.color && parsedFilter.color.length > 0) {
        filter.color = { $in: parsedFilter.color };
      }

      if (parsedFilter.category && parsedFilter.category.length > 0) {
        filter.category = { $in: parsedFilter.category };
      }

      if (parsedFilter.price && parsedFilter.price.length > 0) {
        filter.price = {
          $gt: parsedFilter.price[0],
          $lt: parsedFilter.price[1],
        };
      }

      if (parsedFilter.rating) {
        filter.rating = {
          $gt: parsedFilter.rating,
        };
      }
    }

    let sortObject = { createdAt: "desc" };

    if (!!QUERY) {
      delete sortObject.createdAt;
      sortObject.score = { $meta: "textScore" };
    }

    if (!!SORT) {
      delete sortObject.createdAt;
      switch (SORT) {
        case "popularity":
          sortObject[
            filter.productType === "rent" ? "rentTotalOrders" : "buyTotalOrders"
          ] = "desc";
          break;
        case "low-to-hight-price":
          sortObject[
            filter.productType === "rent" ? "rentingPrice" : "discountedPrice"
          ] = "asc";
          break;
        case "hight-to-low-price":
          sortObject[
            filter.productType === "rent" ? "rentingPrice" : "discountedPrice"
          ] = "desc";
          break;
        case "newest":
          sortObject.createdAt = "desc";
          break;
        default:
          sortObject = undefined;
      }
    }

    const totalProductsCount = await Product.countDocuments(
      filter,
      sortObject || undefined
    );

    const products = await Product.find(filter)
      .populate(["category", "productVariant"])
      .sort(sortObject)
      .skip(SKIP)
      .limit(LIMIT);

    const totalPages = Math.ceil(totalProductsCount / LIMIT);

    return NextResponse.json(
      {
        totalPages,
        products: products,
        totalProductCount: totalProductsCount,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(TAG, error);
    return NextResponse.json(
      { message: error.message },
      {
        status: 500,
      }
    );
  }
}

export async function POST(req) {}
