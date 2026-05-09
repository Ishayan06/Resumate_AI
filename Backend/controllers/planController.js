const pool = require('../config/database');

/* ─── GET /api/user/plan ─── */
const getPlan = async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT plan_days, data_locked FROM users WHERE id = $1`,
      [req.user.id]
    );
    if (!rows[0]) return res.status(404).json({ error: 'User not found' });
    res.json({ days: rows[0].plan_days, locked: rows[0].data_locked });
  } catch (err) {
    console.error('[getPlan]', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/* ─── POST /api/user/plan ─── */
// Body: { days: number }
// Sets plan_days + locks it. If already locked, only allow if plan is complete (all days done).
const setPlan = async (req, res) => {
  try {
    const userId = req.user.id;
    const days = parseInt(req.body.days, 10);
    if (!days || days < 1) return res.status(400).json({ error: 'Invalid days' });

    const { rows } = await pool.query(
      `SELECT plan_days, data_locked FROM users WHERE id = $1`, [userId]
    );
    const user = rows[0];
    if (!user) return res.status(404).json({ error: 'User not found' });

    // If already locked, only allow change if plan is complete
    if (user.data_locked) {
      const TOTAL_QUESTIONS = 250;
      const currentPerDay = Math.ceil(TOTAL_QUESTIONS / user.plan_days);
      const currentGroups = Math.ceil(TOTAL_QUESTIONS / currentPerDay);

      const { rows: doneRows } = await pool.query(
        `SELECT COUNT(*) as cnt FROM user_completed_days WHERE user_id = $1`,
        [userId]
      );
      const doneDays = parseInt(doneRows[0].cnt, 10);

      if (doneDays < currentGroups) {
        return res.status(403).json({ error: 'Plan is locked. Complete all days first.' });
      }

      // Plan complete — allow reset
      await pool.query(
        `DELETE FROM user_completed_days WHERE user_id = $1`, [userId]
      );
      await pool.query(
        `DELETE FROM user_progress WHERE user_id = $1`, [userId]
      );
    }

    await pool.query(
      `UPDATE users SET plan_days = $1, data_locked = TRUE WHERE id = $2`,
      [days, userId]
    );

    res.json({ days, locked: true });
  } catch (err) {
    console.error('[setPlan]', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getPlan, setPlan };