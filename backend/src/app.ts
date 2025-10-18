import express from "express";
import { config } from "dotenv";
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";

// Load environment variables
config();

const app = express();

// Middlewares

// CORS: only allow frontend domain and credentials
app.use(
  cors({
    origin: "https://mern-gpt-2-0-frontend.vercel.app", // frontend URL
    credentials: true, // required for cookies
  })
);

// Parse JSON requests
app.use(express.json());

// Cookie parser with secret for signed cookies
app.use(cookieParser(process.env.COOKIE_SECRET));

// Root test route
app.get("/", (_req, res) => {
  res.send("✅ Backend is running on Vercel successfully!");
});

// API routes
app.use("/api/v1", appRouter);

export default app;
