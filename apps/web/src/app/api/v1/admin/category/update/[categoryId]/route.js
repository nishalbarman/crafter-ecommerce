import checkRole from "@/helpter/checkRole";
import { Category } from "@/models/category.model";
import { NextResponse } from "next/server";

const TAG = "admin/category/create";

connect();

const checkAdminRole = checkRole(1);

export async function PATCH(req, { params }) {
  try {
    // check for admin role
    const roleCheckResult = checkAdminRole(req);
    if (roleCheckResult) {
      return roleCheckResult;
    }

    const reqBody = await req.json();

    const categoryId = params.categoryId;
    const categoryData = reqBody.categoryData;

    if (!categoryData) {
      return NextResponse.json(
        {
          message: "Category Data Not Found",
        },
        {
          status: 400,
        }
      );
    }

    if (!categoryId) {
      return NextResponse.json(
        { message: "Category Id Not Found" },
        {
          status: 400,
        }
      );
    }

    // const category = await Category.findById(categoryId);

    if (
      !!categoryData?.categoryImageUrl &&
      categoryData?.categoryImageUrl.length === 1
    ) {
      try {
        const url = await ImageUploadHelper.uploadBulkImages(
          categoryData.categoryImageUrl
        );
        console.log(url);
        categoryData.categoryImageUrl = url[0];
      } catch (error) {
        console.error(error);
        return NextResponse.json(
          { message: "File upload error" },
          {
            status: 400,
          }
        );
      }
    } else {
      delete categoryData.categoryImageUrl;
    }

    if (categoryData?.categoryName) {
      categoryData.categoryKey = categoryData.categoryName
        .trim()
        .replaceAll(" ", "-")
        .toLowerCase();
    } else {
      delete categoryData.categoryName;
    }

    await Category.updateOne({ _id: categoryId }, { $set: categoryData });

    return NextResponse.json(
      {
        message: `Category updated`,
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
