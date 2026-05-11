const express = require('express');
const router  = express.Router();
const auth    = require('../middleware/authMiddleware');
const { getStreak, updateStreak } = require('../controllers/streakController');

router.get ('/',       auth, getStreak);
router.post('/update', auth, updateStreak);

module.exports = router;