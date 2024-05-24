import checkRole from "@/helpter/checkRole";
import { Address } from "@/models/address.model";
import { NextResponse } from "next/server";

const checkUserRole = checkRole(0);

export async function GET() {
  try {
    const roleCheckResult = checkUserRole(req);
    if (roleCheckResult) {
      return roleCheckResult;
    }

    const address = await Address.find({
      user: req.user._id,
    })
      .sort({ createdAt: "desc" })
      .select("-user");

    return NextResponse.json({
      address: address,
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
