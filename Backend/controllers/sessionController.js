const pool = require('../config/database');

const markSessionDone = async (req, res) => {
  try {
    const userId = req.user.id; // from your auth middleware
    await pool.query(
      `UPDATE users SET last_session_date = CURRENT_DATE WHERE id = $1`,
      [userId]
    );
    return res.json({ success: true });
  } catch (err) {
    console.error('Session error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { markSessionDone };