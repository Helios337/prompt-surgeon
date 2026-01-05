import { GoogleGenAI, Type, Schema } from "@google/genai";
import { OptimizationResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const RESPONSE_SCHEMA: Schema = {
  type: Type.OBJECT,
  properties: {
    optimizedPrompt: {
      type: Type.STRING,
      description: "The complete, rewritten prompt using the Role-Task-Context-Format framework.",
    },
    analysis: {
      type: Type.OBJECT,
      description: "A breakdown of how the prompt was constructed.",
      properties: {
        role: { type: Type.STRING, description: "The persona or role assigned (e.g., 'Expert Data Scientist')." },
        task: { type: Type.STRING, description: "The specific action or objective." },
        context: { type: Type.STRING, description: "Background information, constraints, or audience details." },
        format: { type: Type.STRING, description: "The requested output structure (e.g., 'Markdown table')." },
      },
      required: ["role", "task", "context", "format"],
    },
  },
  required: ["optimizedPrompt", "analysis"],
};

export const optimizePromptWithGemini = async (messyPrompt: string): Promise<Omit<OptimizationResult, 'original'>> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: messyPrompt,
      config: {
        systemInstruction: `You are 'Prompt Surgeon', an expert AI prompt engineer. 
Your goal is to take a user's "messy" or vague input and rewrite it into a high-precision prompt using the 'Role-Task-Context-Format' (RTCF) framework.

1. **Role**: Assign a specific, expert persona.
2. **Task**: Define the clear, actionable objective.
3. **Context**: Add necessary background, constraints, or audience details.
4. **Format**: Specify exactly how the output should look.

Ensure the 'optimizedPrompt' is ready to copy-paste and use immediately.`,
        responseMimeType: "application/json",
        responseSchema: RESPONSE_SCHEMA,
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response text received from Gemini.");
    }

    const json = JSON.parse(text);
    return json as Omit<OptimizationResult, 'original'>;

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};