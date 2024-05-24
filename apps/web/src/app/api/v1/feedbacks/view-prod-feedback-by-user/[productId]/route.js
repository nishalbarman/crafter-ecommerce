import { connect } from "@/dbConfig/dbConfig";
import checkRole from "@/helpter/checkRole";
import { Feedback } from "@/models/feedback.model";
import { NextResponse } from "next/server";

connect();

const checkUserRole = checkRole(0);

export async function GET(req, { params }) {
  try {
    const roleCheckResult = checkUserRole(req);
    if (roleCheckResult) {
      return roleCheckResult;
    }

    const productId = params.productId;
    const productType = "buy";

    if (!productId || !productType) {
      return NextResponse.json(
        { message: "Invalid Request: Missing required fields" },
        {
          status: 400,
        }
      );
    }

    const feedback = await Feedback.findOne({
      product: productId,
      productType: productType,
      user: req.user._id,
    });

    return NextResponse.json(
      { feedback: feedback },
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
