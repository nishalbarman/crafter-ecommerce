export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { connect } from "../../../../../dbConfig/dbConfig";
import checkRole from "@/helpter/checkRole";
import { Wishlist } from "@/models/wishlist.model";

connect();

const checkUserRole = checkRole(0);

export async function DELETE(req, { params }) {
  try {
    // check user role
    const roleCheckResult = checkUserRole(req);
    if (roleCheckResult) {
      return roleCheckResult;
    }

    const wishlistId = params.wishlistId;

    const wishlistDetails = await Wishlist.findByIdAndDelete(wishlistId);

    if (!wishlistDetails) {
      return NextResponse.json(
        {
          message: "Invalid Request: No wishlit found with the given id.",
        },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json({
      message: "Wishlist Deleted.",
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

// export async function DELETE(req, { params }) {
//   try {
//     const roleCheckResult = checkUserRole(req);
//     if (roleCheckResult) {
//       return roleCheckResult;
//     }

//     const wishlistId = params?.wishlistId;

//     const wishlistDetails = await Wishlist.findByIdAndDelete(wishlistId);

//     if (!wishlistDetails) {
//       return NextResponse.json(
//         {
//           message: "Invalid Request: Wishlist not found with given id",
//         },
//         {
//           status: 400,
//         }
//       );
//     }

//     return NextResponse.json({
//       message: "Wishlist deleted",
//     });
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json(
//       {
//         message: "Internal server error",
//       },
//       {
//         status: 500,
//       }
//     );
//   }
// }
