import { connect } from "@/dbConfig/dbConfig";
import checkRole from "@/helpter/checkRole";
import { Cart } from "@/models/cart.model";
import { NextResponse } from "next/server";

connect();

const checkUserRole = checkRole(0);

export async function PATCH(req) {
  try {
    // check user role
    const roleCheckResult = checkUserRole(req);
    if (roleCheckResult) {
      return roleCheckResult;
    }

    const reqBody = await req.json();

    const searchParams = new URL(req.url);

    const productType = "buy";

    const cart_item_id = searchParams.cart;

    if (!cart_item_id) {
      return NextResponse.send(
        { message: "Cart Item Id Missing" },
        {
          status: 400,
        }
      );
    }

    const rentDays = reqBody.rentDays;
    const quantity = reqBody.quantity;
    const size = reqBody.size;
    const color = reqBody.color;

    const cartProduct = await Cart.findOne({
      _id: cart_item_id,
      user: userDetails._id,
      productType,
    });

    if (!cartProduct) {
      return res.status(400).json({
        message: "No items in cart",
      });
    }

    if (productType === "rent" && !!rentDays) {
      cartProduct.rentDays = rentDays;
    }

    if (!!quantity) {
      cartProduct.quantity = quantity;
    }

    if (!!size) {
      cartProduct.size = size;
    }

    if (!!color) {
      cartProduct.color = color;
    }

    await cartProduct.save({ validateBeforeSave: false });

    return res.json({
      message: "Cart Updated",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}
