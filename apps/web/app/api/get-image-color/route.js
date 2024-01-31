export const dynamic = "force-dynamic"; // defaults to auto

// pages/api/getImageColors.js
import getImageColors from "get-image-colors";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // const { searchParams } = new URL(request.url);
    // const imageUrl = searchParams.get("imageUrl");

    const { imageUrl } = await request.json();

    console.log("All queries that we recieve --->", imageUrl);
    const imageColors = await getImageColors(imageUrl, { count: 5 });
    console.log("Image Color --->", imageColors);
    const [first, second, third, ...rest] = imageColors[0]["_rgb"];
    // const averageColor = imageColors[0]["_rgb"].join(",");
    const averageColor = `${first},${second},${third}`;
    return NextResponse.json({ averageColor }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: true }, { status: 500 });
  }
}
