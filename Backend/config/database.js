const { Pool } = require('pg');
require('dotenv').config();

// Create a connection pool
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// Test the connection
pool.connect((err, client, release) => {
    if (err) {
        return console.error('❌ Error connecting to database:', err.stack);
    }
    console.log('✅ Connected to PostgreSQL database successfully!');
    console.log('📊 Database:', process.env.DB_NAME);
    console.log('👤 User:', process.env.DB_USER);
    console.log('📍 Host:', process.env.DB_HOST);
    release();
});

// Handle unexpected errors
pool.on('error', (err) => {
    console.error('❌ Unexpected database error:', err);
});

// Export the pool for other files to use
module.exports = pool;