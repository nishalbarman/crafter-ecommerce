const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { connect } from "../../../../dbConfig/dbConfig";
import { User, Product, Cart, Wishlist } from "../../../../models/models";
import getTokenDetails from "../../../../helpter/getTokenDetails";

connect();

export async function GET(req) {
  try {
    const userToken = req.cookies.get("token") || null;
    const token = userToken?.value;

    if (!token) {
      return NextResponse.redirect("/login?redirect=wishlist");
    }

    const userDetails = getTokenDetails(token);

    if (!userDetails) {
      return NextResponse.redirect("/login?redirect=wishlist");
    }

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
    const token = userToken?.value;

    if (!token) {
      return NextResponse.redirect("/login?redirect=wishlist");
    }

    const userDetails = getTokenDetails(userToken.value);
    if (!userDetails) {
      return NextResponse.redirect("/login?redirect=wishlist");
    }

    const { productId } = await req.json();

    const wishlistItem = await Wishlist.findOne({
      product: productId,
      user: userDetails._id,
    });

    if (wishlistItem) {
      return NextResponse.json({
        status: true,
        message: "Already in wishlist",
      });
    }

    const wishlist = new Wishlist({
      user: userDetails._id,
      product: productId,
    });

    await wishlist.save();

    return NextResponse.json({
      status: true,
      message: "Item added to wishlist",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        status: false,
        message: "Internal server error!",
      },
      { status: 500 }
    );
  }
}
