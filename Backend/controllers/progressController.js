const pool = require('../config/database');

/* ─── GET /api/user/progress ─── */
const getProgress = async (req, res) => {
  try {
    const uid = req.user.id;

    const [qRes, dRes] = await Promise.all([
      pool.query(
        `SELECT question_id FROM user_progress WHERE user_id = $1 AND completed = TRUE`,
        [uid]
      ),
      pool.query(
        `SELECT day_index FROM user_completed_days WHERE user_id = $1 ORDER BY day_index`,
        [uid]
      ),
    ]);

    res.json({
      completedQuestions: qRes.rows.map(r => r.question_id),
      completedDays:      dRes.rows.map(r => r.day_index),
    });
  } catch (err) {
    console.error('[getProgress]', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/* ─── POST /api/user/progress/question ─── */
// Body: { questionId: number, completed: boolean }
const updateQuestion = async (req, res) => {
  try {
    const uid = req.user.id;
    const { questionId, completed } = req.body;
    if (questionId == null) return res.status(400).json({ error: 'questionId required' });

    // Block unchecking if the day this question belongs to is already marked complete
    // (We pass dayIndex from frontend so we can check)
    if (!completed && req.body.dayIndex != null) {
      const { rows } = await pool.query(
        `SELECT 1 FROM user_completed_days WHERE user_id = $1 AND day_index = $2`,
        [uid, req.body.dayIndex]
      );
      if (rows.length > 0) {
        return res.status(403).json({ error: 'Day is locked. Cannot uncheck a completed day.' });
      }
    }

    await pool.query(
      `INSERT INTO user_progress (user_id, question_id, completed, updated_at)
       VALUES ($1, $2, $3, NOW())
       ON CONFLICT (user_id, question_id)
       DO UPDATE SET completed = EXCLUDED.completed, updated_at = NOW()`,
      [uid, questionId, completed]
    );

    res.json({ ok: true });
  } catch (err) {
    console.error('[updateQuestion]', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getProgress, updateQuestion };