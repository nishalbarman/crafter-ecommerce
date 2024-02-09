import { NextResponse } from "next/server";
import { connect } from "../../../../../dbConfig/dbConfig";
import { User, Product, Cart } from "../../../../../models/models";
import getTokenDetails from "../../../../../helpter/getTokenDetails";

connect();

export async function PATCH(req, { params }) {
  try {
    const userToken = req.cookies.get("token") || null;

    // handle invalid token
    if (!userToken) return NextResponse.json("Invalid token");

    const { product_id } = params;
    const { quantity } = await req.json();

    const userDetails = getTokenDetails(userToken.value);

    if (quantity < 1) {
      return NextResponse.json({
        status: true,
        message: "Quantity specified is invalid",
      });
    }

    const cartDetails = await Cart.findOneAndUpdate({
      user: userDetails._id,
      product: product_id,
      quantity: quantity,
    });

    if (!cartDetails) {
      return NextResponse.json({
        status: true,
        message: "Cart item updation failed",
      });
    }

    return NextResponse.json({
      status: true,
      message: "Cart item updated",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: false,
      message: "Internal server error!",
    });
  }
}

export async function DELETE(req, { params }) {
  try {
    const userToken = req.cookies.get("token") || null;

    // handle invalid token
    if (!userToken) return NextResponse.json("Invalid token");
    const { product_id } = params;

    const userDetails = getTokenDetails(userToken.value);

    const cartDetails = await Cart.findOneAndDelete({
      user: userDetails._id,
      product: product_id,
    });

    if (!cartDetails) {
      return NextResponse.json({
        status: true,
        message: "Cart item deletion failed",
      });
    }

    return NextResponse.json({
      status: true,
      message: "Cart item deleted",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: false,
      message: "Internal server error!",
    });
  }
}
