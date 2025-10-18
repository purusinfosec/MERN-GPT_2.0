import express from "express";
import { config } from "dotenv";
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";

config();

const app = express();

// ✅ CORS setup – allow only production frontend
app.use(cors({
  origin: ["https://mern-gpt-2-0-frontend.vercel.app"],
  credentials: true,
}));

// ✅ Middleware
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

// ✅ MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("🟢 MongoDB connected successfully!");
  } catch (error) {
    console.error("🔴 MongoDB connection failed:", error.message);
  }
};
connectDB();

// ✅ Default route (for Vercel status check)
app.get("/", async (_req, res) => {
  const dbState = mongoose.connection.readyState;
  const isDBConnected = dbState === 1 ? "🟢 Connected" : "🔴 Not Connected";

  res.send(`
    <div style="font-family: monospace; color: #00ff99;">
      ✅ Backend is running on Vercel successfully!<br>
      Database Status: ${isDBConnected}
    </div>
  `);
});

// ✅ API routes
app.use("/api/v1", appRouter);

export default app;
