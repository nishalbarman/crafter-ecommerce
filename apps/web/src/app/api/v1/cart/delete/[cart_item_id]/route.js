import { connect } from "@/dbConfig/dbConfig";
import checkRole from "@/helpter/checkRole";
import { NextResponse } from "next/server";

connect();

const checkUserRole = checkRole(0);

export async function DELETE(req, { params }) {
  try {
    // user role check
    const roleCheckResult = checkUserRole(req);
    if (roleCheckResult) {
      return roleCheckResult;
    }

    const cart_item_id = params.cart_item_id;

    const cartDetails = await Cart.findOneAndDelete({
      _id: cart_item_id,
      user: req.user._id,
    });

    if (!cartDetails) {
      return NextResponse.json(
        {
          message: "No items found!",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      message: "Cart item deleted",
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
