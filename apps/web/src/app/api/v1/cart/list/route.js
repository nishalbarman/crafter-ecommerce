import { connect } from "@/dbConfig/dbConfig";
import checkRole from "@/helpter/checkRole";
import { Cart } from "@/models/cart.model";
import { NextResponse } from "next/server";

connect();

const checkUserRole = checkRole(0);

export async function GET(req) {
  try {
    const roleCheckResult = checkUserRole(req);

    if (roleCheckResult) {
      return roleCheckResult;
    }

    const searchQuery = new URL(req.url);

    const PAGE = searchQuery.get("page") || 1;
    const LIMIT = searchQuery.get("limit") || 20;
    const SKIP = (PAGE - 1) * LIMIT;

    const cartDetails = await Cart.find({
      user: userDetails._id,
      productType: "buy",
    })
      .sort({ createdAt: "desc" })
      .skip(SKIP)
      .limit(LIMIT)
      .populate([
        {
          path: "product",
          select: "-showPictures -description -stars -productVariant",
        },
        {
          path: "variant",
        },
      ])
      .select("-user");

    if (cartDetails.length === 0) {
      return NextResponse.json({
        data: [],
      });
    }

    // Check if product field is null or empty in the first item
    if (!cartDetails[0].product) {
      return NextResponse.json({
        data: [],
      }); // Return null if no wishlist details are found
    }

    return NextResponse.json({
      data: cartDetails,
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
