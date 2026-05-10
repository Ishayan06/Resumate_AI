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

    await pool.query(
      `UPDATE users SET telegram_username = $1 WHERE id = $2`,
      [clean, userId]
    );

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
  try {
    const body = req.body;
    const message = body?.message;

    // Always respond 200 immediately — Telegram requires this
    res.status(200).json({ ok: true });

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

    if (userId && chatId) {
      // Best case — match by userId from deep link
      const result = await pool.query(
        `UPDATE users SET telegram_chat_id = $1 WHERE id = $2 RETURNING id`,
        [chatId, userId]
      );
      if (result.rowCount > 0) {
        console.log(`✅ Linked chat_id ${chatId} to userId ${userId}`);
      } else {
        console.warn(`⚠️ No user found with id ${userId}`);
      }
    } else if (username && chatId) {
      // Fallback — match by telegram_username
      const result = await pool.query(
        `UPDATE users SET telegram_chat_id = $1 WHERE telegram_username = $2 RETURNING id`,
        [chatId, username]
      );
      if (result.rowCount > 0) {
        console.log(`✅ Linked chat_id ${chatId} to @${username}`);
      } else {
        console.warn(`⚠️ No user found with username @${username}`);
      }
    }

    // Send welcome message back to user
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

module.exports = { saveTelegramUsername, handleWebhook };