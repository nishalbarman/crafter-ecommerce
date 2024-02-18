export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { getBackendUrl } from "../../../../../../helpter/utils";
import { Cart, Coupon, Order } from "../../../../../../models/models";
import getTokenDetails from "../../../../../../helpter/getTokenDetails";
import generateHash from "../../../../../../helpter/generateHash";
import { connect } from "../../../../../../dbConfig/dbConfig";

connect();

const PAYU_MERCHANT_KEY = process.env.PAYU_MERCHANT_KEY;

export async function GET(req) {
  try {
    const userCookies = req.cookies.get("token") || null;
    const token = userCookies.value || null;

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

    const searchParams = req.nextUrl.searchParams;
    const appliedCouponID = searchParams.get("coupon") || null;

    const cartItemsForUser = await Cart.find({
      user: userDetails._id,
    }).populate([
      "size",
      "color",
      {
        path: "product",
        select:
          "-_id title discountedPrice originalPrice previewUrl shippingPrice",
      },
    ]);

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
      title: item.product.title,
      previewUrl: item.product.previewUrl,
      discountedPrice: item.product.discountedPrice,
      originalPrice: item.product.originalPrice,
      shippingPrice: item.product.shippingPrice,
      orderId: "OIDC-" + uuidv4(),
      user: userDetails._id,
    }));

    const orders = await Order.insertMany(txnInsertedCartItems);
    console.log(orders);

    const payuObject = cartItemsForUser?.reduce(
      (pay, cartItem) => {
        const itemID = cartItem._id;
        const itemTitle = cartItem.product.title;

        const itemBuyPrice = cartItem.product.discountedPrice; // the bying price
        const itemQuantity = cartItem.quantity;

        const totalItemPrice = itemBuyPrice * itemQuantity;

        return {
          amount: pay.amount + totalItemPrice,
          productinfo: [...pay.productinfo, { title: itemTitle, id: itemID }],
        };
      },
      { amount: 0, productinfo: [] }
    );

    if (!!appliedCouponID) {
      // check if applied coupon is avaible
      const appliedCoupon = await Coupon.findOne({ _id: appliedCouponID }); // check if applied coupon is available on databse
      if (!!appliedCoupon) {
        // if discounted price is written as direct price then check the minumum required amount for the cart reached or not
        const discountedPrice = appliedCoupon?.isPercentage
          ? (payuObject.amount / 100) * parseInt(appliedCoupon.off) || 0
          : payuObject.amount >
              (appliedCoupon.minimumPayAmount || payuObject.amount + 100)
            ? appliedCoupon.off
            : 0;

        payuObject.amount -= discountedPrice;
      }
    }

    payuObject.txnid = txnid;
    payuObject.firstname = userDetails.name;
    payuObject.email = userDetails.email;
    payuObject.productinfo = JSON.stringify(payuObject.productinfo);
    payuObject.phone = userDetails.mobileNo;
    payuObject.udf1 = userDetails._id;

    const hash = generateHash(payuObject);

    const backendUrl = getBackendUrl();

    payuObject.key = PAYU_MERCHANT_KEY;
    payuObject.surl = `${backendUrl}api/v1/payment/payu/success`;
    payuObject.furl = `${backendUrl}api/v1/payment/payu/failure`;
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
