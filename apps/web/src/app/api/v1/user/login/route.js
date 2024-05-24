export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";

import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { connect } from "../../../../../dbConfig/dbConfig";

import { isValidIndianMobileNumber } from "custom-validator-renting";
import { User } from "@/models/user.model";
import { Role } from "@/models/role.model";

const secret = process.env.JWT_SECRET;

connect();

export async function GET(request) {
  return NextResponse.json({ status: true, message: "It's Working!" });
}

export async function POST(req) {
  try {
    const error = [];
    const { mobileNo, password } = await req.json();

    console.log(mobileNo, password);

    if (!isValidIndianMobileNumber(mobileNo)) {
      error.push("Mobile no is not as per standards");
    }

    if (error.length > 0) {
      return NextResponse.json(
        {
          message: error.join(", "),
        },
        { status: 422 }
      );
    }

    const user = await User.findOne({ mobileNo }).populate("role");

    if (!user) {
      return NextResponse.json(
        {
          message: "Username/Password invalid.",
        },
        { status: 401 }
      );
    }

    const isPassValid = bcrypt.compareSync(password, user.password);
    if (!isPassValid) {
      return NextResponse.json(
        {
          message: "Username/Password invalid.",
        },
        { status: 401 }
      );
    }

    if (!user?.isMobileNoVerified) {
      return NextResponse.json(
        {
          message: "Account not verified yet!",
        },
        { status: 403 }
      );
    }

    const jwtToken = jwt.sign(
      {
        _id: user._id,
        name: user.name,
        role: user.role.role,
        email: user.email,
        mobileNo: user.mobileNo,
        center: user?.center,
      },
      secret,
      { expiresIn: 1 + "h" }
    );

    const oneDay = 24 * 60 * 60 * 1000;

    const response = NextResponse.json(
      {
        message: "Login successful",
        user: {
          name: user.name,
          email: user.email,
          mobileNo: user.mobileNo,
          jwtToken: jwtToken,
        },
      },
      { status: 200 }
    );

    response.cookies.set("token", jwtToken, { expires: Date.now() + oneDay });
    response.cookies.set("name", user.name, { expires: Date.now() + oneDay });
    response.cookies.set("email", user.email, { expires: Date.now() + oneDay });

    return response;
  } catch (error) {
    console.log(error);
    if (error instanceof mongoose.Error && error?.errors) {
      const errArray = Object.values(error.errors).map(
        (properties) => properties.message
      );

      return NextResponse.json(
        {
          message: errArray.join(", "),
        },
        { status: 400 }
      );
    }
    return NextResponse.json(
      {
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
