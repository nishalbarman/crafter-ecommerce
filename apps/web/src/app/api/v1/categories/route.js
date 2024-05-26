// export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { connect } from "../../../../dbConfig/dbConfig";
import { Category } from "../../../../models/models";

const TAG = "products/route.js:--";

connect();

export async function GET() {
  try {
    const categories = await Category.find({});
    return NextResponse.json(
      { data: categories, status: true },
      { status: 200 }
    );
  } catch (error) {
    console.log(TAG, error);
    return NextResponse.json(
      { message: "Internal Server Error", status: false },
      { status: 500 }
    );
  }
}
