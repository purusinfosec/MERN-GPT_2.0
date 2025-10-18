import app from "./app.js";
import { connectToDatabase } from "./db/connection.js";
import { config } from "dotenv";

config();

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    // Connect to MongoDB
    await connectToDatabase();
    console.log("✅ MongoDB connected successfully");

    // Start Express server
    app.listen(PORT, () => {
      console.log(`🚀 Backend running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
