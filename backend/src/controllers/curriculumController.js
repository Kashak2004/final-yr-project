const { processStudentInput } = require("../services/nlpService");
const { createCurriculum } = require("../services/curriculumService");

exports.generateCurriculum = async (req, res) => {
  try {
    const { goal, skills, level } = req.body;

    if (!goal || !skills) {
      return res
        .status(400)
        .json({ success: false, message: "Goal and skills are required." });
    }

    // 1. NLP Layer: Extract structured data from natural language / input
    const extractedData = await processStudentInput(goal, skills, level);

    // 2. Curriculum Engine: Gap analysis & sequencing
    const curriculumResult = createCurriculum(extractedData);

    res.status(200).json({
      success: true,
      analysis: extractedData,
      curriculum: curriculumResult,
    });
  } catch (error) {
    console.error("Curriculum generation error:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};
