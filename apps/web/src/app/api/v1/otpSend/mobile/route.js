import { Otp } from "@/models/otp.model";
import {
  generateRandomCode,
  hasOneSpaceBetweenNames,
  isValidEmail,
  isValidIndianMobileNumber,
} from "custom-validator-renting";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const error = [];
    const { email, name, mobileNo } = await req.json();

    if (!hasOneSpaceBetweenNames(name)) {
      error.push("Full name required");
    }

    if (!isValidEmail(email)) {
      error.push("Invalid email");
    }

    if (!isValidIndianMobileNumber(mobileNo)) {
      error.push("Invalid phone number");
    }

    if (error.length > 0) {
      return res.status(200).json({ status: false, message: error.join(", ") });
    }

    const randomCode = generateRandomCode();

    const text = `Your Renting App verification code is: ${randomCode}. Don't share this code with anyone; our employees will never ask for the code.`;

    const otpObject = await Otp.create({
      email: email,
      name: name,
      mobileNo: mobileNo,
      otp: randomCode,
    });

    //! Send otp script will be written based on which otp service provider client chooses

    return NextResponse.json(
      {
        message: "OTP sent to your mobile number",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { status: false, message: error.message },
      {
        status: 500,
      }
    );
  }
}
