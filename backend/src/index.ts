import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import appRouter from "./routes/index.js";

config(); // ✅ Load environment variables

const app = express();

// ✅ Middlewares
app.use(
  cors({
    origin: "https://mern-gpt-2-0-frontend.vercel.app",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

// ✅ Database connection
const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("✅ MongoDB connected successfully!");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
  }
};
connectToDatabase();

// ✅ Root test route
app.get("/", (_req, res) => {
  res.send("✅ Backend is running on Vercel successfully!");
});

// ✅ API routes
app.use("/api/v1", appRouter);

export default app;
