const pool = require('../config/database');

/* ─── GET /api/streak ─── */
const getStreak = async (req, res) => {
  try {
    const uid = req.user.id;

    const { rows } = await pool.query(
      `SELECT streak, maxstreak FROM users WHERE id = $1`, [uid]
    );
    if (!rows[0]) return res.status(404).json({ error: 'User not found' });

    const sixMonthsAgo = new Date();
    sixMonthsAgo.setDate(sixMonthsAgo.getDate() - 182);

    const [visitRes, totalRes] = await Promise.all([
      pool.query(
        `SELECT visit_date FROM visit_log
         WHERE user_id = $1 AND visit_date >= $2
         ORDER BY visit_date ASC`,
        [uid, sixMonthsAgo.toISOString().split('T')[0]]
      ),
      pool.query(
        `SELECT COUNT(*) as total FROM visit_log WHERE user_id = $1`, [uid]
      ),
    ]);

    const visitDates = visitRes.rows.map(r =>
      r.visit_date instanceof Date
        ? r.visit_date.toISOString().split('T')[0]
        : String(r.visit_date).split('T')[0]
    );

    res.json({
      streak:     rows[0].streak     || 0,
      maxstreak:  rows[0].maxstreak  || 0,
      totalDays:  parseInt(totalRes.rows[0].total, 10),
      visitDates,
    });
  } catch (err) {
    console.error('[getStreak]', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/* ─── POST /api/streak/update ─── */
// Called when user marks a day complete.
// Body: { completedDayIndex: number }
const updateStreak = async (req, res) => {
  try {
    const uid = req.user.id;
    const { completedDayIndex } = req.body;
    if (completedDayIndex == null) return res.status(400).json({ error: 'completedDayIndex required' });

    // 1. Guard: day already completed?
    const { rows: existing } = await pool.query(
      `SELECT 1 FROM user_completed_days WHERE user_id = $1 AND day_index = $2`,
      [uid, completedDayIndex]
    );
    if (existing.length > 0) {
      return res.status(409).json({ error: 'Day already completed' });
    }

    // 2. Insert completed day
    await pool.query(
      `INSERT INTO user_completed_days (user_id, day_index) VALUES ($1, $2)
       ON CONFLICT DO NOTHING`,
      [uid, completedDayIndex]
    );

    // 3. Compute streak from consecutive completed days
    //    Strategy: sort all completed day indices, check if they form a consecutive
    //    chain ending at completedDayIndex → streak = length of that chain.
    const { rows: allDays } = await pool.query(
      `SELECT day_index FROM user_completed_days WHERE user_id = $1 ORDER BY day_index ASC`,
      [uid]
    );
    const daySet = new Set(allDays.map(r => r.day_index));

    // Walk backwards from completedDayIndex to find streak length
    let streak = 0;
    let cur = completedDayIndex;
    while (daySet.has(cur)) { streak++; cur--; }

    // 4. Update users table
    const { rows: userRows } = await pool.query(
      `SELECT maxstreak FROM users WHERE id = $1`, [uid]
    );
    const maxstreak = Math.max(streak, userRows[0]?.maxstreak || 0);

    const todayISO = new Date().toISOString().split('T')[0];

    await pool.query(
      `UPDATE users SET streak = $1, maxstreak = $2, lastvisited = $3 WHERE id = $4`,
      [streak, maxstreak, todayISO, uid]
    );

    // 5. Log visit for heatmap
    await pool.query(
      `INSERT INTO visit_log (user_id, visit_date) VALUES ($1, $2)
       ON CONFLICT (user_id, visit_date) DO NOTHING`,
      [uid, todayISO]
    );

    // 6. Build response
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setDate(sixMonthsAgo.getDate() - 182);
    const visitRes = await pool.query(
      `SELECT visit_date FROM visit_log
       WHERE user_id = $1 AND visit_date >= $2 ORDER BY visit_date ASC`,
      [uid, sixMonthsAgo.toISOString().split('T')[0]]
    );
    const visitDates = visitRes.rows.map(r =>
      r.visit_date instanceof Date
        ? r.visit_date.toISOString().split('T')[0]
        : String(r.visit_date).split('T')[0]
    );
    const totalRes = await pool.query(
      `SELECT COUNT(*) as total FROM visit_log WHERE user_id = $1`, [uid]
    );

    res.json({
      streak,
      maxstreak,
      totalDays: parseInt(totalRes.rows[0].total, 10),
      visitDates,
      updated: true,
    });
  } catch (err) {
    console.error('[updateStreak]', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getStreak, updateStreak };