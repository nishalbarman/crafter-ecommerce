export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { Otp } from "../../../../../models/models";
import { sendSMS } from "../../../../../helpter/sendSMS";
import {
  generateRandomCode,
  isValidIndianMobileNumber,
} from "../../../../../helpter/utils";

export async function GET(request) {
  try {
    const { searchParams } = request.nextUrl;
    const from = "Crafter";
    const to = searchParams.get("phone");

    if (!isValidIndianMobileNumber(to)) {
      return NextResponse.json({
        status: false,
        message: "Invalid phone number",
      });
    }

    const randomCode = generateRandomCode();
    const text = `Your Crafter verfication code is: ${randomCode}. Don't share this code with anyone; our employees will never ask for the code. `;

    const otpObject = new Otp({ mobileNo: to, otp: randomCode });
    await otpObject.save();

    await sendSMS({ to, from, text });
    return NextResponse.json({
      status: true,
      message: "OTP sent to your mobile no",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: false, message: error.message });
    // return NextResponse.json({ status: false, message: "OTP sent failed" });
  }
}
