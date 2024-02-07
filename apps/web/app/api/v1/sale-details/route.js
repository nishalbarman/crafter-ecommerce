import { NextResponse } from "next/server";
import { connect } from "../../../../dbConfig/dbConfig";

connect();

const TAG = "sale-detais/route.js:->";

export async function GET(req) {
  try {
    return NextResponse.json({ data: [], status: true }, { status: 200 });
  } catch (error) {
    console.log(TAG, error);
    return NextResponse.json({ message: "Failed" }, { status: 500 });
  }
}
