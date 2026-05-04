const express = require('express');
const { login, seedAdmin } = require('../controllers/authController');

const router = express.Router();

router.post('/login', login);
// One-time seed endpoint to create the first admin account
router.post('/seed', seedAdmin);

module.exports = router;
