import mongoose from "mongoose";

export async function connectToDatabase(url) {
  return mongoose.connect(url);
}
