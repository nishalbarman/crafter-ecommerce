const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { PaymentGateway } from "../../../../../models/models";
import { connect } from "../../../../../dbConfig/dbConfig";
import getTokenDetails from "../../../../../helpter/getTokenDetails";

connect();

export async function GET(req) {
  try {
    const userCookies = req.cookies.get("token") || null;
    const token = userCookies?.value || null;

    if (!token) {
      return NextResponse.redirect(
        new URL("/auth/login?redirect=cart", req.url)
      );
    }

    const userDetails = getTokenDetails(token) || null;

    if (!userDetails) {
      return NextResponse.redirect(
        new URL("/auth/login?redirect=cart", req.url)
      );
    }

    const gateways = await PaymentGateway.find({ isActive: true }).select(
      "-isActive -_id"
    );

    return NextResponse.json({ status: true, data: gateways }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { status: false, message: error.message },
      { status: 500 }
    );
  }
}
