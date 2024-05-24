import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import checkRole from "@/helpter/checkRole";
import { Category } from "@/models/category.model";

const TAG = "admin/category/create";

connect();

const checkAdminRole = checkRole(1);

export async function POST(req) {
  try {
    // check for admin role
    const roleCheckResult = checkAdminRole(req);
    if (roleCheckResult) {
      return roleCheckResult;
    }

    const reqBody = await req.json();

    const categoryData = reqBody.categoryData;

    if (!categoryData) {
      return NextResponse.json(
        { message: "Category Data Not Found" },
        {
          status: 400,
        }
      );
    }

    try {
      categoryData.categoryImageUrl = await ImageUploadHelper.uploadBulkImages(
        categoryData.categoryImageUrl
      );
    } catch (error) {
      console.error(error);
      return NextResponse.status(400).json({ message: "File upload error" });
    }

    // Now here till this point we have uploaded image in firebase storage..

    // Now we are going to save the product to our database

    // Create a new product document
    const newCategory = await Category.create({
      categoryImageUrl: categoryData.categoryImageUrl[0],
      categoryName: categoryData.categoryName,
      categoryKey: categoryData.categoryName
        .trim()
        .replaceAll(" ", "-")
        .toLowerCase(),
    });

    return NextResponse.json(
      {
        message: `Category created`,
        data: newCategory,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(TAG, error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
