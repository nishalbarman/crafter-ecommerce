import { v4 as uuidv4 } from "uuid";
import { Storage } from "@google-cloud/storage";
import serviceAccount from "./serviceAccountKey.json" with { type: "json" };

const storage = new Storage({
  projectId: "***REMOVED***",
  credentials: serviceAccount,
});

const bucket = storage.bucket("crafter-ecommerce.appspot.com");

export async function uploadImage(buffer, file) {
  const uniqueFileName = uuidv4();
  const fileReference = bucket.file("/images/products/" + uniqueFileName);

  const blobSteam = fileReference.createWriteStream({
    resumable: false,
    contentType: file.type,
  });

  blobSteam.on("error", (error) => {
    throw error;
  });

  blobSteam.on("finish", async () => {
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
    return publicUrl;
  });

  blobSteam.end(buffer);
}
