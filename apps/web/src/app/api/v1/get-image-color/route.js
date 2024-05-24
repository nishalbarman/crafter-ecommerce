// export const dynamic = "force-dynamic"; // defaults to auto

// pages/api/getImageColors.js
import getImageColors from "get-image-colors";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { imageUrl } = await request.json();

    const imageColors = await getImageColors(imageUrl, { count: 5 });

    const [first, second, third, ...rest] = imageColors[0]["_rgb"];

    const averageColor = `${first},${second},${third}`;

    return NextResponse.json({ averageColor }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: true }, { status: 500 });
  }
}
