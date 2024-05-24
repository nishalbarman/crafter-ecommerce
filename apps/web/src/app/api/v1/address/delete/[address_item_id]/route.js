import { connect } from "@/dbConfig/dbConfig";
import checkRole from "@/helpter/checkRole";
import { Address } from "@/models/address.model";
import { NextResponse } from "next/server";

connect();

const checkUserRole = checkRole(0);

export async function DELETE(req, { params }) {
  try {
    const roleCheckResult = checkUserRole(req);
    if (roleCheckResult) {
      return roleCheckResult;
    }

    const { address_item_id } = params;

    const addressDetails = await Address.findOneAndDelete({
      _id: address_item_id,
      user: userDetails._id,
    });

    if (!addressDetails) {
      return NextResponse.json(
        {
          message: "No address found with provided id!",
        },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json({
      message: "Address deleted",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
