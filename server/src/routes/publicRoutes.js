const express = require('express');
const c = require('../controllers/adminDataController');

const router = express.Router();

router.get('/about', c.getAbout);
router.get('/skills', c.getSkills);
router.get('/stats', c.getStats);
router.get('/education', c.getEducation);
router.get('/experience', c.getExperience);
router.get('/projects', c.getProjects);
router.get('/services', c.getServices);

module.exports = router;
