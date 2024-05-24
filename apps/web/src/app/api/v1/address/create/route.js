import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import checkRole from "@/helpter/checkRole";
import { Address } from "@/models/address.model";

connect();

const checkUserRole = checkRole(0);

export async function POST(req) {
  try {
    const roleCheckResult = checkUserRole(req);
    if (roleCheckResult) {
      return roleCheckResult;
    }

    const reqBody = await req.json();

    const oldAddressCount = await Address.countDocuments({
      user: req.user._id,
    });

    if (oldAddressCount >= 5) {
      return NextResponse.status(400).json({
        status: false,
        message: "Address limit reached, you can only add upto 5 addresses",
      });
    }

    const newAddress = new Address({
      user: req.user._id,
      ...reqBody,
      location: {
        type: "Point",
        coordinates: [+reqBody.longitude, +reqBody.latitude],
      },
    });
    await newAddress.save();

    return NextResponse.json({
      message: "Address added.",
    });
  } catch (err) {
    console.log(err);
    if (err instanceof mongoose.Error) {
      /* I added custom validator functions in mongoose models, so the code is to chcek whether the errors are from mongoose or not */
      const errArray = [];
      for (let key in err.errors) {
        errArray.push(err.errors[key].properties.message);
      }

      return NextResponse.json(
        {
          message: errArray.join(", ").replaceAll(" Path", ""),
        },
        {
          status: 400,
        }
      );
    }
    return NextResponse.json(
      { message: "Internal server error" },
      {
        status: 500,
      }
    );
  }
}
