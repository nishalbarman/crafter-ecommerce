import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import jsSHA from "jssha";
import { connect } from "../../../../../../dbConfig/dbConfig";
import getTokenDetails from "../../../../../../helpter/getTokenDetails";
import { request } from "https";
import axios from "axios";

connect();

const PAYU_MERCHANT_KEY = process.env.PAYU_MERCHANT_KEY;
const PAYU_MERCHANT_SALT = process.env.PAYU_MERCHANT_SALT;

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

    const hashString =
      PAYU_MERCHANT_KEY +
      "|" +
      txnid +
      "|" +
      amount +
      "|" +
      productinfo +
      "|" +
      firstname +
      "|" +
      email +
      "|" +
      "||||||||||" +
      PAYU_MERCHANT_SALT;

    const sha = new jsSHA("SHA-512", "TEXT");
    sha.update(hashString);
    const hash = sha.getHash("HEX");

    const response = await axios.post(
      `https://sandboxsecure.payu.in/_payment`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: {
          txnid,
          amount,
          productinfo,
          firstname,
          email,
          hash,
          key: PAYU_MERCHANT_KEY,
          surl: "https://localhost:3000/api/v1/payu/success",
          furl: "https://localhost:3000/api/v1/payu/failure",
        },
      }
    );

    return NextResponse.send(response.data);
  } catch (error) {
    console.log(error);
    if (error.response.status >= 300 && error.response.status <= 400) {
      return NextResponse.redirect(error.response.headers.location.toString());
    }
    return NextResponse.json({ status: false, message: error.message });
  }
}
