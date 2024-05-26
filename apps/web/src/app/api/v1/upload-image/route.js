import { NextResponse } from "next/server";
import { uploadImage } from "firebase-utils";
import { isValidImage } from "validator";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") || null;

    if (!file) {
      return NextResponse.json(
        { message: "File blob is required." },
        { status: 400 }
      );
    }

    if (!isValidImage(file)) {
      return NextResponse.json(
        {
          message:
            "Image is not valid. Acceptable files image/png, image/jpg, image/jpeg, image/webp and image/gif",
        },
        { status: 400 }
      );
    }

    console.log(file.type);

    const buffer = Buffer.from(await file.arrayBuffer());
    let publicUrl;
    try {
      publicUrl = await uploadImage(buffer, file);
    } catch (err) {
      console.log(err);
      return NextResponse.json({ message: err.message }, { status: 403 });
    }

    return NextResponse.json({
      status: true,
      message: "Image uploaded",
      publicUrl: publicUrl,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: false, message: error.message });
  }
}
