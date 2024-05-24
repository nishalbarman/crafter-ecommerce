import { connect } from "@/dbConfig/dbConfig";
import checkRole from "@/helpter/checkRole";
import { Address } from "@/models/address.model";
import { NextResponse } from "next/server";

connect();

const checkUserRole = checkRole(0);

export async function PATCH(req, { params }) {
  try {
    const roleCheckResult = checkUserRole(req);
    if (roleCheckResult) {
      return roleCheckResult;
    }

    const reqBody = await req.json();

    const { address_item_id } = params;

    if (!reqBody) {
      return NextResponse.json(
        {
          message: "expected some values to update, no values found",
        },
        {
          status: 400,
        }
      );
    }

    const updatedAddress = {};
    Object.keys(reqBody).map((key) => {
      if (!!reqBody[key]) updatedAddress[key] = reqBody[key];
    });

    if (!updatedAddress) {
      return NextResponse.json(
        {
          message: "expected some values to update, no values found",
        },
        {
          status: 400,
        }
      );
    }

    const address = await Address.findOneAndUpdate(
      {
        user: userDetails._id,
        _id: address_item_id,
      },
      {
        $set: reqBody,
      }
    );

    if (!address) {
      return NextResponse.json(
        { message: "Address update failed" },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json({
      message: "Address updated.",
    });
  } catch (error) {
    console.log(error);
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
