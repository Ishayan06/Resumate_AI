const pool = require('../config/database');

// ─────────────────────────────────────────
// Save telegram username when user submits form
// Called by: POST /api/telegram/save-user
// ─────────────────────────────────────────
const saveTelegramUsername = async (req, res) => {
  try {
    const { userId, telegramUsername } = req.body;

    if (!userId || !telegramUsername) {
      return res.status(400).json({ error: 'Missing userId or telegramUsername' });
    }

    // Strip @ if user typed it
    const clean = telegramUsername.replace(/^@/, '').trim();

    const result = await pool.query(
      `UPDATE users SET telegram_username = $1 WHERE id = $2 RETURNING id`,
      [clean, userId]
    );

    if (result.rowCount === 0) {
      console.warn(`⚠️ No user found with id ${userId}`);
      return res.status(404).json({ error: 'User not found' });
    }

    console.log(`✅ Saved telegram username @${clean} for user ${userId}`);
    return res.status(200).json({ success: true });

  } catch (err) {
    console.error('❌ saveTelegramUsername error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
};

// ─────────────────────────────────────────
// Telegram webhook — fires when user messages the bot
// Telegram calls this automatically
// Called by: POST /api/telegram/webhook
// ─────────────────────────────────────────
const handleWebhook = async (req, res) => {
  // Always respond 200 FIRST — Telegram requires this within 5 seconds
  res.status(200).json({ ok: true });

  try {
    const body = req.body;
    const message = body?.message;

    if (!message) return;

    const chatId   = message.chat?.id;
    const text     = message.text || '';
    const username = message.from?.username;

    console.log(`📨 Webhook received | chat_id: ${chatId} | text: ${text} | username: @${username}`);

    // Only handle /start command
    if (!text.startsWith('/start')) return;

    // /start can carry userId as payload: /start abc123
    const parts  = text.split(' ');
    const userId = parts[1] || null;

    let linked = false;

    if (userId && chatId) {
      // Best case — match by userId from deep link
      const result = await pool.query(
        `UPDATE users SET telegram_chat_id = $1 WHERE id = $2 RETURNING id`,
        [chatId, userId]
      );
      if (result.rowCount > 0) {
        linked = true;
        console.log(`✅ Linked chat_id ${chatId} to userId ${userId}`);
      } else {
        console.warn(`⚠️ No user found with id ${userId}`);
      }
    }

    // Fallback — match by telegram_username even if userId was provided but failed
    if (!linked && username && chatId) {
      const result = await pool.query(
        `UPDATE users SET telegram_chat_id = $1 WHERE telegram_username = $2 RETURNING id`,
        [chatId, username]
      );
      if (result.rowCount > 0) {
        linked = true;
        console.log(`✅ Linked chat_id ${chatId} to @${username} (fallback)`);
      } else {
        console.warn(`⚠️ No user found with username @${username}`);
      }
    }

    // Send welcome message
    await sendMessage(chatId,
      `👋 Welcome! You're now connected to *DailySpeakBot*.\n\n` +
      `Every morning you'll get a reminder to practice your English speaking skills.\n\n` +
      `🎙 Keep practicing and earn points daily!`
    );

  } catch (err) {
    console.error('❌ handleWebhook error:', err);
  }
};

// ─────────────────────────────────────────
// Register webhook URL with Telegram
// Call this once: GET /api/telegram/set-webhook
// ─────────────────────────────────────────
const setWebhook = async (req, res) => {
  const token      = process.env.TELEGRAM_BOT_TOKEN;
  const webhookUrl = `${process.env.APP_URL}/api/telegram/webhook`;

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${token}/setWebhook`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: webhookUrl }),
      }
    );
    const data = await response.json();
    console.log('setWebhook result:', data);
    return res.json(data);
  } catch (err) {
    console.error('❌ setWebhook error:', err);
    return res.status(500).json({ error: 'Failed to set webhook' });
  }
};

// ─────────────────────────────────────────
// Check current webhook info
// Call: GET /api/telegram/webhook-info
// ─────────────────────────────────────────
const getWebhookInfo = async (req, res) => {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  try {
    const response = await fetch(
      `https://api.telegram.org/bot${token}/getWebhookInfo`
    );
    const data = await response.json();
    return res.json(data);
  } catch (err) {
    console.error('❌ getWebhookInfo error:', err);
    return res.status(500).json({ error: 'Failed to get webhook info' });
  }
};

// ─────────────────────────────────────────
// Helper — send a single Telegram message
// ─────────────────────────────────────────
const sendMessage = async (chatId, text) => {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'Markdown',
      }),
    });
    const data = await response.json();
    if (!data.ok) {
      console.error(`❌ Telegram sendMessage failed for chat_id ${chatId}:`, data);
    }
    return data;
  } catch (err) {
    console.error(`❌ sendMessage error for chat_id ${chatId}:`, err);
  }
};

module.exports = { saveTelegramUsername, handleWebhook, setWebhook, getWebhookInfo };