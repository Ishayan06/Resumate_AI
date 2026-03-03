const pool = require('../config/database');

// Get all questions (public)
const getAllQuestions = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM questions ORDER BY id');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching questions:', error);
        res.status(500).json({ error: 'Failed to fetch questions' });
    }
};

// Get single question by ID (public)
const getQuestionById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM questions WHERE id = $1', [id]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Question not found' });
        }
        
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error fetching question:', error);
        res.status(500).json({ error: 'Failed to fetch question' });
    }
};

// Create new question (protected)
const createQuestion = async (req, res) => {
    try {
        // Get user ID from middleware (only available on protected routes)
        const userId = req.user.id; // This comes from authMiddleware!
        console.log('User creating question:', userId); // For debugging
        
        const { title, category, difficulty, expected_answer } = req.body;
        
        // Validate input
        if (!title || !category || !difficulty) {
            return res.status(400).json({ error: 'Title, category, and difficulty are required' });
        }
        
        // First, check if created_by column exists, if not, we need to add it
        // For now, let's insert without created_by
        const result = await pool.query(
    'INSERT INTO questions (title, category, difficulty, expected_answer, created_by) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [title, category, difficulty, expected_answer, userId]
);
        
        res.status(201).json({
            message: 'Question created successfully',
            question: result.rows[0],
            createdBy: userId // Show who created it
        });
    } catch (error) {
        console.error('Error creating question:', error);
        res.status(500).json({ error: 'Failed to create question' });
    }
};

// Update question (protected)
const updateQuestion = async (req, res) => {
    try {
        const userId = req.user.id; // Get from middleware
        const { id } = req.params;
        const { title, category, difficulty, expected_answer } = req.body;
        
        // Check if question exists
        const checkExists = await pool.query('SELECT id FROM questions WHERE id = $1', [id]);
        if (checkExists.rows.length === 0) {
            return res.status(404).json({ error: 'Question not found' });
        }
        
        const result = await pool.query(
            'UPDATE questions SET title = $1, category = $2, difficulty = $3, expected_answer = $4 WHERE id = $5 RETURNING *',
            [title, category, difficulty, expected_answer, id]
        );
        
        res.json({
            message: 'Question updated successfully',
            question: result.rows[0],
            updatedBy: userId
        });
    } catch (error) {
        console.error('Error updating question:', error);
        res.status(500).json({ error: 'Failed to update question' });
    }
};

// Delete question (protected)
const deleteQuestion = async (req, res) => {
    try {
        const userId = req.user.id; // Get from middleware
        const { id } = req.params;
        
        // Check if question exists
        const checkExists = await pool.query('SELECT id FROM questions WHERE id = $1', [id]);
        if (checkExists.rows.length === 0) {
            return res.status(404).json({ error: 'Question not found' });
        }
        
        const result = await pool.query('DELETE FROM questions WHERE id = $1 RETURNING id', [id]);
        
        res.json({
            message: 'Question deleted successfully',
            id: result.rows[0].id,
            deletedBy: userId
        });
    } catch (error) {
        console.error('Error deleting question:', error);
        res.status(500).json({ error: 'Failed to delete question' });
    }
};

module.exports = {
    getAllQuestions,
    getQuestionById,
    createQuestion,
    updateQuestion,
    deleteQuestion
};