const pool = require('../config/database');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Start a new interview session
const startInterview = async (req, res) => {
    try {
        const userId = req.user.id;
        
        // Get user's latest resume
        const resumeResult = await pool.query(
            'SELECT * FROM resumes WHERE user_id = $1 ORDER BY created_at DESC LIMIT 1',
            [userId]
        );
        
        if (resumeResult.rows.length === 0) {
            return res.status(400).json({ error: 'Please upload a resume first' });
        }
        
        const resume = resumeResult.rows[0];
        
        // Get 10 random questions generated from this resume
        const questionsResult = await pool.query(
            'SELECT * FROM generated_questions WHERE user_id = $1 AND resume_id = $2 AND used_in_interview = false ORDER BY RANDOM() LIMIT 10',
            [userId, resume.id]
        );
        
        if (questionsResult.rows.length < 10) {
            return res.status(400).json({ 
                error: 'Not enough questions available. Please upload resume again.',
                available: questionsResult.rows.length 
            });
        }
        
        // Create interview session
        const sessionResult = await pool.query(
            `INSERT INTO interview_sessions (user_id, resume_id, total_questions) 
             VALUES ($1, $2, $3) RETURNING *`,
            [userId, resume.id, questionsResult.rows.length]
        );
        
        const session = sessionResult.rows[0];
        
        // Mark questions as used
        for (const q of questionsResult.rows) {
            await pool.query(
                'UPDATE generated_questions SET used_in_interview = true WHERE id = $1',
                [q.id]
            );
        }
        
        res.json({
            sessionId: session.id,
            totalQuestions: questionsResult.rows.length,
            questions: questionsResult.rows.map(q => ({
                id: q.id,
                text: q.question_text,
                category: q.category,
                difficulty: q.difficulty,
                skill: q.skill_focused
            }))
        });
        
    } catch (error) {
        console.error('Error starting interview:', error);
        res.status(500).json({ error: error.message });
    }
};

// Submit answer (with speech-to-text)
const submitAnswer = async (req, res) => {
    try {
        const { sessionId, questionId, answerText, speechText } = req.body;
        const userId = req.user.id;
        
        // Get question details
        const questionResult = await pool.query(
            'SELECT * FROM generated_questions WHERE id = $1',
            [questionId]
        );
        
        if (questionResult.rows.length === 0) {
            return res.status(404).json({ error: 'Question not found' });
        }
        
        const question = questionResult.rows[0];
        
        // Evaluate answer using Gemini
        const model = genAI.getGenerativeModel({ model: "models/gemini-2.5-flash" });
        
        const evaluationPrompt = `
            Evaluate this interview answer.
            
            Question: ${question.question_text}
            Skill focused: ${question.skill_focused}
            
            Candidate's answer: ${answerText || speechText}
            
            Provide evaluation in JSON format:
            {
                "score": (number 1-10),
                "feedback": "constructive feedback",
                "keywords_matched": ["keyword1", "keyword2"],
                "keywords_missed": ["missing1", "missing2"],
                "strengths": "what was good",
                "improvements": "what could be better"
            }
            
            Be fair and constructive.
        `;
        
        const result = await model.generateContent(evaluationPrompt);
        const evaluation = JSON.parse(result.response.text());
        
        // Save answer
        const answerResult = await pool.query(
            `INSERT INTO answers 
             (session_id, question_id, answer_text, speech_text, feedback, score, keywords_matched, keywords_missed)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
             RETURNING *`,
            [
                sessionId, 
                questionId, 
                answerText, 
                speechText, 
                evaluation.feedback,
                evaluation.score,
                evaluation.keywords_matched,
                evaluation.keywords_missed
            ]
        );
        
        // Update session progress
        await pool.query(
            `UPDATE interview_sessions 
             SET current_question_index = current_question_index + 1 
             WHERE id = $1`,
            [sessionId]
        );
        
        // Check if interview is complete
        const sessionResult = await pool.query(
            'SELECT * FROM interview_sessions WHERE id = $1',
            [sessionId]
        );
        
        const session = sessionResult.rows[0];
        let completed = false;
        
        if (session.current_question_index >= session.total_questions) {
            await pool.query(
                `UPDATE interview_sessions 
                 SET status = 'completed', end_time = CURRENT_TIMESTAMP 
                 WHERE id = $1`,
                [sessionId]
            );
            completed = true;
        }
        
        res.json({
            answer: answerResult.rows[0],
            evaluation,
            completed,
            progress: {
                current: session.current_question_index,
                total: session.total_questions
            }
        });
        
    } catch (error) {
        console.error('Error submitting answer:', error);
        res.status(500).json({ error: error.message });
    }
};

// Get interview results
const getResults = async (req, res) => {
    try {
        const { sessionId } = req.params;
        const userId = req.user.id;
        
        // Get session details
        const sessionResult = await pool.query(
            'SELECT * FROM interview_sessions WHERE id = $1 AND user_id = $2',
            [sessionId, userId]
        );
        
        if (sessionResult.rows.length === 0) {
            return res.status(404).json({ error: 'Session not found' });
        }
        
        const session = sessionResult.rows[0];
        
        // Get all answers for this session
        const answersResult = await pool.query(
            `SELECT a.*, q.question_text, q.category, q.skill_focused, q.difficulty
             FROM answers a
             JOIN generated_questions q ON a.question_id = q.id
             WHERE a.session_id = $1
             ORDER BY a.created_at`,
            [sessionId]
        );
        
        // Calculate overall score
        const answers = answersResult.rows;
        const totalScore = answers.reduce((sum, a) => sum + (a.score || 0), 0);
        const averageScore = answers.length > 0 ? (totalScore / answers.length).toFixed(1) : 0;
        
        // Get all keywords matched/missed
        const allMatched = answers.flatMap(a => a.keywords_matched || []);
        const allMissed = answers.flatMap(a => a.keywords_missed || []);
        
        // Generate overall feedback using Gemini
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        const feedbackPrompt = `
            Based on these interview answers, provide overall feedback:
            
            Average score: ${averageScore}/10
            
            Answers summary:
            ${answers.map(a => `Q: ${a.question_text}\nScore: ${a.score}\nFeedback: ${a.feedback}`).join('\n\n')}
            
            Provide overall assessment and recommendations for improvement.
        `;
        
        const result = await model.generateContent(feedbackPrompt);
        const overallFeedback = result.response.text();
        
        res.json({
            session: {
                id: session.id,
                startTime: session.start_time,
                endTime: session.end_time,
                totalQuestions: session.total_questions,
                completedQuestions: answers.length
            },
            averageScore,
            overallFeedback,
            answers,
            keywords: {
                strengths: allMatched,
                weaknesses: allMissed
            }
        });
        
    } catch (error) {
        console.error('Error getting results:', error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    startInterview,
    submitAnswer,
    getResults
};