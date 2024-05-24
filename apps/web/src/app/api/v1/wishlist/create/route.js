export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { connect } from "../../../../../dbConfig/dbConfig";
import checkRole from "@/helpter/checkRole";
import { Wishlist } from "@/models/wishlist.model";

connect();

const checkUserRole = checkRole(0);

export async function POST(req) {
  try {
    // check user role
    const roleCheckResult = checkUserRole(req);
    if (roleCheckResult) {
      return roleCheckResult;
    }

    const reqBody = await req.json();

    const productType = "buy";
    const productId = reqBody.productId;

    const wishlistCount = await Wishlist.countDocuments({
      product: productId,
      user: userDetails._id,
      productType,
    });

    if (wishlistCount >= 45) {
      return NextResponse.json(
        {
          message: "Only maximum 45 wishlist items allowed!",
        },
        {
          status: 409,
        }
      );
    }

    const wishlistItem = await Wishlist.findOne({
      product: productId,
      user: userDetails._id,
      productType,
    });

    if (wishlistItem) {
      return NextResponse.json(
        {
          message: "Already in wishlist",
        },
        {
          status: 409,
        }
      );
    }

    const wishlist = new Wishlist({
      user: userDetails._id,
      product: productId,
      productType,
    });

    await wishlist.save();

    return NextResponse.json({
      message: "Added to wishlist",
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
