const About = require('../models/aboutModel');
const Skill = require('../models/skillModel');
const Stat = require('../models/statModel');
const Education = require('../models/educationModel');
const Experience = require('../models/experienceModel');
const Project = require('../models/projectModel');
const Service = require('../models/serviceModel');

// ── About (singleton) ────────────────────────────────────────────────────────
exports.getAbout = async (req, res) => {
  const doc = await About.findOne();
  res.json(doc || {});
};

exports.upsertAbout = async (req, res) => {
  let doc = await About.findOne();
  if (doc) {
    Object.assign(doc, req.body);
    await doc.save();
  } else {
    doc = await About.create(req.body);
  }
  res.json(doc);
};

// ── Skills ───────────────────────────────────────────────────────────────────
exports.getSkills = async (req, res) => res.json(await Skill.find().sort('order'));
exports.createSkill = async (req, res) => res.status(201).json(await Skill.create(req.body));
exports.updateSkill = async (req, res) => {
  const doc = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true });
  doc ? res.json(doc) : res.status(404).json({ message: 'Not found' });
};
exports.deleteSkill = async (req, res) => {
  await Skill.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
};

// ── Stats ────────────────────────────────────────────────────────────────────
exports.getStats = async (req, res) => res.json(await Stat.find().sort('order'));
exports.createStat = async (req, res) => res.status(201).json(await Stat.create(req.body));
exports.updateStat = async (req, res) => {
  const doc = await Stat.findByIdAndUpdate(req.params.id, req.body, { new: true });
  doc ? res.json(doc) : res.status(404).json({ message: 'Not found' });
};
exports.deleteStat = async (req, res) => {
  await Stat.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
};

// ── Education ────────────────────────────────────────────────────────────────
exports.getEducation = async (req, res) => res.json(await Education.find().sort('order'));
exports.createEducation = async (req, res) => res.status(201).json(await Education.create(req.body));
exports.updateEducation = async (req, res) => {
  const doc = await Education.findByIdAndUpdate(req.params.id, req.body, { new: true });
  doc ? res.json(doc) : res.status(404).json({ message: 'Not found' });
};
exports.deleteEducation = async (req, res) => {
  await Education.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
};

// ── Experience ───────────────────────────────────────────────────────────────
exports.getExperience = async (req, res) => res.json(await Experience.find().sort('order'));
exports.createExperience = async (req, res) => res.status(201).json(await Experience.create(req.body));
exports.updateExperience = async (req, res) => {
  const doc = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true });
  doc ? res.json(doc) : res.status(404).json({ message: 'Not found' });
};
exports.deleteExperience = async (req, res) => {
  await Experience.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
};

// ── Projects ─────────────────────────────────────────────────────────────────
exports.getProjects = async (req, res) => res.json(await Project.find().sort('order'));
exports.createProject = async (req, res) => res.status(201).json(await Project.create(req.body));
exports.updateProject = async (req, res) => {
  const doc = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
  doc ? res.json(doc) : res.status(404).json({ message: 'Not found' });
};
exports.deleteProject = async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
};

// ── Services ─────────────────────────────────────────────────────────────────
exports.getServices = async (req, res) => res.json(await Service.find().sort('order'));
exports.createService = async (req, res) => res.status(201).json(await Service.create(req.body));
exports.updateService = async (req, res) => {
  const doc = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
  doc ? res.json(doc) : res.status(404).json({ message: 'Not found' });
};
exports.deleteService = async (req, res) => {
  await Service.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
};
