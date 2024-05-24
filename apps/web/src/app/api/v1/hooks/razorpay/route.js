import { Cart } from "@/models/cart.model";
import { Order } from "@/models/order.model";
import { Product } from "@/models/product.model";
import { PaymentTransModel } from "@/models/transaction.model";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { validateWebhookSignature } from "razorpay";

const webhookSecret = process.env.RAZOR_PAY_WEBHOOK_SECRET;

export async function GET(req) {
  console.log("Razorpay hook got triggered!");

  try {
    const headerList = headers();

    console.log(req.headers["x-razorpay-signature"]);

    const webhookSignature = headerList.get("x-razorpay-signature");

    const reqBody = await req.json();

    console.log("Razorpay Request Body:-", reqBody);

    if (
      validateWebhookSignature(
        JSON.stringify(reqBody),
        webhookSignature,
        webhookSecret
      )
    ) {
      const {
        notes: {
          orderGroupID,
          user,
          address,
          cartProductIds,
          productIds,
          description,
          paymentTxnId,
        },
      } = reqBody.payload.payment.entity;

      switch (reqBody.event) {
        case "payment.authorized":
          const pipeline = [
            // Match orders with the given paymentTxnId
            { $match: { paymentTxnId: paymentTxnId } },

            // Update matched orders
            {
              $set: {
                paymentStatus: "Success",
                orderStatus: "On Progress",
              },
            },

            // Group to get unique product IDs
            {
              $group: {
                _id: null,
                productIds: { $addToSet: "$product" },
                orders: { $push: "$$ROOT" },
              },
            },

            // Lookup products and update buyTotalOrders
            {
              $lookup: {
                from: "products",
                let: { productIds: "$productIds" },
                pipeline: [
                  { $match: { $expr: { $in: ["$_id", "$$productIds"] } } },
                  {
                    $set: {
                      buyTotalOrders: { $add: ["$buyTotalOrders", 1] },
                    },
                  },
                ],
                as: "updatedProducts",
              },
            },

            // Output the results
            {
              $project: {
                orders: 1,
                updatedProducts: 1,
              },
            },
          ];

          const result = await Order.aggregate(pipeline);

          // Update PaymentTransModel
          await PaymentTransModel.updateOne(
            { paymentTransactionID: paymentTxnId },
            { $set: { paymentStatus: "Paid" } }
          );

          // Delete cart items
          await Cart.deleteMany({
            _id: {
              $in: cartProductIds.split(","),
            },
          });

          if (result.length > 0) {
            const { orders, updatedProducts } = result[0];

            const orderBulkOps = orders.map((order) => ({
              updateOne: {
                filter: { _id: order._id },
                update: {
                  $set: {
                    paymentStatus: "Success",
                    orderStatus: "On Progress",
                  },
                },
              },
            }));

            const productBulkOps = updatedProducts.map((product) => ({
              updateOne: {
                filter: { _id: product._id },
                update: {
                  $inc: { buyTotalOrders: 1 },
                },
              },
            }));

            await OrderModel.bulkWrite(orderBulkOps);
            await Product.bulkWrite(productBulkOps);
          }

          await sendMail({
            from: `"Rent Karo" <${process.env.SENDER_EMAIL_ADDRESS}>`, // sender address
            // to: centerDetails.email, // list of receivers
            to: "nishalbarman+admin@gmail.com", // list of receivers
            // bcc: "nishalbarman@gmail.com", // can be the admin email address
            subject: "RentKaro: New Order Recieved", // Subject line
            html: `<html>
                        <body>
                            <div style="width: 100%; padding: 5px 0px; display: flex; justify-content: center; align-items: center; border-bottom: 1px solid rgb(0,0,0,0.3)">
                            <h2>Rent Karo</h2>
                            </div>
                            <div style="padding: 40px; box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;">
                            <center>
                                <span style="font-size: 18px;">Hey Yo Brother you just got a new order, You got a new order. Fullfill the order as soon as possible.
                            </center>
                            </div>
                        </body>
                    </html>`, // html body
          });

          return NextResponse.json(
            { message: "Sucess: Status Updated" },
            {
              status: 200,
            }
          );

          break;
        case "payment.failed":
          await Order.updateMany(
            { paymentTxnId: paymentTxnId },
            { $set: { paymentStatus: "Failed", orderStatus: "Rejected" } }
          );

          await PaymentTransModel.updateOne(
            { paymentTransactionID: paymentTxnId },
            {
              $set: {
                paymentStatus: "Failed",
              },
            }
          );

          return NextResponse.json(
            { message: "Failed: Status Updated" },
            {
              status: 200,
            }
          );

          break;
        default:
          return NextResponse.json(
            {
              message: "Hook not configured for " + reqBody.event,
            },
            {
              status: 200,
            }
          );
      }
    }

    // Return a 200 response to acknowledge receipt of the event
    return NextResponse.json({
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: error.message },
      {
        status: 500,
      }
    );
  }
}
