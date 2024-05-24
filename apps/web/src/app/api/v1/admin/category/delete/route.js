import { connect } from "@/dbConfig/dbConfig";
import checkRole from "@/helper/checkRole";
import { Category } from "@/models/category.model";
import { NextResponse } from "next/server";

const TAG = "admin/category/delete";

connect();

const checkAdminRole = checkRole(1);

export async function DELETE(req, { params }) {
  try {
    // Check for admin role
    const roleCheckResult = checkAdminRole(req);
    if (roleCheckResult) {
      return roleCheckResult;
    }

    const categoryId = params?.categoryId;

    if (!categoryId) {
      return NextResponse.json(
        { message: "Invalid request: Category ID is required." },
        { status: 400 }
      );
    }

    const categoryDelete = await Category.deleteOne({ _id: categoryId });

    if (categoryDelete.deletedCount === 0) {
      return NextResponse.json(
        { message: `Category with ID ${categoryId} not found.` },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Category successfully deleted." },
      { status: 200 }
    );
  } catch (error) {
    console.error(TAG, error);
    return NextResponse.json(
      { message: "Internal server error: Unable to delete category." },
      { status: 500 }
    );
  }
}
