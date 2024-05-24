import { connect } from "@/dbConfig/dbConfig";
import checkRole from "@/helpter/checkRole";
import { Feedback } from "@/models/feedback.model";
import { Order } from "@/models/order.model";
import { Product } from "@/models/product.model";
import { NextResponse } from "next/server";

connect();

const checkUserRole = checkRole(0);

export async function POST(req) {
  try {
    const roleCheckResult = checkUserRole(req);
    if (roleCheckResult) {
      return roleCheckResult;
    }

    const reqBody = await req.json();
    const productType = "buy";

    const error = [];

    if (!productType) {
      error.push("Product Type is missing");
    }

    if (!reqBody.product) {
      error.push("product id is missing");
    }

    if (!reqBody.description) {
      error.push("review description is missing");
    }

    if (
      !reqBody.givenStars ||
      !reqBody.givenStars > 5 ||
      !reqBody.givenStars <= 0
    ) {
      error.push("Invalid Request: Review icorrect");
    }

    // ENABLE THESE LINES ONE PUSHED TO FINAL PRODUCTION
    // check if user really purchased the product
    const userOrder = await Order.findOne({
      user: req.user._id,
      product: reqBody.product,
      orderType: productType,
      orderStatus: "Delivered",
    });

    if (!userOrder) {
      return NextResponse.json(
        {
          message: "You did not purchased this order yet!",
        },
        {
          status: 400,
        }
      );
    }

    // check if this user have already gave review or not
    const alreadyGivenFeedback = await Feedback.countDocuments({
      user: req.user._id,
      product: reqBody.product,
      productType: productType,
    });

    if (alreadyGivenFeedback !== 0) {
      const feedbackUpdate = await Feedback.updateOne(
        {
          user: req.user._id,
          product: reqBody.product,
          productType: productType,
        },
        {
          $set: {
            ...reqBody,
            givenBy: userDetails.name,
            user: userDetails._id,
            productType: productType,
          },
        }
      );
      return res.status(200).json({
        message: `Feedback added`,
      });
    }

    // insert into database
    const feedback = new Feedback({
      ...reqBody,
      givenBy: req.user.name,
      user: req.user._id,
      productType: productType,
    });
    await feedback.save();

    const product = await Product.findById(reqBody.product);

    // Step 1: Calculate the current total score
    const totalRatings = product.stars * product.totalFeedbacks;

    // Step 2: Add the new rating
    const newTotalRatings = totalRatings + reqBody.starsGiven;

    // Step 3: Increment the total number of reviews
    const newTotalFeedbacks = product.totalFeedbacks + 1;

    // Step 4: Calculate the new average rating
    const newAverage = (newTotalRatings / newTotalFeedbacks).toFixed(2);

    product.stars = newAverage;
    product.totalFeedbacks = newTotalFeedbacks;

    await product.save({ validateBeforeSave: false });

    return NextResponse.json(
      {
        message: `Feedback added`,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(TAG, error);
    return NextResponse.json(
      { message: error.message },
      {
        status: 500,
      }
    );
  }
}
