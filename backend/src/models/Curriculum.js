const mongoose = require('mongoose');

const curriculumSchema = new mongoose.Schema({
  goal: { type: String, required: true },
  existingSkills: [{ type: String }],
  level: { type: String },
  missingSkills: [{ type: String }],
  modules: [{
    moduleNumber: Number,
    title: String,
    level: String,
    topics: [String],
    objective: String
  }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Curriculum', curriculumSchema);
