import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import appRouter from "./routes/index.js";
import userRoutes from "./routes/user-routes.js";
import { connectToDatabase } from "./db/connection.js";

dotenv.config();

const app = express();

// ==========================
// 🔹 CORS Configuration
// ==========================
const allowedOrigins = [
  "http://localhost:5173",                   // Local dev
  "https://mern-gpt-1-1-prefinal.vercel.app" // Deployed frontend
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // allow Postman/curl
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
}));

// ==========================
// 🔹 Core Middlewares
// ==========================
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

// ==========================
// 🔹 Logger (only in development)
// ==========================
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// ==========================
// 🔹 Routes
// ==========================
app.use("/api/v1/user", userRoutes); // Auth routes
app.use("/api/v1", appRouter);       // Other routes

// ==========================
// 🔹 Health Check
// ==========================
app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is running successfully ✅" });
});

// ==========================
// 🔹 Database
// ==========================
connectToDatabase();

export default app;
