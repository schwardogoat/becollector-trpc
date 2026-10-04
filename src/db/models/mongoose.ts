import mongoose from "mongoose";
import { env } from "../../config/env.js";

export const connectDB = async () => {
  await mongoose.connect(env.DATABASE_URL, {
    dbName: "main"
  });

  console.log("MongoDB connected");
};