const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');
const {
    startInterview,
    submitAnswer,
    getResults
} = require('../controllers/interviewController');

const upload = multer({ storage: multer.memoryStorage() });

// Protected interview routes
router.post('/start', authMiddleware, startInterview);
router.post('/answer', authMiddleware, submitAnswer);
router.get('/results/:sessionId', authMiddleware, getResults);

// Optional: Audio upload for speech-to-text
router.post('/audio-answer', authMiddleware, upload.single('audio'), async (req, res) => {
    try {
        // Here you would integrate with a speech-to-text service
        // Examples: Google Cloud Speech-to-Text, Whisper API, etc.
        
        // For now, return a placeholder
        res.json({ 
            message: 'Audio received',
            // In real implementation, you'd return transcribed text
            text: 'Audio transcription would go here' 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;