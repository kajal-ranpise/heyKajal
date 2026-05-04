const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
  degree: { type: String, required: true },
  year: { type: String, required: true },
  institute: { type: String, required: true },
  description: { type: String, default: '' },
  order: { type: Number, default: 0 },
});

module.exports = mongoose.model('Education', educationSchema);
