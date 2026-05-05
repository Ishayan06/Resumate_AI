const Resume = require('../models/Resume');
const GeneratedQuestion = require('../models/GeneratedQuestion');

const Groq = require("groq-sdk");

const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

// -----------------------------
// Upload Resume Controller
// -----------------------------
const uploadResume = async (req, res) => {
    try {

        const userId = req.user.id;
        const file = req.file;

        if (!file) {
            return res.status(400).json({
                success: false,
                error: 'No file uploaded'
            });
        }

        let extractedText = '';

        // PDF
        if (file.mimetype === 'application/pdf') {
            const data = await pdfParse(file.buffer);
            extractedText = data.text;
        }

        // DOCX
        else if (
            file.mimetype ===
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ) {
            const result = await mammoth.extractRawText({
                buffer: file.buffer
            });
            extractedText = result.value;
        }

        else {
            return res.status(400).json({
                success: false,
                error: 'Only PDF and DOCX files are allowed'
            });
        }

        extractedText = extractedText.trim();

        if (!extractedText) {
            return res.status(400).json({
                success: false,
                error: 'Could not extract text from resume'
            });
        }

        // -----------------------------
        // Prompt
        // -----------------------------
        const parsePrompt = `
Analyze the following resume.

Extract:
1. Technical skills as array
2. Total years of experience as number

Resume:
${extractedText}

Return ONLY JSON. No explanation. No extra text.
{
  "skills": [],
  "experience_years": number
}
`;

        // -----------------------------
        // Groq Call
        // -----------------------------
        const completion = await groq.chat.completions.create({
            model: "llama-3.1-8b-instant",
            messages: [{ role: "user", content: parsePrompt }],
            temperature: 0.2
        });

        let responseText = completion.choices[0].message.content;

        responseText = responseText
            .replace(/```json/g, '')
            .replace(/```/g, '')
            .trim();

        let parsedData;

        try {
            const jsonMatch = responseText.match(/\{[\s\S]*\}/);

            if (!jsonMatch) throw new Error("No JSON found");

            parsedData = JSON.parse(jsonMatch[0]);

        } catch (jsonError) {
            console.error('JSON Parse Error:', responseText);
            return res.status(500).json({
                success: false,
                error: 'AI returned invalid JSON'
            });
        }

        // -----------------------------
        // Save Resume
        // -----------------------------
        const resume = await Resume.create({
            user_id: userId,
            file_url: file.originalname,
            parsed_text: extractedText,
            skills: parsedData.skills || [],
            experience_years: parsedData.experience_years || 0
        });

        // -----------------------------
        // Generate Questions
        // -----------------------------
        const questions = await generateQuestions(
            userId,
            resume.id,
            parsedData.skills || []
        );

        return res.status(200).json({
            success: true,
            message: 'Resume processed successfully',
            resume_id: resume.id,
            skills: parsedData.skills,
            experience_years: parsedData.experience_years,
            questions
        });

    } catch (error) {

        console.error('Upload Resume Error:', error);

        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// -----------------------------
// Generate Questions
// -----------------------------
const generateQuestions = async (
    userId,
    resumeId,
    skills
) => {

    try {

        const prompt = `
Generate 10 interview questions based on these skills:

${skills.join(', ')}

Rules:
- 4 Technical
- 3 Behavioral
- 3 Problem Solving

Return ONLY JSON array. No explanation. No extra text.
[
  {
    "text": "",
    "category": "",
    "skill_focused": "",
    "difficulty": ""
  }
]
`;

        const completion = await groq.chat.completions.create({
            model: "llama-3.1-8b-instant",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.3
        });

        let responseText = completion.choices[0].message.content;

        responseText = responseText
            .replace(/```json/g, '')
            .replace(/```/g, '')
            .trim();

        let questions;

        try {
            const jsonMatch = responseText.match(/\[[\s\S]*\]/);

            if (!jsonMatch) throw new Error("No JSON array found");

            questions = JSON.parse(jsonMatch[0]);

        } catch (err) {
            console.error('Question JSON Parse Error:', responseText);
            return [];
        }

        const savedQuestions = await Promise.all(
            questions.map((q) => {
                return GeneratedQuestion.create({
                    user_id: userId,
                    resume_id: resumeId,
                    question_text: q.text,
                    category: q.category,
                    skill_focused: q.skill_focused,
                    difficulty: q.difficulty
                });
            })
        );

        return savedQuestions;

    } catch (error) {
        console.error('Generate Questions Error:', error);
        return [];
    }
};

module.exports = {
    uploadResume
};