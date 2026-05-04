const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  colorClass: { type: String, default: 'item-cyan' },
  icon: { type: String, default: 'bi-code-slash' },
  order: { type: Number, default: 0 },
});

module.exports = mongoose.model('Service', serviceSchema);
