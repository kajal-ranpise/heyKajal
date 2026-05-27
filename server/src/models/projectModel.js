const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  desc: { type: String, default: '' },
  industry: { type: String, default: '' },
  tech: [{ type: String }],
  category: [{ type: String }],
  imgUrl: { type: String, default: '' },
  liveUrl: { type: String, default: '' },
  githubUrl: { type: String, default: '' },
  features: [{ type: String }],
  responsibilities: [{ type: String }],
  challenges: [{ challenge: { type: String, default: '' }, solution: { type: String, default: '' } }],
  outcome: { type: String, default: '' },
  client: { type: String, default: '' },
  year: { type: Number },
  order: { type: Number, default: 0 },
});

module.exports = mongoose.model('Project', projectSchema);
