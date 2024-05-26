export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { connect } from "../../../../../../dbConfig/dbConfig";
import { User, Product, Cart, Wishlist } from "../../../../../../models/models";
import getTokenDetails from "../../../../../../helpter/getTokenDetails";

connect();

export async function DELETE(req, { params }) {
  try {
    const userToken = req.cookies.get("token") || null;

    // handle invalid token
    if (!userToken) return NextResponse.json("Invalid token");
    const { product_id } = params;

    const userDetails = getTokenDetails(userToken.value);

    const wishlistDetails = await Wishlist.findOneAndDelete({
      product: product_id,
      user: userDetails._id,
    });

    if (!wishlistDetails) {
      return NextResponse.json({
        status: true,
        message: "Wishlist item deletion failed",
      });
    }

    return NextResponse.json({
      status: true,
      message: "Wishlist item deleted",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: false,
      message: "Internal server error!",
    });
  }
}
