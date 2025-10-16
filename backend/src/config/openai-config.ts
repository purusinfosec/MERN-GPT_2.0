// src/config/openai-config.ts
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();  // must come before anything that uses process.env

// ✅ Create client instance
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!, // required
  organization: process.env.OPENAI_ORGANIZATION_ID, // optional
});

// ✅ Use default export
export default openai;
