const mongoose = require('mongoose');

const statSchema = new mongoose.Schema({
  label: { type: String, required: true },
  end: { type: Number, required: true },
  order: { type: Number, default: 0 },
});

module.exports = mongoose.model('Stat', statSchema);
