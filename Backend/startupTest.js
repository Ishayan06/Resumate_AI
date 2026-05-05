require('dotenv').config();
const axios = require('axios');
const Groq = require("groq-sdk");

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

async function testAll() {
    console.log('\n🚀 Running Startup Tests...\n');

    // -----------------------
    // 1. Test Server
    // -----------------------
    try {
        const res = await axios.get('http://localhost:3001/api/test');
        console.log('✅ Server:', res.data.message);
    } catch (err) {
        console.log('❌ Server not responding');
    }

    // -----------------------
    // 2. Test Database
    // -----------------------
    try {
        const res = await axios.get('http://localhost:3001/api/test-db');
        console.log('✅ Database connected at:', res.data.time.current_time);
    } catch (err) {
        console.log('❌ Database failed');
    }

    // -----------------------
    // 3. Test Groq
    // -----------------------
    try {
        const completion = await groq.chat.completions.create({
            model: "llama-3.1-8b-instant",
            messages: [{ role: "user", content: "Say Hello" }]
        });

        console.log('✅ Groq:', completion.choices[0].message.content);
    } catch (err) {
        console.log('❌ Groq failed:', err.message);
    }

    console.log('\n✅ Startup Tests Done\n');
}

module.exports = testAll;