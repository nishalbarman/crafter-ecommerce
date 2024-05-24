import { connect } from "@/dbConfig/dbConfig";
import { Category } from "@/models/category.model";
import { NextResponse } from "next/server";

const TAG = "view/category/route.js";

connect();

export async function GET(req, { params }) {
  try {
    const categoryId = params.categoryId;

    if (!categoryId) {
      return NextResponse.json(
        { message: "Category ID Found" },
        {
          status: 400,
        }
      );
    }

    const category = await Category.findOne({
      _id: categoryId,
    });

    return NextResponse.json({
      category,
    });
  } catch (error) {
    console.error(TAG, error);
    return NextResponse.json({ message: error.message });
  }
}
