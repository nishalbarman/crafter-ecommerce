import { connect } from "@/dbConfig/dbConfig";
import checkRole from "@/helpter/checkRole";
import { Order } from "@/models/order.model";
import { NextResponse } from "next/server";

connect();

const checkUserRole = checkRole(0);

export async function PATCH(req) {
  try {
    const roleCheckResult = checkUserRole(req);
    if (roleCheckResult) {
      return roleCheckResult;
    }

    const reqBody = await req.json();

    const orderId = reqBody.orderId;

    if (!orderId) {
      return NextResponse.json(
        { message: "Order ID is missing!" },
        {
          status: 400,
        }
      );
    }

    // order can only be cancelled when the order state is among these three states
    const orderFilter = {
      _id: orderId,
      user: req.user._id,
      orderStatus: {
        $in: ["On Hold", "On Progress", "Accepted"],
      },
    };

    const order = await Order.findOneAndUpdate(orderFilter, {
      $set: {
        orderStatus: "Cancelled",
      },
    });

    if (!order) {
      return NextResponse.json({
        message: "Database error occured",
      });
    }
    return NextResponse.json({
      message: "Order successfully cancelled",
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
