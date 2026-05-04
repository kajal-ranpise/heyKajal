const express = require('express');
const { getProfile, createProfile, updateProfile, deleteProfile } = require('../controllers/profileController');

const router = express.Router();

router.get('/:id', getProfile);
router.post('/', createProfile);
router.put('/:id', updateProfile);
router.delete('/:id', deleteProfile);

module.exports = router;