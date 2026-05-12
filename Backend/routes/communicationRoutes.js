const express = require('express');
const router = express.Router();
const { updatePoints, getPoints } = require('../controllers/communicationController');
const authMiddleware = require('../middleware/auth'); // same as your other routes

router.post('/update-points', authMiddleware, updatePoints);
router.get('/points', authMiddleware, getPoints);

module.exports = router;