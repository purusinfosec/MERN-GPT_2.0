import app from "./app.js";
import { connectToDatabase } from "./db/connection.js";
import { config } from "dotenv";

config();

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await connectToDatabase();
    console.log("✅ MongoDB connected successfully");

    // ✅ Start server only when running locally
    if (process.env.NODE_ENV !== "production") {
      app.listen(PORT, () => {
        console.log(`🚀 Backend running locally on port ${PORT}`);
      });
    }
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
}

// Vercel will import this
export default app;

// Start locally (optional)
startServer();
