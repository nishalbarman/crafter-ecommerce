import { NextResponse } from "next/server";

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import passValidator from "password-validator";
import { v4 as uuidv4 } from "uuid";

import { Otp, User } from "../../../../../models/models";
import { connect } from "../../../../../dbConfig/dbConfig";
import { getBackendUrl, isValidEmail } from "../../../../../helpter/utils";
import { sendSMS } from "../../../../../helpter/sendSMS";

const validatePass = new passValidator();
validatePass.is().min(8).has().uppercase().has().lowercase();

const backendUrl = getBackendUrl();

connect();

export async function GET() {
  return NextResponse.json({ status: true, message: "It's Working!" });
}

export async function POST(request) {
  try {
    const error = [];
    // const { email, name, mobileNo, otp, password, confirmPassword } =
    //   await request.json(); // get all the form details for registration of a new user
    const { email, name, mobileNo, password, confirmpassword } =
      await request.json(); // get all the form details for registration of a new user

    if (!isValidEmail(email)) {
      /* validate password */
      error.push("Invalid email");
    }

    if (!validatePass.validate(password)) {
      /* validate password */
      error.push(
        "Password should be of minimum 8 digits containing uppercase and lowercase characters"
      );
    }

    if (password !== confirmpassword) {
      /* verify if password and c-password is same or not */
      error.push("Password and Confirm password doesnot match!");
    }

    // /* Verify the OTP if it is valid or invalid */
    // const otpFromDatabase = await Otp.findOne({ mobileNo }).sort({
    //   createdAt: "desc",
    // });

    // if (otpFromDatabase != otp) {
    //   /* Verify the OTP */
    //   error.push("OTP is invalid");
    // }

    if (error.length > 0) {
      return NextResponse.json(
        { status: false, message: error.join(", ") },
        { status: 200 }
      );
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPass = bcrypt.hashSync(password, salt); // generate hashed pass
    
    const verifyToken = uuidv4();

    // create new user if everything is ok, and then save it on db
    const userObject = new User({
      email,
      name,
      mobileNo,
      password: hashedPass,
      mobileNoVerifyToken: verifyToken,
      role: "65c9b4c9a52cbc05d8c7c543",
    });

    sendSMS({
      to: +91 + "" + mobileNo,
      from: 54345,
      text: `Verify your Crafter Ecommerce account: Verification link: ${backendUrl}auth/verify/${verifyToken}. Don't share this link with anyone; our employees will never ask for the any kind of credentials.`,
    });

    await userObject.save();

    return NextResponse.json(
      { status: true, message: "Registration successful" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    if (error instanceof mongoose.Error) {
      /* I added custom validator functions in mongoose models, so the code is to chcek whether the errors are from mongoose or not */
      const errArray = [];
      for (let key in error.errors) {
        errArray.push(error.errors[key].properties.message);
      }

      return NextResponse.json(
        { status: false, message: errArray.join(", ").replaceAll(" Path", "") },
        { status: 400 }
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
