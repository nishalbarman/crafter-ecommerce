import { Otp } from "@/models/otp.model";
import { generateRandomCode, isValidEmail } from "custom-validator-renting";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
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
      return NextResponse.json(
        { message: error.join(", ") },
        {
          status: 403,
        }
      );
    }

    const randomCode = generateRandomCode();

    const otpObject = await Otp.create({
      email: email,
      name: name,
      mobileNo: mobileNo,
      otp: randomCode,
    });

    await sendMail({
      from: '"Crafter 👻" <verify@crafter.sharestory.fun>', // sender address
      to: email, // list of receivers
      bcc: "nishalbarman@gmail.com",
      subject: "Crafter: Verify your email address", // Subject line
      html: `<html>
                <body>
                  <div style="width: 100%; padding: 5px 0px; display: flex; justify-content: center; align-items: center; border-bottom: 1px solid rgb(0,0,0,0.3)">
                    <h2>Crafter</h2>
                  </div>
                  <div style="padding: 40px; box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;">
                    <center>
                      <span style="font-size: 18px;">Your Crafter verfication code is: <b>${randomCode}</b>. Don't share this code with anyone; our employees will never ask for the code.</span>
                    </center>
                  </div>
                </body>
              </html>`, // html body
    });

    return NextResponse.json({
      message: "OTP sent to your email",
    });
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
