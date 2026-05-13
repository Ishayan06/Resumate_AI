const express = require('express');
const router  = express.Router();
const {
  saveTelegramUsername,
  handleWebhook,
  setWebhook,
  getWebhookInfo,
} = require('../controllers/telegramController');

// POST /api/telegram/save-user   — save Telegram username from frontend form
router.post('/save-user', saveTelegramUsername);

// POST /api/telegram/webhook     — Telegram calls this on every message
router.post('/webhook', handleWebhook);

// GET  /api/telegram/set-webhook — call once to register the webhook with Telegram
router.get('/set-webhook', setWebhook);

// GET  /api/telegram/webhook-info — check current webhook status
router.get('/webhook-info', getWebhookInfo);

module.exports = router;