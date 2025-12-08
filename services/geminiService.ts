import { GoogleGenAI } from "@google/genai";
import { CHATBOT_CONTEXT } from "../constants";

let ai: GoogleGenAI | null = null;

const getAIClient = () => {
  if (!ai) {
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return ai;
};

export const sendMessageToGemini = async (
  message: string,
  history: { role: 'user' | 'model'; text: string }[]
): Promise<string> => {
  try {
    const client = getAIClient();
    
    // The history array passed from the component includes the *current* user message at the end.
    // The Gemini `sendMessage` method takes the current message as an argument.
    // We must pass only the *previous* messages in the history config to avoid duplication.
    const previousHistory = history.slice(0, -1);

    const chat = client.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: CHATBOT_CONTEXT,
        temperature: 0.7,
      },
      history: previousHistory.map(h => ({
        role: h.role === 'model' ? 'model' : 'user',
        parts: [{ text: h.text }]
      }))
    });

    const response = await chat.sendMessage({ message });
    return response.text || "I apologize, I couldn't generate a response at this moment.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Something went wrong. Please try again later.";
  }
};