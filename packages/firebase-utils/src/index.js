import { v4 as uuidv4 } from "uuid";
// import { Storage } from "@google-cloud/storage";
import serviceAccount from "./service-account-key.json" with { type: "json" };

// const storage = new Storage({
//   projectId: "***REMOVED***",
//   credentials: serviceAccount,
// });

const bucket = storage.bucket("crafter-ecommerce.appspot.com");

export async function uploadImage(buffer, file) {
  const uniqueFileName = uuidv4();
  const fileReference = bucket.file(`images/products/${uniqueFileName}`);

  const writeFilePromise = await new Promise((resolve, reject) => {
    const blobSteam = fileReference.createWriteStream({
      resumable: false,
      contentType: file.type,
    });

    blobSteam.on("error", (error) => {
      reject(error);
    });

    blobSteam.on("finish", async () => {
      await fileReference.makePublic();
      const publicUrl = `https://storage.googleapis.com/crafter-ecommerce.appspot.com/${fileReference.name}`;
      resolve(publicUrl);
    });

    blobSteam.end(buffer);
  });
  return writeFilePromise;
}
