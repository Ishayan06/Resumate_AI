// routes/interviewRoutes.js

const express = require('express');
const router = express.Router();
const multer = require('multer');

const pool = require('../config/database');

const authMiddleware = require('../middleware/authMiddleware');

const {
    startInterview,
    submitAnswer,
    getResults,
    getInterviewSession,
    getDashboardStats
} = require('../controllers/interviewController');

const upload = multer({
    storage: multer.memoryStorage()
});

// -----------------------------
// Start Interview
// -----------------------------
router.post('/start', authMiddleware, startInterview);

// -----------------------------
// Submit Answer
// -----------------------------
router.post('/answer', authMiddleware, submitAnswer);

// -----------------------------
// Get Results
// -----------------------------
router.get('/results/:sessionId', authMiddleware, getResults);

// -----------------------------
// Dashboard Stats
// -----------------------------
router.get(
    '/dashboard/stats',
    authMiddleware,
    getDashboardStats
);

// -----------------------------
// Audio Upload
// -----------------------------
router.post(
    '/audio-answer',
    authMiddleware,
    upload.single('audio'),
    async (req, res) => {

        try {

            res.json({
                message: 'Audio received',
                text: 'Audio transcription would go here'
            });

        } catch (err) {

            console.error(err);

            res.status(500).json({
                error: err.message
            });
        }
    }
);

// -----------------------------
// Get Interview Session
// -----------------------------
router.get('/:sessionId', authMiddleware, async (req, res) => {

    try {

        const { sessionId } = req.params;

        const questions = await pool.query(
            `
            SELECT
                q.id,
                q.question_text,
                q.category,
                q.difficulty,
                q.skill_focused
            FROM generated_questions q
            JOIN interview_sessions s
            ON s.resume_id = q.resume_id
            WHERE s.id = $1
            `,
            [sessionId]
        );

        res.json({
            questions: questions.rows.map(q => ({
                id: q.id,
                text: q.question_text,
                category: q.category,
                difficulty: q.difficulty,
                skill: q.skill_focused
            }))
        });

    } catch (err) {

        console.error(
            "❌ FETCH QUESTIONS ERROR:",
            err
        );

        res.status(500).json({
            error: err.message
        });
    }
});

module.exports = router;