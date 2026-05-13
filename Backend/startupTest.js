require('dotenv').config();
const axios = require('axios');
const Groq  = require('groq-sdk');
const pool  = require('./config/database');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function testAll() {
  console.log('\n🚀 Running Startup Tests...\n');

  // ── 1. Server ──
  try {
    const res = await axios.get('http://localhost:3001/api/test', { timeout: 5000 });
    console.log('✅ Server:', res.data.message || 'OK');
  } catch (err) {
    console.log('❌ Server not responding:', err.code || err.message);
  }

  // ── 2. Database — query pool directly, no HTTP roundtrip needed ──
  try {
    const res = await pool.query('SELECT NOW() AS current_time');
    console.log('✅ Database connected at:', res.rows[0].current_time);
  } catch (err) {
    console.log('❌ Database failed:', err.message);
  }

  // ── 3. Groq ──
  try {
    const completion = await groq.chat.completions.create({
      model:    'llama-3.1-8b-instant',
      messages: [{ role: 'user', content: 'Say Hello' }],
    });
    console.log('✅ Groq:', completion.choices[0].message.content);
  } catch (err) {
    console.log('❌ Groq failed:', err.message);
  }

  console.log('\n✅ Startup Tests Done\n');
}

module.exports = testAll;