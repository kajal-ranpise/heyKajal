const express = require('express');
const auth = require('../middleware/auth');
const c = require('../controllers/adminDataController');

const router = express.Router();
router.use(auth);

// About (singleton)
router.get('/about', c.getAbout);

router.put('/about', c.upsertAbout);

// Skills
router.get('/skills', c.getSkills);
router.post('/skills', c.createSkill);
router.put('/skills/:id', c.updateSkill);
router.delete('/skills/:id', c.deleteSkill);

// Stats
router.get('/stats', c.getStats);
router.post('/stats', c.createStat);
router.put('/stats/:id', c.updateStat);
router.delete('/stats/:id', c.deleteStat);

// Education
router.get('/education', c.getEducation);
router.post('/education', c.createEducation);
router.put('/education/:id', c.updateEducation);
router.delete('/education/:id', c.deleteEducation);

// Experience
router.get('/experience', c.getExperience);
router.post('/experience', c.createExperience);
router.put('/experience/:id', c.updateExperience);
router.delete('/experience/:id', c.deleteExperience);

// Projects
router.get('/projects', c.getProjects);
router.post('/projects', c.createProject);
router.put('/projects/:id', c.updateProject);
router.delete('/projects/:id', c.deleteProject);

// Services
router.get('/services', c.getServices);
router.post('/services', c.createService);
router.put('/services/:id', c.updateService);
router.delete('/services/:id', c.deleteService);

module.exports = router;
