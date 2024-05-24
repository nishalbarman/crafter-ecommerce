export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import checkRole from "@/helpter/checkRole";
import { connect } from "@/dbConfig/dbConfig";

connect();

const checkUserRole = checkRole(0);

export async function GET(req) {
  try {
    const roleCheckResult = checkUserRole(req);
    if (roleCheckResult) {
      return roleCheckResult;
    }

    // const gateways = await PaymentGateway.find({ isActive: true }).select(
    //   "-isActive -_id"
    // );

    const gateways = ["razorpay"];

    return NextResponse.json({ data: gateways }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
