const pool = require('../config/database');

// ─────────────────────────────────────────
// Mark today as practiced — skips reminder for today
// Called by: POST /api/session/complete
// Requires: Authorization: Bearer <token> header
// ─────────────────────────────────────────
const completeSession = async (req, res) => {
  try {
    // req.user is set by your auth middleware (same one used on /api/interview etc.)
    const userId = req.user?.id || req.user?.userId;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized — no userId in token' });
    }

    const result = await pool.query(
      `UPDATE users
       SET last_session_date = CURRENT_DATE
       WHERE id = $1
       RETURNING id, last_session_date`,
      [userId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    console.log(`✅ Session complete for user ${userId} — last_session_date set to ${result.rows[0].last_session_date}`);
    return res.status(200).json({ success: true, last_session_date: result.rows[0].last_session_date });

  } catch (err) {
    console.error('❌ completeSession error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { completeSession };