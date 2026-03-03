const pool = require('../config/database');

class GeneratedQuestion {
    // Save AI-generated question
    static async create(questionData) {
        const { user_id, resume_id, question_text, category, skill_focused, difficulty } = questionData;
        const query = `
            INSERT INTO generated_questions 
            (user_id, resume_id, question_text, category, skill_focused, difficulty)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *
        `;
        const values = [user_id, resume_id, question_text, category, skill_focused, difficulty];
        const result = await pool.query(query, values);
        return result.rows[0];
    }

    // Get random unused question for user
    static async getRandomUnused(userId) {
        const query = `
            SELECT * FROM generated_questions 
            WHERE user_id = $1 AND used_in_interview = false
            ORDER BY RANDOM() LIMIT 1
        `;
        const values = [userId];
        const result = await pool.query(query, values);
        return result.rows[0];
    }

    // Mark question as used
    static async markAsUsed(id) {
        const query = 'UPDATE generated_questions SET used_in_interview = true WHERE id = $1';
        const values = [id];
        await pool.query(query, values);
    }
}
module.exports = GeneratedQuestion;