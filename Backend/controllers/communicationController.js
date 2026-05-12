const pool = require('../config/database');

/* ── POST /api/communication/update-points ── */
const updatePoints = async (req, res) => {
  try {
    const uid = req.user.id;
    const { points } = req.body;

    if (!points) return res.status(400).json({ error: 'points required' });

    const { rows } = await pool.query(
      `UPDATE users 
       SET communication_points = communication_points + $1 
       WHERE id = $2
       RETURNING communication_points`,
      [points, uid]
    );

    if (!rows[0]) return res.status(404).json({ error: 'User not found' });

    res.json({ 
      success: true, 
      communication_points: rows[0].communication_points 
    });
  } catch (err) {
    console.error('[updatePoints]', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/* ── GET /api/communication/points ── */
const getPoints = async (req, res) => {
  try {
    const uid = req.user.id;

    const { rows } = await pool.query(
      `SELECT communication_points FROM users WHERE id = $1`,
      [uid]
    );

    if (!rows[0]) return res.status(404).json({ error: 'User not found' });

    res.json({ communication_points: rows[0].communication_points || 0 });
  } catch (err) {
    console.error('[getPoints]', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { updatePoints, getPoints };