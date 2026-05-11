const { Pool } = require('pg');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

console.log("DATABASE_URL:", process.env.DATABASE_URL ?? "❌ NOT FOUND");

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

pool.connect((err, client, release) => {
    if (err) return console.error('❌ Error connecting to database:', err.stack);
    console.log('✅ Connected to PostgreSQL database successfully!');
    release();
});

module.exports = pool;