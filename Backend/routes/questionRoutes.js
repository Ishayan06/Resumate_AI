const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware'); // IMPORT the middleware
const {
    getAllQuestions,
    getQuestionById,
    createQuestion,
    updateQuestion,
    deleteQuestion
} = require('../controllers/questionController');

// PUBLIC ROUTES - Anyone can view questions
router.get('/', getAllQuestions);           // No middleware - anyone can see all questions
router.get('/:id', getQuestionById);        // No middleware - anyone can see one question

// PROTECTED ROUTES - Only logged-in users can modify
router.post('/', authMiddleware, createQuestion);        // Only logged-in users can create
router.put('/:id', authMiddleware, updateQuestion);      // Only logged-in users can update
router.delete('/:id', authMiddleware, deleteQuestion);   // Only logged-in users can delete

module.exports = router;