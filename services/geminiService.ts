
import { GoogleGenAI } from "@google/genai";
import { SystemCategory, Difficulty, Question } from "../types";
import { getQuestionsForCategory } from "./questionBank";

// For Vite/Cloudflare, environment variables must be prefixed with VITE_
const apiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY || "";

// Validate API key is present
const isApiKeyConfigured = (): boolean => {
  return apiKey.length > 10 && apiKey.startsWith("AIza");
};

// Create AI instance only if key is valid (used for post-quiz analysis only)
let ai: GoogleGenAI | null = null;
if (isApiKeyConfigured()) {
  ai = new GoogleGenAI({ apiKey });
}

/**
 * Returns questions for a category INSTANTLY from the static question bank.
 * No API call needed — questions are bundled from test-questions/*.md files.
 */
export const generateQuestionsForCategory = async (
  category: SystemCategory
): Promise<Question[]> => {
  return getQuestionsForCategory(category);
};

export const analyzeTechnicianLevel = async (
  category: SystemCategory,
  answers: { question: Question; isCorrect: boolean }[]
): Promise<string> => {
  const prompt = `Act as the CTO for 3D Technology Services. 
  Perform a deep-dive audit on a technician's evaluation in ${category}. 
  
  DATA: ${JSON.stringify(answers.map(a => ({
    difficulty: a.question.difficulty,
    correct: a.isCorrect,
    topic: a.question.topic,
    text: a.question.text
  })))}
  
  OBJECTIVE:
  1. Audit their understanding of Manufacturer Hardware Functions (what the device actually does in a system).
  2. Assess Programming Logic proficiency (ability to configure software for specific outcomes).
  3. Verify knowledge of Regulatory Codes (OSHA, NEC, NFPA).
  4. State clearly if they are ready for Lead/Journeyman status.
  
  Format in professional Markdown.`;

  // Check if API is configured
  if (!ai) {
    throw new Error("API_KEY_MISSING: Please add VITE_GEMINI_API_KEY to Cloudflare environment variables.");
  }

  const response = await ai.models.generateContent({
    model: "gemini-3.1-pro-preview",
    contents: prompt,
  });

  return response.text || "Diagnostic failed.";
};
