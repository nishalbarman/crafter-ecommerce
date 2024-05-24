import { connect } from "@/dbConfig/dbConfig";
import checkRole from "@/helpter/checkRole";
import { Feedback } from "@/models/feedback.model";
import { NextResponse } from "next/server";

const TAG = "admin/feedback/route.js";

connect();

const checkAdminRole = checkRole(1);

export async function GET(req, { params }) {
  try {
    const roleCheckResult = checkAdminRole(req);

    if (roleCheckResult) {
      return roleCheckResult;
    }

    // check whether we have the product id or not
    if (!params.feedbackId) {
      return NextResponse.json(
        {
          message: "Invalid Request: Feedback ID missing!",
        },
        {
          status: 400,
        }
      );
    }

    const feedback = await Feedback.findOne({ _id: params.feedbackId });
    if (!feedback) {
      return NextResponse.json(
        { message: "No such feedback found." },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({ feedback });
  } catch (error) {
    console.error(TAG, error);
    return res.NextResponse.json(
      { message: error.message },
      {
        status: 500,
      }
    );
  }
}
