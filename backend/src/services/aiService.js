const { GoogleGenAI } = require("@google/genai");

exports.callLLM = async (prompt) => {
  const apiKey = process.env.AI_API_KEY;

  if (!apiKey || apiKey === "your_actual_api_key_here") {
    throw new Error("Gemini API key not configured");
  }

  // Initialize the Gemini client
  const ai = new GoogleGenAI({ apiKey: apiKey });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        // Enforce JSON output for structured extraction
        responseMimeType: "application/json",
      },
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
