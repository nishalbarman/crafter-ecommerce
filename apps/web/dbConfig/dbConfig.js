import mongoose from "mongoose";

export const connect = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI || "YOUR MONGODB URI/API";
    mongoose.connect(MONGO_URI);
    mongoose.on("connected", () => {
      console.log("Database is ready to use!");
    });
    mongoose.on("error", (err) => {
      console.log("Database error! ------->", err);
      process.exit();
    });
  } catch (err) {
    console.log("Mongoose error ---------->", err);
  }
};
