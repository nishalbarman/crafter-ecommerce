import { connect } from "@/dbConfig/dbConfig";
import checkRole from "@/helpter/checkRole";
import { Feedback } from "@/models/feedback.model";
import { NextResponse } from "next/server";

const TAG = "admin/feedback/list/route.js";

connect();

const checkAdminRole = checkRole(1);

export async function GET(req) {
  try {
    const roleCheckResult = checkAdminRole(req);
    if (roleCheckResult) {
      return roleCheckResult;
    }

    const searchParams = req.nextUrl.searchParams;

    let dbSearchQuery = {};
    if (searchParams.productId) {
      dbSearchQuery = { product: searchParams.productId };
    }

    const PAGE = searchParams.get("page") || 1;
    const LIMIT = searchParams.get("limit") || 20;
    const SKIP = (PAGE - 1) * LIMIT;

    const feedbacks = await Feedback.find(dbSearchQuery)
      .sort({ createdAt: "desc" })
      .skip(SKIP)
      .limit(LIMIT);

    return NextResponse.json(
      { data: feedbacks || [] },
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
