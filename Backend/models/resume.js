const pool = require('../config/database');

class Resume {
    // Save uploaded resume
    static async create(resumeData) {
        const { user_id, file_url, parsed_text, skills, experience_years } = resumeData;
        const query = `
            INSERT INTO resumes (user_id, file_url, parsed_text, skills, experience_years)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
        `;
        const values = [user_id, file_url, parsed_text, skills, experience_years];
        const result = await pool.query(query, values);
        return result.rows[0];
    }

    // Get user's latest resume
    static async findByUser(userId) {
        const query = 'SELECT * FROM resumes WHERE user_id = $1 ORDER BY created_at DESC';
        const values = [userId];
        const result = await pool.query(query, values);
        return result.rows[0];
    }
}
module.exports = Resume;