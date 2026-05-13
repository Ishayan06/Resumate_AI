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

const sendDailyReminders = async () => {
  const token  = process.env.TELEGRAM_BOT_TOKEN;
  const appUrl = process.env.APP_URL || 'https://yourapp.com';

  // Skip users who already practiced today
  const result = await pool.query(`
    SELECT id, telegram_chat_id 
    FROM users 
    WHERE telegram_chat_id IS NOT NULL
      AND (last_session_date IS NULL OR last_session_date < CURRENT_DATE)
  `);

  const users = result.rows;
  console.log(`📤 Sending reminders to ${users.length} users...`);

  let sent = 0, failed = 0;

  for (const user of users) {
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
              inline_keyboard: [[{
                text: '🎙 Start Today\'s Session',
                url: `${appUrl}/comm`,
              }]],
            },
          }),
        }
      );

      const data = await response.json();

      if (data.ok) {
        sent++;
        console.log(`✅ Sent to user ${user.id}`);
      } else {
        failed++;
        if (data.error_code === 403) {
          await pool.query(
            `UPDATE users SET telegram_chat_id = NULL WHERE id = $1`,
            [user.id]
          );
          console.warn(`⚠️ User ${user.id} blocked bot — chat_id cleared`);
        }
      }
    } catch (err) {
      failed++;
      console.error(`❌ Failed for user ${user.id}:`, err.message);
    }
  }

  console.log(`✅ Done — Sent: ${sent} | Failed: ${failed}`);
};

module.exports = { sendDailyReminders };