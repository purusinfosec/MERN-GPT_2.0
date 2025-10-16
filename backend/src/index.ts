import app from "./app.js";
import { connectToDatabase } from "./db/connection.js";

const PORT = process.env.PORT || 5000;

// 🟢 Connect to DB and export handler (Vercel will use this)
connectToDatabase()
  .then(() => {
    console.log("✅ Connected to Database");

    // Only listen locally (for development)
    if (process.env.NODE_ENV !== "production") {
      app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
    }
  })
  .catch((err) => console.error("❌ Database Connection Error:", err));

// 🟢 Export Express app for Vercel
export default app;
