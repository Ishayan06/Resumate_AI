const express    = require('express');
const router     = express.Router();
const { completeSession } = require('../controllers/sessionController');

// Import whichever auth middleware your app uses.
// Common patterns — uncomment the one that matches your project:
const authMiddleware = require('../middleware/authMiddleware');
// const { verifyToken } = require('../middleware/authMiddleware');
// const protect = require('../middleware/protect');

// POST /api/session/complete
// Marks today as practiced so the daily reminder is skipped
router.post('/complete', authMiddleware, completeSession);

module.exports = router;