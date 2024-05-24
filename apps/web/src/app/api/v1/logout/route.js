const dynamic = "force-dynamic";

import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const response = NextResponse.json({
      message: "Logout successful",
    });

    response.cookies.delete("token");
    response.cookies.delete("name");
    response.cookies.delete("email");

    return response;
  } catch (error) {
    console.log("Is there any error --->", error);
    return NextResponse.json({ message: "Logout failed" }, { status: 500 });
  }
}
