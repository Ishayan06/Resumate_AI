const express = require('express');
const router  = express.Router();
const { sendDailyReminders } = require('../controllers/reminderController');

// Triggered by cron job every morning
router.post('/send-daily', sendDailyReminders);

module.exports = router;