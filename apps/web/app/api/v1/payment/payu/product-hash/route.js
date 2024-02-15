export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { Cart } from "../../../../../../models/models";
import getTokenDetails from "../../../../../../helpter/getTokenDetails";

export async function GET(req) {
  try {
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

    if (!userDetails) {
      return NextResponse.json(
        { status: false, message: "Unauthorised access" },
        { status: 401 }
      );
    }

    const cartItemsForUser = await Cart.find({ user: userDetails._id });
    if (!cartItemsForUser) {
      return NextResponse.json(
        { status: false, message: "No items on cart" },
        { status: 403 }
      );
    }

    const pay = cartItemsForUser?.reduce(
      (pay, cartItem) => {
        return {
          ...pay,
          amount: pay.amount + cartItem.discountedPrice,
          productinfo: pay.productinfo + cartItem.title + ",",
        };
      },
      { amount: 0, productinfo: "" }
    );

    const txnid = uuidv4();
    pay.txnid = txnid;
    pay.firstname = userDetails.name;
    pay.email = userDetails.email;

    const hash = generateHash(pay);

    return NextResponse.json({ status: true, hash: hash });
  } catch (error) {
    return NextResponse.json({
      status: false,
      message: "Hash generation failed",
    });
  }
}
