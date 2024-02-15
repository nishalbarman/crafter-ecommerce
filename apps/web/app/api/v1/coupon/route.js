export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { connect } from "../../../../dbConfig/dbConfig";
import { Coupon } from "../../../../models/models";

connect();

export async function GET(req, { params }) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const code = searchParams.get("code") || null;

    const userToken = req.cookies.get("token") || null;
    const token = userToken?.value || null;

    if (!token) {
      return NextResponse.redirect(new URL("/login?redirect=cart", req.url));
    }

    if (!code) {
      return NextResponse.json({
        status: false,
        message: "Coupon invalid",
      });
    }

    const coupon = await Coupon.findOne({ code: code.toUpperCase() });

    if (!coupon) {
      return NextResponse.json({
        status: false,
        message: "Coupon invalid",
      });
    }

    return NextResponse.json({
      status: true,
      message: "Coupon applied",
      coupon: coupon,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: false, message: "Server error" });
  }
}
