import mongoose from "mongoose";
import { connect } from "../../../../dbConfig/dbConfig";
import { Banner as BannerDBModel } from "../../../../models/models";
import { NextResponse } from "next/server";

connect();

export const dynamic = "force-dynamic"; // defaults to auto

export async function GET(req) {
  try {
    const { limit } = req.nextUrl.searchParams;

    const bannerList = await BannerDBModel.find({})
      .sort({ createdAt: "desc" })
      .limit(limit);
    if (bannerList) {
      return NextResponse.json({ status: true, data: bannerList });
    }
    return NextResponse.json({ status: false, message: "No Banner Found" });
  } catch (err) {
    console.log(err);
    if (err instanceof mongoose.Error) {
      /* I added custom validator functions in mongoose models, so the code is to chcek whether the errors are from mongoose or not */
      const errArray = [];
      for (let key in err.errors) {
        errArray.push(err.errors[key].properties.message);
      }

      return NextResponse.json(
        { status: false, message: errArray.join(", ").replaceAll(" Path", "") },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { status: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
