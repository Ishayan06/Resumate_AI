const pool = require('../config/database');

// Test route handler
const testServer = (req, res) => {
    res.json({ message: 'Backend is working!' });
};

// Test database connection handler
const testDatabase = async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW() as current_time');
        res.json({ 
            message: 'Database connected successfully!',
            time: result.rows[0]
        });
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ 
            error: 'Database connection failed', 
            details: error.message 
        });
    }
};

module.exports = {
    testServer,
    testDatabase
};