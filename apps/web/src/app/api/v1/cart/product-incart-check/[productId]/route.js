import { connect } from "@/dbConfig/dbConfig";
import checkRole from "@/helpter/checkRole";
import { Cart } from "@/models/cart.model";
import { NextResponse } from "next/server";

connect();

const checkUserRole = checkRole(0);

export async function GET(req, { params }) {
  try {
    const roleCheckResult = checkUserRole(req);
    if (roleCheckResult) {
      return roleCheckResult;
    }

    const reqBody = await req.json();

    const searchParams = params;

    const filterObject = {
      product: searchParams.get("productId"),
      productType: reqBody.get("productType"),
      user: req.user._id,
    };

    if (reqBody?.variant) {
      filterObject.variant = reqBody.variant;
    }

    const cartItem = await Cart.findOne(filterObject);

    if (!!cartItem) {
      return NextResponse.json({
        isProductInCart: true,
      });
    }

    return NextResponse.json({
      isProductInCart: false,
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
