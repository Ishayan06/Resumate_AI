const pool = require('../config/database');

class User {
    // Create a new user
    static async create(userData) {
        const { email, password, name } = userData;
        const query = 'INSERT INTO users (email, password, name) VALUES ($1, $2, $3) RETURNING id, email, name, created_at';
        const values = [email, password, name];
        
        try {
            const result = await pool.query(query, values);
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    }

    // Find user by email
    static async findByEmail(email) {
        const query = 'SELECT * FROM users WHERE email = $1';
        const values = [email];
        
        try {
            const result = await pool.query(query, values);
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    }

    // Find user by ID
    static async findById(id) {
        const query = 'SELECT id, email, name, created_at FROM users WHERE id = $1';
        const values = [id];
        
        try {
            const result = await pool.query(query, values);
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    }
}

module.exports = User;