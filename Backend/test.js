// test.js
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

async function test() {
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        
        // Use the correct model from your list
        const model = genAI.getGenerativeModel({ 
            model: "models/gemini-2.5-flash"
        });
        
        console.log('Testing Gemini...');
        const result = await model.generateContent("Say 'Hello World'");
        console.log('✅ Success:', result.response.text());
        
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

test();