import { NextResponse } from "next/server";

import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { Otp, User } from "../../../../models/models";
import { connect } from "../../../../dbConfig/dbConfig";

const secret = process.env.SECRET;

connect();

export async function GET(request) {
  return NextResponse.json({ status: true, message: "It's Working!" });
}

export async function POST(request) {
  try {
    const error = [];
    const { email, mobileNo, otp, password } = await request.json(); // get all the form details for registration a new user

    /* Verify the OTP if it is valid or invalid */
    const otpFromDatabase = await Otp.findOne({ mobileNo }).sort({
      createdAt: "desc",
    });

    if (otpFromDatabase != otp) {
      /* Verify the OTP */
      error.push("OTP is invalid");
    }

    if (error.length > 0) {
      return NextResponse.json(
        { status: false, message: error.join(", ") },
        { status: 200 }
      );
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPass = bcrypt.hashSync(password, salt); // generate hashed pass

    // create new user if everything is ok, and then save it on db
    const userObject = new User({
      email,
      name,
      mobileNo,
      password: hashedPass,
    });
    await userObject.save();

    return NextResponse.json(
      { status: true, message: "Registration successful" },
      { status: 200 }
    );
    // create jwt token for the user object
    // const jwtToken = jwt.sign(
    //   {
    //     _id: userObject._id,
    //     role: userObject.role,
    //     mobileNo: userObject.mobileNo,
    //   },
    //   secret,
    //   { expiresIn: 24 * 10 + "h" }
    // );

    // const response = NextResponse.json(
    //   { status: true, message: "Registration successful", jwt: jwtToken },
    //   { status: 201 }
    // );
    // response.cookies.set("token", jwtToken);

    // return response;
  } catch (error) {
    console.log(error);
    if (error instanceof mongoose.Error) {
      console.log("I am here ------------------------>");
      /* I added custom validator functions in mongoose models, so the code is to chcek whether the errors are from mongoose or not */
      const errArray = [];
      for (let key in error.errors) {
        errArray.push(error.errors[key].properties.message);
      }

      return NextResponse.json(
        { status: false, message: errArray.join(", ").replaceAll(" Path", "") },
        { status: 200 }
      );
    }
    return NextResponse.json(
      { status: false, message: "Internal server error" },
      { status: 500 }
    );
    // return NextResponse.json(
    //   { status: false, message: error.message },
    //   { status: 500 }
    // );
  }
}
