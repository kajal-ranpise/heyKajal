const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
  name: { type: String, default: '' },
  role: { type: String, default: '' },
  description: { type: String, default: '' },
  phone: { type: String, default: '' },
  location: { type: String, default: '' },
  email: { type: String, default: '' },
  degree: { type: String, default: '' },
  availability: { type: String, default: '' },
  github: { type: String, default: '' },
  linkedin: { type: String, default: '' },
  dob: { type: String, default: '' },
  heroTitle: { type: String, default: '' },
  heroSubtitle: { type: String, default: '' },
});

module.exports = mongoose.model('About', aboutSchema);
