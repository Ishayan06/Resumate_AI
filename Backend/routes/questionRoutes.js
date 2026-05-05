const express = require('express');

const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');

const {
    getAllQuestions,
    getQuestionById,
    createQuestion,
    updateQuestion,
    deleteQuestion
} = require('../controllers/questionController');

router.get('/', getAllQuestions);

router.get('/:id', getQuestionById);

router.post('/', authMiddleware, createQuestion);

router.put('/:id', authMiddleware, updateQuestion);

router.delete('/:id', authMiddleware, deleteQuestion);

module.exports = router;