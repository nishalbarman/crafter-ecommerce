import { connect } from "@/dbConfig/dbConfig";
import { Product, ProductVariant } from "@/models/product.model";
import { NextResponse } from "next/server";

connect();

export async function POST(req, { params }) {
  try {
    const reqBody = await req.json();

    const productId = params.productId;

    const variant = reqBody.variant;
    const productType = "buy";

    let isInStock = false;

    if (variant) {
      const Variant = await ProductVariant.findOne({
        _id: variant,
      });

      isInStock = !!Variant && Variant?.availableStocks > 0;

      return res.json({
        isInStock,
      });
    }

    const filterObject = {
      _id: productId,
      productType: productType,
    };

    const productItem = await Product.findOne(filterObject);

    isInStock = !!productItem && productItem?.availableStocks > 0;

    return NextResponse.json({
      isInStock,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Internal server error!",
      },
      { status: 500 }
    );
  }
}
