const pool = require('../config/database');

/* ── POST /api/dsa-plan/start ── */
const startPlan = async (req, res) => {
  try {
    const uid = req.user.id;
    const { days } = req.body;
    if (!days) return res.status(400).json({ error: 'days required' });

    const dataLocked = new Date();
    dataLocked.setDate(dataLocked.getDate() + days);
    const dataLockedISO = dataLocked.toISOString().split('T')[0];

    await pool.query(
      `UPDATE users SET plan_days = $1, data_locked = $2 WHERE id = $3`,
      [days, dataLockedISO, uid]
    );

    res.json({ days, dataLocked: dataLockedISO });
  } catch (err) {
    console.error('[startPlan]', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/* ── POST /api/dsa-plan/change-duration ── */
const changeDuration = async (req, res) => {
  try {
    const uid = req.user.id;
    const { days } = req.body;
    if (!days) return res.status(400).json({ error: 'days required' });

    const dataLocked = new Date();
    dataLocked.setDate(dataLocked.getDate() + days);
    const dataLockedISO = dataLocked.toISOString().split('T')[0];

    await pool.query(
      `UPDATE users SET plan_days = $1, data_locked = $2 WHERE id = $3`,
      [days, dataLockedISO, uid]
    );

    res.json({ days, dataLocked: dataLockedISO });
  } catch (err) {
    console.error('[changeDuration]', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/* ── POST /api/dsa-plan/complete-day ── */
const completeDay = async (req, res) => {
  try {
    const uid = req.user.id;
    const { dayIdx } = req.body;
    if (dayIdx == null) return res.status(400).json({ error: 'dayIdx required' });

    // 1. Guard: already completed?
    const { rows: existing } = await pool.query(
      `SELECT 1 FROM user_completed_days WHERE user_id = $1 AND day_index = $2`,
      [uid, dayIdx]
    );
    if (existing.length > 0) {
      const { rows } = await pool.query(
        `SELECT streak, maxstreak FROM users WHERE id = $1`, [uid]
      );
      return res.json({
        streak:    rows[0]?.streak    || 0,
        maxstreak: rows[0]?.maxstreak || 0,
        updated:   false,
      });
    }

    // 2. Insert completed day
    await pool.query(
      `INSERT INTO user_completed_days (user_id, day_index) VALUES ($1, $2)
       ON CONFLICT DO NOTHING`,
      [uid, dayIdx]
    );

    // 3. Walk backwards from dayIdx to compute streak
    const { rows: allDays } = await pool.query(
      `SELECT day_index FROM user_completed_days WHERE user_id = $1 ORDER BY day_index ASC`,
      [uid]
    );
    const daySet = new Set(allDays.map(r => r.day_index));

    let streak = 0;
    let cur = dayIdx;
    while (daySet.has(cur)) { streak++; cur--; }

    // 4. Update users: streak, maxstreak, lastvisited
    const { rows: userRows } = await pool.query(
      `SELECT maxstreak FROM users WHERE id = $1`, [uid]
    );
    const maxstreak = Math.max(streak, userRows[0]?.maxstreak || 0);
    const todayISO = new Date().toISOString().split('T')[0];

    await pool.query(
      `UPDATE users SET streak = $1, maxstreak = $2, lastvisited = $3 WHERE id = $4`,
      [streak, maxstreak, todayISO, uid]
    );

    // 5. Log to visit_log for heatmap (same table streakController uses)
    await pool.query(
      `INSERT INTO visit_log (user_id, visit_date) VALUES ($1, $2)
       ON CONFLICT (user_id, visit_date) DO NOTHING`,
      [uid, todayISO]
    );

    res.json({ streak, maxstreak, updated: true });
  } catch (err) {
    console.error('[completeDay]', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/* ── GET /api/dsa-plan ── */
const getPlan = async (req, res) => {
  try {
    const uid = req.user.id;
    const { rows } = await pool.query(
      `SELECT plan_days, data_locked, streak, maxstreak FROM users WHERE id = $1`,
      [uid]
    );
    if (!rows[0]) return res.status(404).json({ error: 'User not found' });

    const { plan_days, data_locked, streak, maxstreak } = rows[0];
    res.json({
      days:       plan_days || null,
      dataLocked: data_locked
        ? (data_locked instanceof Date
            ? data_locked.toISOString().split('T')[0]
            : String(data_locked).split('T')[0])
        : null,
      streak:    streak    || 0,
      maxstreak: maxstreak || 0,
    });
  } catch (err) {
    console.error('[getPlan]', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { startPlan, changeDuration, completeDay, getPlan };