import { connect } from "@/dbConfig/dbConfig";
import checkRole from "@/helpter/checkRole";
import { PaymentTransModel } from "@/models/transaction.model";
import { NextResponse } from "next/server";

connect();

const checkUserRole = checkRole(0);

export async function GET(req, { params }) {
  try {
    // check user role
    const roleCheckResult = checkUserRole(req);
    if (roleCheckResult) {
      return roleCheckResult;
    }

    const orderGroupId = params.orderGroupId;

    if (!orderGroupId) {
      return NextResponse.json(
        {
          message: "Invalid Request: Order Group ID missing",
        },
        {
          status: 400,
        }
      );
    }

    const paymentTransaction = await PaymentTransModel.findOne({
      orderGroupID: orderGroupId,
      user: req.user._id,
    }).select("paymentStatus subTotalPrice shippingPrice totalPrice");

    return NextResponse.json(
      {
        paymentStatus: paymentTransaction.paymentStatus,
        subTotalPrice: paymentTransaction.subTotalPrice,
        shippingPrice: paymentTransaction.shippingPrice,
        totalPrice: paymentTransaction.totalPrice,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      {
        status: 500,
      }
    );
  }
}
