const topicsData = require("../data/topics.json");

exports.createCurriculum = (extractedData) => {
  const { skills } = extractedData;
  const userSkillsLower = skills.map((s) => s.toLowerCase());

  const missingSkills = [];
  const curriculum = [];

  // 1. Skill Gap Analysis
  Object.entries(topicsData).forEach(([topicName, data]) => {
    if (!userSkillsLower.includes(topicName.toLowerCase())) {
      missingSkills.push({ name: topicName, ...data });
    }
  });

  extractedData.missingSkills = missingSkills.map((m) => m.name);

  // 2. Prerequisite Sorting & Module Generation
  // Sort missing skills by predefined curriculum order to respect prerequisites
  missingSkills.sort((a, b) => a.order - b.order);

  let moduleCounter = 1;
  missingSkills.forEach((skill) => {
    curriculum.push({
      module: moduleCounter++,
      title: skill.name,
      level: skill.level,
      topics: skill.subtopics,
      objective: `Master ${skill.name} fundamentals and applications.`,
    });
  });

  return curriculum;
};
