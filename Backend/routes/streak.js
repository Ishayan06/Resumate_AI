const express = require('express');
const router = express.Router();
const { updateStreak } = require('../controllers/streakController');
const authMiddleware = require('../middleware/authMiddleware'); // your existing JWT middleware

router.post('/streak', authMiddleware, updateStreak);

module.exports = router;