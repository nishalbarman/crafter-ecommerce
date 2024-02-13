export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { connect } from "../../../../dbConfig/dbConfig";
import { Product } from "../../../../models/models";

const TAG = "products/route.js:--";

connect();

export async function GET(req) {
  try {
    const searchParams = req.nextUrl.searchParams;

    // console.log("TAG", searchParams);

    const PAGE = searchParams.get("page") || 1;
    const LIMIT = searchParams.get("limit") || 50;
    const SKIP = (PAGE - 1) * LIMIT;

    const products = await Product.find({})
      .sort({ createdAt: "desc" })
      .skip(SKIP)
      .limit(LIMIT);

    console.log(products);

    return NextResponse.json({ data: products, status: true }, { status: 200 });
  } catch (error) {
    // console.error(TAG, error);
    return NextResponse.json(
      { message: "Some error occured", status: false },
      { status: 500 }
    );
  }
}
