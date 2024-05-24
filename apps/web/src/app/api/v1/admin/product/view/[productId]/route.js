import checkRole from "@/helpter/checkRole";
import { Order } from "@/models/order.model";
import { Product } from "@/models/product.model";
import { NextResponse } from "next/server";

const checkAdminRole = checkRole(1);

// export async function GET(req, { params }) {
//   try {
//     // check admin role
//     const roleCheckResult = checkAdminRole(req);
//     if (roleCheckResult) {
//       return roleCheckResult;
//     }

//     // const reqBody = await req.json();

//     const productType = "buy";

//     // check whether we have the product id or not
//     if (!params.productId) {
//       return NextResponse.redirect("/");
//     }

//     const product = await Product.findOne({ _id: params.productId }).populate([
//       "category",
//       { path: "productVariant" },
//     ]);

//     console.log("has user bought", {
//       product: params.productId,
//       user: req.user._id,
//       orderType: productType,
//       orderStatus: "Delivered",
//     });

//     const hasUserBoughtThisProduct = await Order.countDocuments({
//       product: params.productId,
//       user: req.user._id,
//       orderType: productType,
//       orderStatus: "Delivered",
//     });

//     if (!product) {
//       return NextResponse.json(
//         {
//           message: "Invalid request: Product not found.",
//         },
//         {
//           status: 400,
//         }
//       );
//     }

//     return res.status(200).json({
//       product,
//       hasUserBoughtThisProduct: !!hasUserBoughtThisProduct,
//     });
//   } catch (error) {
//     console.error(TAG, error);
//     return NextResponse.json(
//       { message: error.message },
//       {
//         status: 500,
//       }
//     );
//   }
// }
export async function GET(req, { params }) {
  try {
    // check admin role
    const roleCheckResult = checkAdminRole(req);
    if (roleCheckResult) {
      return roleCheckResult;
    }

    const productId = params.productId;

    // check whether we have the product id or not
    if (!productId) {
      return NextResponse.json(
        { message: "Product ID missing!" },
        {
          status: 400,
        }
      );
    }

    const product = await Product.findOne({ _id: productId }).populate([
      "category",
      "productVariant",
    ]);

    if (!product) {
      return res.status(404).json({ message: "No such product found." });
    }

    return res.status(200).json({
      product,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: error.message },
      {
        status: 500,
      }
    );
  }
}
