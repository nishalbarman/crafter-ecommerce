import { NextResponse } from "next/server";
import { connect } from "../../../../dbConfig/dbConfig";
import { User, Product, Cart } from "../../../../models/models";
import getTokenDetails from "../../../../helpter/getTokenDetails";

connect();

export async function GET(req) {
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

    const cartDetails = await Cart.find({
      user: userDetails._id,
    })
      .populate([
        {
          path: "product",
          populate: { path: "availableSizes" },
        },
        "size",
        "color",
      ])
      .select("-user");

    return NextResponse.json({
      status: true,
      data: cartDetails,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: false,
      message: "Internal server error!",
    });
  }
}

export async function POST(req) {
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

    const { productId, size, color } = await req.json();

    const cart = new Cart({
      user: userDetails._id,
      product: productId,
    });

    if (size) {
      cart.size = size;
    }

    if (color) {
      cart.color = color;
    }

    await cart.save();

    return NextResponse.json({
      status: true,
      message: "Item added to Cart",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: false,
      message: "Internal server error!",
    });
  }
}
