const Resume = require('../models/Resume');
const GeneratedQuestion = require('../models/GeneratedQuestion');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const pdf = require('pdf-parse');
const mammoth = require('mammoth');

// Upload and process resume
const uploadResume = async (req, res) => {
    try {
        const userId = req.user.id;
        const file = req.file;
        
        // Extract text from PDF or DOCX
        let extractedText = '';
        if (file.mimetype === 'application/pdf') {
            const dataBuffer = file.buffer;
            const data = await pdf(dataBuffer);
            extractedText = data.text;
        } else if (file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            const result = await mammoth.extractRawText({ buffer: file.buffer });
            extractedText = result.value;
        }

        // Send to Gemini for parsing
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        const parsePrompt = `
            Analyze this resume and extract:
            1. Technical skills (as array)
            2. Years of experience (number)
            3. Key technologies mentioned
            
            Resume text: ${extractedText}
            
            Return as JSON only: { "skills": [...], "experience_years": number }
        `;
        
        const result = await model.generateContent(parsePrompt);
        const parsed = JSON.parse(result.response.text());

        // Save resume to database
        const resume = await Resume.create({
            user_id: userId,
            file_url: file.path || 'memory',
            parsed_text: extractedText,
            skills: parsed.skills,
            experience_years: parsed.experience_years
        });

        // Generate questions based on skills
        await generateQuestions(userId, resume.id, parsed.skills);

        res.json({ 
            message: 'Resume processed successfully',
            skills: parsed.skills,
            experience: parsed.experience_years
        });

    } catch (error) {
        console.error('Resume upload error:', error);
        res.status(500).json({ error: error.message });
    }
};

// Generate questions from skills
const generateQuestions = async (userId, resumeId, skills) => {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const questionPrompt = `
        Generate 10 interview questions based on these skills: ${skills.join(', ')}
        
        Include:
        - 4 Technical questions specific to these skills
        - 3 Behavioral questions
        - 3 Problem-solving scenarios
        
        Return as JSON array with: { "text": question, "category": type, "skill_focused": skill, "difficulty": "easy/medium/hard" }
    `;
    
    const result = await model.generateContent(questionPrompt);
    const questions = JSON.parse(result.response.text());
    
    // Save each question
    for (const q of questions) {
        await GeneratedQuestion.create({
            user_id: userId,
            resume_id: resumeId,
            question_text: q.text,
            category: q.category,
            skill_focused: q.skill_focused,
            difficulty: q.difficulty
        });
    }
};

module.exports = { uploadResume };