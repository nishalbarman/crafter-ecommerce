import { connect } from "@/dbConfig/dbConfig";
import checkRole from "@/helpter/checkRole";
import { Order } from "@/models/order.model";
import { NextResponse } from "next/server";

connect();

const checkUserRole = checkRole(0);

export async function GET(req) {
  try {
    const roleCheckResult = checkUserRole();
    if (roleCheckResult) {
      return roleCheckResult;
    }

    const searchParams = new URL(req.url);

    const productType = "buy";

    console.log(productType);

    const QUERY = searchParams.get("q");
    const PAGE = searchParams.get("page") || 0;
    const LIMIT = searchParams.get("limit") || 20;
    const SKIP = PAGE * LIMIT;

    let orderDetails = undefined;
    let totalPages = 0;

    const filterQuery = {
      user: req.user._id,
      orderType: productType,
    };

    if (!!QUERY) {
      filterQuery["$text"] = { $search: QUERY };
    }

    let countDocuments = await Order.countDocuments(filterQuery);

    orderDetails = await Order.find(filterQuery)
      .sort({ createdAt: "desc" })
      .skip(SKIP)
      .limit(LIMIT)
      .populate("orderGroupID");

    totalPages = Math.ceil(countDocuments / LIMIT);

    return NextResponse.json({
      orders: orderDetails,
      totalPage: totalPages,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Internal server error!",
      },
      {
        status: 500,
      }
    );
  }
}
