const express = require('express');
const router  = express.Router();
const auth    = require('../middleware/authMiddleware');

const { getPlan, setPlan }              = require('../controllers/planController');
const { getProgress, updateQuestion }   = require('../controllers/progressController');
const { getStreak, updateStreak }       = require('../controllers/streakController');

// Plan
router.get ('/user/plan',                  auth, getPlan);
router.post('/user/plan',                  auth, setPlan);

// Progress
router.get ('/user/progress',              auth, getProgress);
router.post('/user/progress/question',     auth, updateQuestion);

// Streak + heatmap
router.get ('/streak',                     auth, getStreak);
router.post('/streak/update',              auth, updateStreak);

module.exports = router;