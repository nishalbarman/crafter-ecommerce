export const dynamic = "force-dynamic"; // defaults to auto

import { NextResponse } from "next/server";
import { connect } from "../../../../../dbConfig/dbConfig";
import { Cart } from "../../../../../models/models";
import getTokenDetails from "../../../../../helpter/getTokenDetails";

connect();

export async function PATCH(req, { params }) {
  try {
    const userToken = req.cookies.get("token") || null;
    const token = userToken.value || null;

    // handle invalid token
    if (!token) {
      return NextResponse.json(
        {
          status: false,
          message: "Token validation failed",
        },
        { status: 400 }
      );
    }

    const userDetails = getTokenDetails(userToken.value);
    if (!userDetails) {
      return NextResponse.json(
        {
          status: false,
          message: "Token validation failed",
        },
        { status: 400 }
      );
    }

    const { cart_item_id } = params;
    const reqBody = await req.json();

    const quantity = parseInt(reqBody.quantity) || null; // quantity
    const size = reqBody.size || null; // id of size
    const color = reqBody.color || null; // id of color

    const cartProduct = await Cart.findOne({
      product: cart_item_id,
      user: userDetails._id,
    }).populate({
      path: "product",
      populate: { path: "availableSizes" },
    });

    if (!cartProduct) {
      return NextResponse.json(
        {
          status: false,
          message: "No cart item",
        },
        { status: 400 }
      );
    }

    const responseText = [];

    if (quantity && cartProduct.product.availableStocks > quantity) {
      cartProduct.quantity = quantity;
      responseText.push("Quantity Updated");
    }

    if (
      size &&
      !!cartProduct.product.availableSizes.find((value) => {
        return value._id.toString() == size;
      })
    ) {
      cartProduct.size = size;
      responseText.push("Size Updated");
    }

    if (
      color &&
      !!cartProduct.product.availableColors.find((value) => {
        return value._id.toString() == color;
      })
    ) {
      cartProduct.color = color;
      responseText.push("Color Updated");
    }

    await cartProduct.save();

    return NextResponse.json({
      status: true,
      message: responseText.join(", "),
    });
  } catch (error) {
    console.log(error);
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
}

export async function DELETE(req, { params }) {
  try {
    const userToken = req.cookies.get("token") || null;
    const token = userToken.value || null;

    if (!token) {
      return NextResponse.json(
        {
          status: false,
          message: "Token validation failed",
        },
        { status: 400 }
      );
    }

    const userDetails = getTokenDetails(userToken.value);

    if (!userDetails) {
      return NextResponse.json(
        {
          status: false,
          message: "Token validation failed",
        },
        { status: 400 }
      );
    }

    const { cart_item_id } = params;

    const cartDetails = await Cart.findOneAndDelete({
      product: cart_item_id,
      user: userDetails._id,
    });

    if (!cartDetails) {
      return NextResponse.json(
        {
          status: false,
          message: "No items found!",
        },
        { status: 400 }
      );
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
