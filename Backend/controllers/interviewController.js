const pool = require('../config/database');
const Groq = require("groq-sdk");

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

// -----------------------------
// Start Interview
// -----------------------------
const startInterview = async (req, res) => {
    try {
        const userId = req.user.id;

        const resumeResult = await pool.query(
            'SELECT * FROM resumes WHERE user_id = $1 ORDER BY created_at DESC LIMIT 1',
            [userId]
        );

        if (resumeResult.rows.length === 0) {
            return res.status(400).json({
                error: 'Please upload a resume first'
            });
        }

        const resume = resumeResult.rows[0];

        const questionsResult = await pool.query(
            `SELECT * FROM generated_questions
             WHERE user_id = $1
             AND resume_id = $2
             AND used_in_interview = false
             ORDER BY RANDOM()
             LIMIT 10`,
            [userId, resume.id]
        );

        if (questionsResult.rows.length < 10) {
            return res.status(400).json({
                error: 'Not enough questions available. Please upload resume again.',
                available: questionsResult.rows.length
            });
        }

        const sessionResult = await pool.query(
            `INSERT INTO interview_sessions
             (user_id, resume_id, total_questions)
             VALUES ($1, $2, $3)
             RETURNING *`,
            [userId, resume.id, questionsResult.rows.length]
        );

        const session = sessionResult.rows[0];

        for (const q of questionsResult.rows) {
            await pool.query(
                `UPDATE generated_questions
                 SET used_in_interview = true
                 WHERE id = $1`,
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

        res.status(500).json({
            error: error.message
        });
    }
};

// -----------------------------
// Submit Answer
// -----------------------------
const submitAnswer = async (req, res) => {

    try {

        const {
            sessionId,
            questionId,
            answerText,
            speechText
        } = req.body;

        const questionResult = await pool.query(
            'SELECT * FROM generated_questions WHERE id = $1',
            [questionId]
        );

        if (questionResult.rows.length === 0) {
            return res.status(404).json({
                error: 'Question not found'
            });
        }

        const question = questionResult.rows[0];

        const evaluationPrompt = `
Evaluate this interview answer.

Question: ${question.question_text}
Skill focused: ${question.skill_focused}

Candidate's answer:
${answerText || speechText}

Return ONLY valid JSON.

{
  "score": number,
  "feedback": "text",
  "keywords_matched": [],
  "keywords_missed": [],
  "strengths": "text",
  "improvements": "text"
}
`;

        // -----------------------------
        // GROQ AI CALL
        // -----------------------------
        const completion = await groq.chat.completions.create({

            model: "llama-3.1-8b-instant",

            messages: [
                {
                    role: "system",
                    content:
                        "You are an interview evaluator. Return ONLY valid JSON. No markdown. No explanation."
                },
                {
                    role: "user",
                    content: evaluationPrompt
                }
            ],

            temperature: 0.1,

            response_format: {
                type: "json_object"
            }
        });

        let responseText = completion.choices[0].message.content;

        responseText = responseText
            .replace(/```json/g, '')
            .replace(/```/g, '')
            .trim();

        let evaluation;

        // -----------------------------
        // SAFE JSON PARSE
        // -----------------------------
        try {

            evaluation = JSON.parse(responseText);

        } catch (err) {

            console.error("JSON Parse Error:", responseText);

            evaluation = {
                score: 0,
                feedback: "AI evaluation failed",
                keywords_matched: [],
                keywords_missed: [],
                strengths: "N/A",
                improvements: "N/A"
            };
        }

        // -----------------------------
        // SAVE ANSWER
        // -----------------------------
        const answerResult = await pool.query(
            `INSERT INTO answers
            (
                session_id,
                question_id,
                answer_text,
                speech_text,
                feedback,
                score,
                keywords_matched,
                keywords_missed
            )
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

        // -----------------------------
        // UPDATE SESSION PROGRESS
        // -----------------------------
        await pool.query(
            `UPDATE interview_sessions
             SET current_question_index =
             current_question_index + 1
             WHERE id = $1`,
            [sessionId]
        );

        const sessionResult = await pool.query(
            'SELECT * FROM interview_sessions WHERE id = $1',
            [sessionId]
        );

        const session = sessionResult.rows[0];

        let completed = false;

        if (session.current_question_index >= session.total_questions) {

            await pool.query(
                `UPDATE interview_sessions
                 SET status = 'completed',
                 end_time = CURRENT_TIMESTAMP
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

        res.status(500).json({
            error: error.message
        });
    }
};

// -----------------------------
// Get Results
// -----------------------------
const getResults = async (req, res) => {

    try {

        const { sessionId } = req.params;

        const userId = req.user.id;

        const sessionResult = await pool.query(
            `SELECT * FROM interview_sessions
             WHERE id = $1
             AND user_id = $2`,
            [sessionId, userId]
        );

        if (sessionResult.rows.length === 0) {

            return res.status(404).json({
                error: 'Session not found'
            });
        }

        const session = sessionResult.rows[0];

        const answersResult = await pool.query(
            `SELECT
                a.*,
                q.question_text,
                q.category,
                q.skill_focused,
                q.difficulty
             FROM answers a
             JOIN generated_questions q
             ON a.question_id = q.id
             WHERE a.session_id = $1
             ORDER BY a.created_at`,
            [sessionId]
        );

        const answers = answersResult.rows;

        const totalScore = answers.reduce(
            (sum, a) => sum + (a.score || 0),
            0
        );

        const averageScore =
            answers.length > 0
                ? (totalScore / answers.length).toFixed(1)
                : 0;

        const allMatched = answers.flatMap(
            a => a.keywords_matched || []
        );

        const allMissed = answers.flatMap(
            a => a.keywords_missed || []
        );

        const feedbackPrompt = `
Provide overall interview feedback.

Average score: ${averageScore}/10

${answers.map(a => `
Q: ${a.question_text}

Score: ${a.score}

Feedback: ${a.feedback}
`).join('\n\n')}

Give final suggestions.
`;

        const completion = await groq.chat.completions.create({

            model: "llama-3.1-8b-instant",

            messages: [
                {
                    role: "user",
                    content: feedbackPrompt
                }
            ],

            temperature: 0.5
        });

        const overallFeedback =
            completion.choices[0].message.content;

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

        res.status(500).json({
            error: error.message
        });
    }
};

// -----------------------------
// Get Interview Session
// -----------------------------
const getInterviewSession = async (req, res) => {

    try {

        const { sessionId } = req.params;

        const userId = req.user.id;

        const sessionResult = await pool.query(
            `SELECT *
             FROM interview_sessions
             WHERE id = $1
             AND user_id = $2`,
            [sessionId, userId]
        );

        if (sessionResult.rows.length === 0) {

            return res.status(404).json({
                error: 'Interview session not found'
            });
        }

        const session = sessionResult.rows[0];

        const questionsResult = await pool.query(
            `SELECT *
             FROM generated_questions
             WHERE used_in_interview = true
             ORDER BY id ASC
             LIMIT $1`,
            [session.total_questions]
        );

        res.json({
            session,
            questions: questionsResult.rows
        });

    } catch (error) {

        console.error(
            'Error getting interview session:',
            error
        );

        res.status(500).json({
            error: error.message
        });
    }
};
// ADD THIS FUNCTION INSIDE interviewController.js
// PLACE IT ABOVE module.exports

const getDashboardStats = async (req, res) => {

    try {

        const userId = req.user.id;

        const result = await pool.query(
            `
            SELECT
                AVG(score)::numeric(10,1)
                AS average_score
            FROM answers a
            JOIN interview_sessions s
            ON a.session_id = s.id
            WHERE s.user_id = $1
            `,
            [userId]
        );

        res.json({
            averageScore:
                result.rows[0].average_score || 0
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: error.message
        });
    }
};

// REPLACE YOUR module.exports WITH THIS

module.exports = {
    startInterview,
    submitAnswer,
    getResults,
    getInterviewSession,
    getDashboardStats
};