
import { GoogleGenAI } from "@google/genai";

// Assume process.env.API_KEY is available in the environment
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("Gemini API key not found. Assistant feature will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const getPatternRecommendation = async (
  useCase: string,
  constraints: string[]
): Promise<string> => {
  if (!API_KEY) {
    return Promise.resolve("The AI assistant is currently unavailable because the API key is not configured. Please check the documentation to set up your API key.");
  }

  const prompt = `
    As an expert in software architecture specializing in messaging and event-driven systems, 
    your task is to recommend the most suitable architectural pattern(s) based on user-provided constraints.

    User's Use Case:
    "${useCase}"

    User's Key Constraints and Priorities:
    - ${constraints.join("\n- ")}

    Based on this information, provide a recommendation. Your response should be in clear, concise markdown format and include:
    1.  **Top Recommendation(s):** Name the primary pattern(s) you suggest (e.g., Message Queue, Event Sourcing).
    2.  **Justification:** Briefly explain *why* this pattern is a good fit, directly referencing the user's use case and constraints.
    3.  **Potential Considerations:** Mention any important trade-offs or alternative patterns the user might consider.

    Keep the explanation educational and easy to understand for developers and architects. Do not repeat the prompt.
  `;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-pro',
        contents: prompt,
        config: {
          thinkingConfig: {
            thinkingBudget: 32768,
          }
        }
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "An error occurred while communicating with the AI assistant. Please check the console for more details.";
  }
};
