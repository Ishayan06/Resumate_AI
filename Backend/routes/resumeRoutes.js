const express = require('express');
const router = express.Router();
const multer = require('multer');
const authMiddleware = require('../middleware/authMiddleware');
const { uploadResume } = require('../controllers/resumeController');

// Configure multer for file upload
const upload = multer({ 
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Protected route - only logged-in users can upload resume
router.post('/upload', authMiddleware, upload.single('resume'), uploadResume);

module.exports = router;