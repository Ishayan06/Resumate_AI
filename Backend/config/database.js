const { Pool } = require('pg');
require('dotenv').config({ path: '../.env' }); // 👈 important

console.log("HOST:", process.env.DB_HOST);
console.log("USER:", process.env.DB_USER);
console.log("DB:", process.env.DB_NAME);

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT, 10),
    ssl: {
        rejectUnauthorized: false
    }
});

pool.connect((err, client, release) => {
    if (err) {
        return console.error('❌ Error connecting to database:', err.stack);
    }
    console.log('✅ Connected to PostgreSQL database successfully!');
    release();
});

module.exports = pool;