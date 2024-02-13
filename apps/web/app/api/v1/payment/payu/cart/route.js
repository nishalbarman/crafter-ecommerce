import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import jsSHA from "jssha";
import { connect } from "../../../../../../dbConfig/dbConfig";
import getTokenDetails from "../../../../../../helpter/getTokenDetails";
import request from "request";
import generateHash from "../../../../../../helpter/generateHash";

const PAYU_MERCHANT_KEY = process.env.PAYU_MERCHANT_KEY;

connect();

export async function GET(req) {
  try {
    const tokenCookies = req.cookies.get("token") || null;
    const token = tokenCookies?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    const userDetails = getTokenDetails(token);
    if (!userDetails) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    const txnid = uuidv4();
    const amount = 99;
    const productinfo = "Test product";
    const firstname = "Nishal";
    const email = "nishalbarman@gmail.com";

    const hash = generateHash({ txnid, amount, productinfo, firstname, email });

    //Making an HTTP/HTTPS call with request

    return NextResponse.json({ status: false, message: "Payment failed" });
  } catch (error) {
    console.log(error);
    if (error.response.status >= 300 && error.response.status <= 400) {
      return NextResponse.redirect(error.response.headers.location.toString());
    }
    return NextResponse.json({ status: false, message: error.message });
  }
}
