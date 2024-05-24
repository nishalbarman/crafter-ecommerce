import checkRole from "@/helpter/checkRole";
import { Feedback } from "@/models/feedback.model";
import { NextResponse } from "next/server";

const checkUserRole = checkRole(0);

export async function GET(req, { params }) {
  try {
    const roleCheckResult = checkUserRole(req);
    if (roleCheckResult) {
      return roleCheckResult;
    }

    const searchParams = req.nextUrl.searchParams;

    const productId = params.productId;
    const productType = "buy";

    if (!productId || !productType) {
      return res
        .status(400)
        .json({ message: "Invalid Request: Missing required fields" });
    }

    const PAGE = searchParams.get("page") || 1;
    const LIMIT = searchParams.get("limit") || 20;
    const SKIP = (PAGE - 1) * LIMIT;

    const feedbackCount = await Feedback.countDocuments({
      product: productId,
      productType: productType,
    });
    const totalPages = Math.ceil(feedbackCount / LIMIT);

    const feedbacks = await Feedback.find({
      product: productId,
      productType: productType,
    })
      .sort({ createdAt: "desc" })
      .skip(SKIP)
      .limit(LIMIT);

    return NextResponse.json(
      { feedbacks, totalPages },
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
