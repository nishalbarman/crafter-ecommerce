import { connect } from "@/dbConfig/dbConfig";
import checkRole from "@/helpter/checkRole";
import { Order } from "@/models/order.model";
import { Product } from "@/models/product.model";
import { NextResponse } from "next/server";

connect();

export async function GET(req, { params }) {
  try {
    const productType = "buy";

    // check whether we have the product id or not
    if (!params.productId) {
      return NextResponse.redirect("/");
    }

    const product = await Product.findOne({ _id: params.productId }).populate([
      "category",
      { path: "productVariant" },
    ]);

    const hasUserBoughtThisProduct = await Order.countDocuments({
      product: params.productId,
      user: req.user._id,
      orderType: productType,
      orderStatus: "Delivered",
    });

    if (!product) {
      return NextResponse.json(
        {
          message: "Invalid request: Product not found.",
        },
        {
          status: 400,
        }
      );
    }

    return res.status(200).json({
      product,
      hasUserBoughtThisProduct: !!hasUserBoughtThisProduct,
    });
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
