// export const dynamic = "force-dynamic";

import { connect } from "@/dbConfig/dbConfig";
import { Category } from "@/models/category.model";
import { NextResponse } from "next/server";

const TAG = "categories/route.js:--";

connect();

export async function GET(req) {
  try {
    console.log("Getting Request in the category server route");
    const searchQuery = req.nextUrl.searchParams;

    const PAGE = searchQuery.get("page") || 0;
    const LIMIT = searchQuery.get("limit") || 0;
    const SKIP = PAGE * LIMIT;

    const totalCounts = await Category.countDocuments({});

    let categories;

    if (LIMIT === 0 || PAGE === 0) {
      categories = await Category.find({}).sort({ createdAt: "desc" });
    } else {
      categories = await Category.find({})
        .sort({ createdAt: "desc" })
        .skip(SKIP)
        .limit(LIMIT);
    }

    const totalPages = Math.ceil(totalCounts / LIMIT);

    return NextResponse.json(
      { totalPages, categories },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(TAG, error);
    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}
