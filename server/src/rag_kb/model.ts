import dotenv from "dotenv"
dotenv.config()
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import type { BaseChatModel } from "@langchain/core/language_models/chat_models";

type ModelOpts = {
  temperature?: number;
  maxToken?: number;
};

export function getChatModel(opts: ModelOpts = {}): BaseChatModel {
  const temperature = opts.temperature ?? 0.2;
  const maxTokens = opts.maxToken ?? 1024;

  

  return new ChatGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_API_KEY!,
    model: process.env.GEMINI_MODEL!,
    temperature,
    maxOutputTokens: maxTokens
  });
}
