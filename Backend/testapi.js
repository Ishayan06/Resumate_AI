// test-api.js
const axios = require('axios');

async function testAPI() {
    try {
        console.log('🔍 Testing API...\n');
        
        // Test 1: Server
        console.log('1. Testing server...');
        const server = await axios.get('http://localhost:3001/api/test');
        console.log('✅ Server OK:', server.data.message);
        
        // Test 2: Database
        console.log('\n2. Testing database...');
        const db = await axios.get('http://localhost:3001/api/test-db');
        console.log('✅ Database OK - Connected at:', db.data.time.current_time);
        
        console.log('\n🎉 Everything is working!');
        
    } catch (error) {
        console.error('❌ Error:', error.message);
        if (error.code === 'ECONNREFUSED') {
            console.log('👉 Make sure your server is running (npm run dev)');
        }
    }
}

testAPI();