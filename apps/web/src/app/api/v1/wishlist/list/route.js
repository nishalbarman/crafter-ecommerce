export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { connect } from "../../../../../dbConfig/dbConfig";
import checkRole from "@/helpter/checkRole";
import { Wishlist } from "@/models/wishlist.model";

connect();

const checkUserRole = checkRole(0);

export async function GET(req) {
  try {
    // check user role
    const roleCheckResult = checkUserRole(req);
    if (roleCheckResult) {
      return roleCheckResult;
    }

    const productType = "buy";

    const { searchParams } = new URL(request.url);

    const PAGE = searchParams.get("page") || 1;
    const LIMIT = searchParams.get("limit") || 20;
    const SKIP = (PAGE - 1) * LIMIT;

    const wishlistDetails = await Wishlist.find({
      user: userDetails._id,
      productType,
    })
      .sort({ createdAt: "desc" })
      .skip(SKIP)
      .limit(LIMIT)
      .populate("product")
      .select("-user");

    return NextResponse.json({
      wishlists: wishlistDetails,
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
