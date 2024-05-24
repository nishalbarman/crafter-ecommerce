import { NextResponse } from "next/server";

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import passValidator from "password-validator";
import { v4 as uuidv4 } from "uuid";
import {
  hasOneSpaceBetweenNames,
  isValidEmail,
  isValidIndianMobileNumber,
} from "custom-validator-renting";
import { Otp } from "@/models/otp.model";

const validatePass = new passValidator();
validatePass.is().min(8).has().uppercase().has().lowercase();

connect();

const secret = process.env.JWT_SECRET;

export async function GET() {
  return NextResponse.json({ status: true, message: "It's Working!" });
}

export async function POST(req) {
  try {
    const error = [];
    const { email, name, mobileNo, password, otp } = await req.json();

    if (!isValidEmail(email)) {
      error.push("Invalid email");
    }

    if (!hasOneSpaceBetweenNames(name)) {
      error.push("Full name required");
    }

    if (!isValidIndianMobileNumber(mobileNo)) {
      error.push("Invalid phone number");
    }

    if (!validatePass.validate(password)) {
      error.push(
        "Password should be of minimum 8 digits containing uppercase and lowercase characters"
      );
    }

    if (error.length > 0) {
      return NextResponse.json(
        { message: error.join(", ") },
        {
          status: 400,
        }
      );
    }

    const otpFromDatabase = await Otp.findOne({
      mobileNo,
      email,
      name,
      otp,
    }).sort({
      createdAt: "desc",
    });

    if (!otpFromDatabase) {
      error.push("OTP is invalid");
    }

    const dateObject = new Date(otpFromDatabase?.createdAt);
    const dueTimestamp = dateObject.getTime() + 10 * 60 * 1000;

    if (
      // otpFromDatabase.otp != req.body.otp ||
      Math.round(dueTimestamp) < Date.now()
    ) {
      error.push("OTP expired");
    }

    if (error.length > 0) {
      return NextResponse.json(
        { message: error.join(", ") },
        {
          status: 400,
        }
      );
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPass = bcrypt.hashSync(password, salt);

    // const verifyToken = uuidv4();

    const userObject = await User.create({
      email,
      name,
      mobileNo,
      password: hashedPass,
      mobileNoVerifyToken: null,
      isMobileNoVerified: true,
      role: "65f1c390dd964b2b01a2ee64", // default id for user role
    });

    const jwtToken = jwt.sign(
      {
        _id: userObject._id,
        name: userObject.name,
        role: 0, //! Default role for user is 0
        email: userObject.email,
        mobileNo: userObject.mobileNo,
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
        {
          status: 400,
        }
      );
    }
    return NextResponse.json(
      {
        message: "Internal server error",
      },
      {
        status: 500,
      }
    );
  }
}
