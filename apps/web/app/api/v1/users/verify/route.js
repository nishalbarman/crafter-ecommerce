import { NextResponse } from "next/server";

import { connect } from "../../../../../dbConfig/dbConfig";
import { User } from "../../../../../models/models";

connect();

export async function GET() {
  return NextResponse.json({ message: "Hi" });
}

export async function POST(req) {
  try {
    const { token } = await req.json();
    console.log("Encoded Token:-->>", token);
    if (!token) {
      return NextResponse.json({ message: "Invalid token" }, { status: 400 });
    }

    const user = await User.findOne({ mobileNoVerifyToken: token });
    if (!user) {
      return NextResponse.json({ message: "Invalid token" }, { status: 400 });
    }

    user.isMobileNoVerified = true;
    // user.mobileNoVerifyToken = null;

    await user.save({ validateBeforeSave: false });

    return NextResponse.json({ status: true, message: "Account verified!" });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error!" },
      { status: 500 }
    );
  }
}
