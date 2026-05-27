const mongoose = require('mongoose');

const skillCategorySchema = new mongoose.Schema({
  category: { type: String, required: true },
  skills: { type: [String], default: [] },
  order: { type: Number, default: 0 },
});

module.exports = mongoose.model('SkillCategory', skillCategorySchema);
