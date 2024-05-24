import checkRole from "@/helpter/checkRole";
import { Product, ProductVariant } from "@/models/product.model";
import { NextResponse } from "next/server";

const checkAdminRole = checkRole(1);

export default async function POST(req) {
  try {
    // check admin role
    const roleCheckResult = checkAdminRole(req);
    if (roleCheckResult) {
      return roleCheckResult;
    }

    const reqBody = await req.json();

    const deletableProductIds = reqBody?.deletableProductIds;

    if (!Array.isArray(deletableProductIds)) {
      return NextResponse.json(
        {
          message:
            "Invalid request: Deletable product IDs must be provided as an array.",
        },
        {
          status: 400,
        }
      );
    }

    const deletePromises = deletableProductIds.map(async (productId) => {
      const product = await Product.findById(productId);
      await ProductVariant.deleteMany(
        product?.productVariantmap?.map((variant) => variant._id)
      );
      await Product.findByIdAndDelete(productId);
    });

    await Promise.all(deletePromises);

    return NextResponse.json({ message: "Product(s) deleted." });
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
