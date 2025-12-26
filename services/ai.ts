import { GoogleGenAI } from "@google/genai";

export const getCareerAdvice = async (query: string): Promise<string> => {
  try {
    // Initializing with named parameter as per guidelines
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a professional career counselor at a top university in Bangladesh. 
                 Provide a strategic, encouraging, and detailed response to this query: "${query}". 
                 Focus on the Bangladeshi job market (MNCs, local conglomerates, startups). 
                 Limit the response to 150-200 words.`,
      config: {
        systemInstruction: "You are the TICCarrierclub's virtual mentor. Your tone is executive, supportive, and highly knowledgeable about global and local career trends."
      }
    });
    // response.text is a property, not a method
    return response.text || "I'm unable to process that right now. Please try again later.";
  } catch (error) {
    console.error("Gemini AI Error:", error);
    return "The AI counselor is currently offline. Please check back later.";
  }
};