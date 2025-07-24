import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

export const gptModal = new ChatGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
  model: "gemini-1.5-flash",
  temperature: 0.3,
  maxOutputTokens: 16000,
});
