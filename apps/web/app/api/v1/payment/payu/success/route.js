export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import getTokenDetails from "../../../../../../helpter/getTokenDetails";
import { Cart, Order } from "../../../../../../models/models";
import { connect } from "../../../../../../dbConfig/dbConfig";

connect();

const PAYU_MERCHANT_KEY = process.env.PAYU_MERCHANT_KEY;

export async function POST(req) {
  try {
    const paymentFormData = await req.formData();
    const transactionId = paymentFormData.get("txnid");

    const tokenCookies = req.cookies.get("token") || null;
    if (!tokenCookies) {
      return NextResponse.json(
        { status: false, message: "Unauthorised access" },
        { status: 401 }
      );
    }

    const token = tokenCookies?.value || null;
    if (!token) {
      return NextResponse.json(
        { status: false, message: "Unauthorised access" },
        { status: 401 }
      );
    }

    const userDetails = getTokenDetails(token) || null;
    console.log(userDetails);

    if (!userDetails) {
      return NextResponse.json(
        { status: false, message: "Unauthorised access" },
        { status: 401 }
      );
    }

    await Order.updateMany(
      { txnid: transactionId },
      { $set: { paymentStatus: true, orderStatus: "Placed" } }
    );

    await Cart.deleteMany({ user: userDetails._id });

    return new Response(
      ` <body onload='sendPaymentData()'>
            <p>Please wait...</p>
        </body>
        <script>
            function sendPaymentData() {
                const paymentData = { success: false, status: 'failed', transactionId: '${paymentFormData.get("txnid")}' };

                // Dispatch a custom event to the parent window
                const event = new CustomEvent('paymentResponseData', { detail: paymentData });
                window.opener.document.dispatchEvent(event);

                // close the popup event
                window.close();
            }
        </script>`,
      {
        status: 200,
        headers: { Accept: `text/html`, "Content-Type": "text/html" },
      }
    );
  } catch (error) {
    console.log(error);
    return new Response(
      ` <body onload='sendPaymentData()'>
            <p>Please wait...</p>
        </body>
        <script>
            function sendPaymentData() {
                const paymentData = { success: false, status: 'failed', transactionId: '${paymentFormData.get("txnid")}' };

                // Dispatch a custom event to the parent window
                const event = new CustomEvent('paymentResponseData', { detail: paymentData });
                window.opener.document.dispatchEvent(event);

                // close the popup event
                window.close();
            }
        </script>`,
      {
        status: 200,
        headers: { Accept: `text/html`, "Content-Type": "text/html" },
      }
    );
  }
}
