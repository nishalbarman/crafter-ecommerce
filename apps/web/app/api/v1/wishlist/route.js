import { NextResponse } from "next/server";
import { connect } from "../../../../dbConfig/dbConfig";
import { User, Product, Cart, Wishlist } from "../../../../models/models";
import getTokenDetails from "../../../../helpter/getTokenDetails";

connect();

export async function GET(req) {
  try {
    const userToken = req.cookies.get("token") || null;

    // handle invalid token
    if (!userToken) return NextResponse.json("Invalid token");

    const userDetails = getTokenDetails(userToken.value);

    const wishlistDetails = await Wishlist.find({
      user: userDetails._id,
    })
      .populate("product")
      .select("-user");

    return NextResponse.json({
      status: true,
      data: wishlistDetails,
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
    // handle invalid token
    if (!userToken) return NextResponse.json("Invalid token");

    const { productId } = await req.json();

    const userDetails = getTokenDetails(userToken.value);

    const cart = new Wishlist({
      user: userDetails._id,
      product: productId,
    });

    await cart.save();

    return NextResponse.json({
      status: true,
      message: "Item added to wishlist",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: false,
      message: "Internal server error!",
    });
  }
}
