const express = require('express');
const router  = express.Router();
const { saveTelegramUsername, handleWebhook } = require('../controllers/telegramController');

// Save username when user submits the onboarding form
router.post('/save-user', saveTelegramUsername);

// Telegram calls this automatically when someone messages your bot
router.post('/webhook', handleWebhook);

module.exports = router;