const pool = require('../config/database');

const REMINDER_MESSAGES = [
  '🎙 Time to practice! Open your daily English speaking session and earn points today.',
  '👄 Your voice is your superpower! Spend 5 minutes speaking English today.',
  '🔥 Don\'t break your streak! Your daily English practice is waiting.',
  '💬 A 5-minute speaking session a day builds fluency fast. Let\'s go!',
  '🏆 You\'re doing great! Keep up your daily English practice today.',
  '🌅 Good morning! Start your day with 5 minutes of English speaking.',
  '⭐ Small daily habits create big results. Practice English today!',
];

// ─────────────────────────────────────────
// Send daily reminders to ALL connected users
// Called by: POST /api/reminder/send-daily
// Protected by CRON_SECRET header
// ─────────────────────────────────────────
const sendDailyReminders = async (req, res) => {
  try {
    // Verify secret so only your cron job can trigger this
    const authHeader = req.headers['authorization'];
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const appUrl = process.env.APP_URL || 'https://yourapp.com';

    // Fetch all users who have connected their Telegram
    const result = await pool.query(
      `SELECT id, telegram_chat_id 
       FROM users 
       WHERE telegram_chat_id IS NOT NULL`
    );

    const users = result.rows;
    console.log(`📤 Sending daily reminders to ${users.length} users...`);

    let sent   = 0;
    let failed = 0;
    const errors = [];

    for (const user of users) {
      // Pick a random message each time
      const msg = REMINDER_MESSAGES[
        Math.floor(Math.random() * REMINDER_MESSAGES.length)
      ];

      try {
        const response = await fetch(
          `https://api.telegram.org/bot${token}/sendMessage`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: user.telegram_chat_id,
              text: msg,
              parse_mode: 'Markdown',
              reply_markup: {
                inline_keyboard: [[
                  {
                    text: '🎙 Start Today\'s Session',
                    url: `${appUrl}/comm`,
                  },
                ]],
              },
            }),
          }
        );

        const data = await response.json();

        if (data.ok) {
          sent++;
          console.log(`✅ Sent to user ${user.id} (chat_id: ${user.telegram_chat_id})`);
        } else {
          failed++;
          // If user blocked the bot, clean up their chat_id
          if (data.error_code === 403) {
            await pool.query(
              `UPDATE users SET telegram_chat_id = NULL WHERE id = $1`,
              [user.id]
            );
            console.warn(`⚠️ User ${user.id} blocked bot — chat_id cleared`);
          }
          errors.push({ userId: user.id, error: data.description });
        }

      } catch (err) {
        failed++;
        errors.push({ userId: user.id, error: err.message });
        console.error(`❌ Failed for user ${user.id}:`, err.message);
      }
    }

    console.log(`✅ Done — Sent: ${sent} | Failed: ${failed}`);
    return res.status(200).json({ success: true, sent, failed, errors });

  } catch (err) {
    console.error('❌ sendDailyReminders error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { sendDailyReminders };