import { NextResponse } from "next/server";
import RazorPay from "razorpay";
import { Cart, Order, RazorPayOrder } from "../../../../../../models/models";

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

    const paymentObject = cartItemsForUser?.reduce(
      (pay, singleProduct) => {
        const itemID = singleProduct._id;
        const itemTitle = singleProduct.product.title;

        const itemBuyPrice = singleProduct.product.discountedPrice; // the bying price
        const itemQuantity = singleProduct.quantity;

        const totalItemPrice = itemBuyPrice * itemQuantity;

        return {
          amount: pay.amount + totalItemPrice,
          productinfo: [...pay.productinfo, { title: itemTitle, id: itemID }],
        };
      },
      { amount: 0, productinfo: [] }
    );

    /***  if coupon available apply that ***/
    if (!!appliedCouponID) {
      const appliedCoupon = await Coupon.findOne({ _id: appliedCouponID }); // check if applied coupon is available on database
      if (!!appliedCoupon) {
        const discountedPrice = appliedCoupon?.isPercentage
          ? (payuObject.amount / 100) * parseInt(appliedCoupon.off) || 0
          : payuObject.amount >
              (appliedCoupon.minimumPayAmount || payuObject.amount + 100)
            ? appliedCoupon.off
            : 0;

        paymentObject.amount -= discountedPrice;
      }
    }

    const instance = new RazorPay(); // initialize razorpay sdk

    const txnid = uuidv4(); // random txnid

    /***  Create an order and get the order ID with the help of razorpay SDK ***/
    const razorpayOrderId = instance.orders.create({
      amount: paymentObject.amount,
      currency: "INR",
      receipt: "receipt#" + txnid,
      partial_payment: false,
      notes: {
        customerName: userDetails.name,
        customerEmail: userDetails.email,
        productIDs: cartItemsForUser.map((item) => item._id).join(", "),
      },
    });

    /***  Formating all the cart items as suitable for order schema and adding txnid and orderId (random id) ***/
    const txnAndOrderIdInsertedCartItems = cartItemsForUser.map((item) => ({
      ...item,
      txnid: "T-" + txnid,
      title: item.product.title,
      previewUrl: item.product.previewUrl,
      discountedPrice: item.product.discountedPrice,
      originalPrice: item.product.originalPrice,
      shippingPrice: item.product.shippingPrice,
      orderId: "O-" + uuidv4(),
      user: userDetails._id,
    }));

    /*** sending all the order data to database ****/
    const orders = await Order.insertMany(txnAndOrderIdInsertedCartItems);

    // generating razorpay list, indivisual record for each order and assining the razorpay generaetd order id
    const razorpayOrderIdList = orders.map((item) => {
      return {
        razorPayOrderId: razorpayOrderId, // the order id created by razorpay for the order
        order: item._id, // the id of an order
        user: userDetails._id, // also store the userId
      };
    });

    /***  for razor pay generated orders we are storing the generated orderId for future refrences, (in future there can be a need to generate hash and match to verify payment) ***/
    await RazorPayOrder.insertMany(razorpayOrderIdList);

    return NextResponse.json(
      {
        status: true,
        razorpayOrderId: razorpayOrderId,
      },
      { status: true }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { status: false, message: error.message },
      { status: 500 }
    );
  }
}
