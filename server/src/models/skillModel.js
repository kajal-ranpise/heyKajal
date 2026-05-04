const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  val: { type: Number, required: true, min: 0, max: 100 },
  order: { type: Number, default: 0 },
});

module.exports = mongoose.model('Skill', skillSchema);
