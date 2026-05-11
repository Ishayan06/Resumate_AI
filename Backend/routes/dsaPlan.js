const express = require('express');
const router  = express.Router();
const auth    = require('../middleware/authMiddleware');
const { startPlan, changeDuration, completeDay, getPlan } = require('../controllers/dsaPlanController');

router.get ('/',                auth, getPlan);
router.post('/start',           auth, startPlan);
router.post('/complete-day',    auth, completeDay);
router.post('/change-duration', auth, changeDuration);

module.exports = router;