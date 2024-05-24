import checkRole from "@/helpter/checkRole";
import { PaymentTransModel } from "@/models/transaction.model";
import { NextResponse } from "next/server";

const checkUserRole = checkRole(0);

export async function GET(req, { params }) {
  try {
    const roleCheckResult = checkUserRole(req);
    if (roleCheckResult) {
      return roleCheckResult;
    }

    const paymentTransactionId = params.paymentTransactionId;

    const orderDetails = await PaymentTransModel.findOne({
      paymentTransactionID: paymentTransactionId,
    }).populate("order");

    return NextResponse.json({ orderDetails });
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
