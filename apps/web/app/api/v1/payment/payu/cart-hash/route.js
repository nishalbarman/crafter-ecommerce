import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { Cart, Order } from "../../../../../../models/models";
import getTokenDetails from "../../../../../../helpter/getTokenDetails";
import generateHash from "../../../../../../helpter/generateHash";
import { connect } from "../../../../../../dbConfig/dbConfig";

connect();

const PAYU_MERCHANT_KEY = process.env.PAYU_MERCHANT_KEY;

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

    const cartItemsForUser = await Cart.find({
      user: userDetails._id,
    }).populate("product");
    if (!cartItemsForUser) {
      return NextResponse.json(
        { status: false, message: "No items on cart" },
        { status: 403 }
      );
    }

    const txnid = uuidv4();

    const txnInsertedCartItems = cartItemsForUser.map((item) => ({
      ...item,
      txnid,
    }));

    await Order.insertMany(txnInsertedCartItems);

    const payuObject = cartItemsForUser?.reduce(
      (pay, cartItem) => {
        const itemTitle = cartItem.product.title;
        const itemPrice = cartItem.product.discountedPrice;
        const itemQuantity = cartItem.quantity;
        const totalItemPrice = itemPrice * itemQuantity;

        return {
          amount: pay.amount + totalItemPrice,
          productinfo: [...pay.productinfo, itemTitle],
        };
      },
      { amount: 0, productinfo: [] }
    );

    payuObject.txnid = txnid;
    payuObject.firstname = userDetails.name;
    payuObject.email = userDetails.email;
    payuObject.productinfo = payuObject.productinfo.join(", ");

    const hash = generateHash(payuObject);

    payuObject.key = PAYU_MERCHANT_KEY;
    payuObject.surl = "http://localhost:3000/api/v1/payment/payu/success";
    payuObject.surl = "http://localhost:3000/api/v1/payment/payu/success";
    // payuObject.furl = "http://localhost:3000/api/v1/payment/payu/failure";
    payuObject.hash = hash;

    return NextResponse.json({
      status: true,
      paymentDetails: payuObject,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: false,
      message: "Hash generation failed",
    });
  }
}
