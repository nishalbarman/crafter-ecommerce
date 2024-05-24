import checkRole from "@/helpter/checkRole";
import { Order } from "@/models/order.model";
import { NextResponse } from "next/server";

const checkAdminRole = checkRole(1);

export async function PATCH(req) {
  try {
    const roleCheckResult = checkAdminRole(req);
    if (roleCheckResult) {
      return roleCheckResult;
    }
    const reqBody = await req.json();

    const order = reqBody.order;
    const orderStatus = reqBody.orderStatus;
    const trackingLink = reqBody.trackingLink;

    if (!order || !orderStatus) {
      return NextResponse.json(
        {
          message: "Invalid Request: Required fields are missing",
        },
        {
          status: 400,
        }
      );
    }

    if (orderStatus === "On The Way" && !trackingLink) {
      return NextResponse.json(
        {
          message: "Invalid Request: Tracking link must needed",
        },
        {
          status: 400,
        }
      );
    }

    let orderFilter = {
      orderStatus: { $ne: "Cancelled" },
    };

    //! FROM admin panel we can get an array or signle group id. if admin selects multiple orders updation will happen based on order _id otherwise it will happen based on orderGroupID

    if (Array.isArray(order)) {
      orderFilter = { _id: { $in: order } };
    } else {
      orderFilter = { orderGroupID: order };
    }

    await Order.updateMany(orderFilter, {
      $set: { orderStatus, trackingLink: trackingLink || "" },
    });

    return NextResponse.json({
      message: "Order status updated",
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
