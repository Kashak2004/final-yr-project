const { callLLM } = require("./aiService");
const topicsData = require("../data/topics.json");

exports.processStudentInput = async (goal, skillsText, level) => {
  const prompt = `
    Analyze the following student profile:
    Goal: ${goal}
    Skills: ${skillsText}
    Level: ${level}
    
    Extract the goal, a standardized array of existing skills, and the user's level.
    Return STRICTLY JSON format: { "goal": "...", "skills": ["..."], "level": "..." }
  `;

  try {
    // Attempt AI processing
    const aiResponse = await callLLM(prompt);
    return JSON.parse(aiResponse);
  } catch (error) {
    console.log(
      "AI API unavailable or failed. Using NLP deterministic fallback.",
    );
    return fallbackNLP(goal, skillsText, level);
  }
};

// DETERMINISTIC FALLBACK
function fallbackNLP(goal, skillsText, level) {
  const normalizedText = skillsText.toLowerCase();
  const existingSkills = [];

  // Keyword extraction based on known knowledge graph
  Object.keys(topicsData).forEach((topic) => {
    if (normalizedText.includes(topic.toLowerCase())) {
      existingSkills.push(topic);
    }
  });

  return {
    goal: goal,
    skills: existingSkills,
    level: level.toLowerCase(),
  };
}
