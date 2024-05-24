import checkRole from "@/helpter/checkRole";
import { Order } from "@/models/order.model";
import { NextResponse } from "next/server";

const checkAdminRole = checkRole(1);

export async function GET(req, { params }) {
  try {
    const roleCheckResult = checkAdminRole(req);
    if (roleCheckResult) {
      return roleCheckResult;
    }

    const orderGroupID = params.orderGroupID;

    const pipeline = [
      {
        $match: {
          orderGroupID: orderGroupID,
        },
      },
      {
        $group: {
          _id: "$orderGroupID",
          totalDocumentCount: { $sum: 1 },
          totalPrice: { $sum: "$price" },
          paymentTransactionId: { $push: "$paymentTxnId" },
          orderType: { $push: "$orderType" },
          orders: { $push: "$$ROOT" },
          createdAt: { $first: "$createdAt" }, // Extract createdAt from the first order in each group
        },
      },
      {
        $addFields: {
          createdAt: "$createdAt", // Add createdAt field to the grouped document
        },
      },

      {
        $group: {
          _id: null,
          globalTotalDocumentCount: { $sum: 1 },
          address: { $first: "$orders.address" },
          user: { $first: "$orders.user" },
          groupedOrders: { $push: "$$ROOT" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          pipeline: [
            { $match: {} },
            {
              $project: {
                _id: 1,
                name: 1,
                email: 1,
                mobileNo: 1,
                isMobileNoVerifed: 1,
              },
            },
          ],
          as: "user",
        },
      },
      {
        $project: {
          _id: 0,
          globalTotalDocumentCount: 1,
          groupedOrders: {
            $map: {
              input: "$groupedOrders",
              as: "group",
              in: {
                orderGroupID: "$$group._id",
                totalDocumentCount: "$$group.totalDocumentCount",
                paymentTransactionId: {
                  $arrayElemAt: ["$$group.paymentTransactionId", 0],
                },
                orderType: {
                  $arrayElemAt: ["$$group.orderType", 0],
                },
                totalPrice: "$$group.totalPrice",
                address: {
                  $arrayElemAt: ["$address", 0],
                },
                user: { $arrayElemAt: ["$user", 0] },
                orders: "$$group.orders",
                createdAt: "$$group.createdAt", // Include createdAt field
              },
            },
          },
        },
      },
    ];

    const orderDetails = await Order.aggregate(pipeline);

    return NextResponse.json(orderDetails[0].groupedOrders[0]);
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
