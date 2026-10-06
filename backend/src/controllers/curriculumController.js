const { processStudentInput } = require('../services/nlpService');
const { createCurriculum } = require('../services/curriculumService');
const Curriculum = require('../models/Curriculum');

exports.generateCurriculum = async (req, res) => {
  try {
    const { goal, skills, level } = req.body;
    
    if (!goal || !skills) {
      return res.status(400).json({ success: false, message: "Goal and skills are required." });
    }

    // 1. NLP Layer
    const extractedData = await processStudentInput(goal, skills, level);

    // 2. Curriculum Engine
    const curriculumResult = createCurriculum(extractedData);

    // 3. Save to MongoDB
    // We wrap this in a try-catch so that if your local MongoDB is off during a demo, 
    // it just skips saving instead of crashing the whole app.
    try {
      const newCurriculum = new Curriculum({
        goal: extractedData.goal,
        existingSkills: extractedData.skills,
        level: extractedData.level,
        missingSkills: extractedData.missingSkills,
        modules: curriculumResult.map(mod => ({
          moduleNumber: mod.module,
          title: mod.title,
          level: mod.level,
          topics: mod.topics,
          objective: mod.objective
        }))
      });
      await newCurriculum.save();
      console.log("Curriculum successfully saved to MongoDB!");
    } catch (dbError) {
      console.log("Could not save to MongoDB. (Ensure MongoDB compass/server is running locally)", dbError.message);
    }

    // 4. Return to React
    res.status(200).json({
      success: true,
      analysis: extractedData,
      curriculum: curriculumResult
    });
  } catch (error) {
    console.error("Curriculum generation error:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};
