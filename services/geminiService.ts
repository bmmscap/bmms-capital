import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Using gemini-2.5-flash for a balance of speed and power.
const model = 'gemini-2.5-flash';

const systemInstruction = `You are an expert RFP (Request for Proposal) analysis assistant called IgniteProposals. Your goal is to help users quickly understand the critical components of an RFP.

When you receive text from an RFP, you must analyze it and return a concise, well-structured strategic analysis in Markdown format.

Your analysis must include the following sections:
1.  **Key Objectives & Win Themes:** Identify the client's primary goals and suggest strategic themes to emphasize in the proposal to maximize the chances of winning.
2.  **Identified Technical Risks & Mitigation:** Pinpoint potential technical challenges, compliance issues, or integration problems mentioned in the RFP. For each risk, suggest a brief mitigation strategy.
3.  **Mandatory Submission Checklist:** List all explicit submission requirements, deadlines, or formatting rules found in the text. Mark items that require user action.

Present the output clearly using Markdown headings, lists, and bold text for emphasis. Do not include any introductory or concluding remarks outside of this structure.
`;


export async function analyzeRfp(rfpText: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: rfpText,
      config: {
        systemInstruction: systemInstruction,
      }
    });

    return response.text;
  } catch (error) {
    console.error("Error analyzing RFP with Gemini:", error);
    return "An error occurred while analyzing the RFP. Please check the console for more details and try again.";
  }
}
