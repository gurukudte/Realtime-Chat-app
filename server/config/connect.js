import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()
const MONGO_URI = process.env.MONGO_URI;

mongoose.set("strictQuery", true);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(`${MONGO_URI}`);
    console.log(`MongoDB connected to: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
