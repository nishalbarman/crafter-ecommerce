import { connect } from "@/dbConfig/dbConfig";
import checkRole from "@/helpter/checkRole";
import { Cart } from "@/models/cart.model";
import { Product } from "@/models/product.model";
import { NextResponse } from "next/server";

connect();

const checkUserRole = checkRole(0);

export async function POST(req) {
  try {
    const roleCheckResult = checkUserRole(req);
    if (roleCheckResult) {
      return roleCheckResult;
    }

    const productInfo = await req.json();

    // maybe these all mongo operations can be done using one aggregate pipeline
    const cartCount = await Cart.countDocuments({
      product: productInfo.productId,
      user: userDetails._id,
      productType: productInfo.productType,
    });

    if (cartCount >= 45) {
      return NextResponse.json(
        {
          message: "Only maximum 45 Cart items allowed!",
        },
        {
          status: 400,
        }
      );
    }

    const product = await Product.findById(productInfo.productId);
    if (product?.isVariantAvailable && !productInfo?.variant) {
      return NextResponse.json(
        {
          message:
            "Product varient available but not selected, kindly select proper size or color",
        },
        {
          status: 400,
        }
      );
    }

    const filterObject = {
      product: productInfo.productId,
      user: userDetails._id,
      productType: productInfo.productType,
    };

    if (productInfo?.variant) {
      filterObject.variant = productInfo.variant;
    }

    const cartItem = await Cart.findOneAndUpdate(filterObject, {
      $inc: {
        quantity: productInfo?.quantity || 1,
      },
    });

    if (!!cartItem) {
      return NextResponse.json({
        message: "Added to Cart",
      });
    }

    const cart = new Cart({
      user: userDetails._id,
      product: productInfo.productId,
      productType: productInfo.productType,
      quantity: productInfo.quantity,
      rentDays: productInfo.rentDays,
    });

    if (productInfo?.variant) {
      cart.variant = productInfo.variant;
    }

    await cart.save();

    return NextResponse.json({
      message: "Added to Cart",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Internal server error!",
      },
      {
        status: 500,
      }
    );
  }
}
