// setup.js
const pool = require('./config/database');

async function setup() {
    try {
        console.log('📦 Setting up database...');
        
        // Create users table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                name VARCHAR(100),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log('✅ Users table ready');

        // Create resumes table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS resumes (
                id SERIAL PRIMARY KEY,
                user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
                file_url TEXT,
                parsed_text TEXT,
                skills TEXT[],
                experience_years INTEGER,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log('✅ Resumes table ready');

        // Create questions table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS generated_questions (
                id SERIAL PRIMARY KEY,
                user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
                resume_id INTEGER REFERENCES resumes(id) ON DELETE CASCADE,
                question_text TEXT NOT NULL,
                category VARCHAR(50),
                skill_focused VARCHAR(100),
                difficulty VARCHAR(20),
                used_in_interview BOOLEAN DEFAULT false,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log('✅ Questions table ready');

        // Create interview sessions table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS interview_sessions (
                id SERIAL PRIMARY KEY,
                user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
                resume_id INTEGER REFERENCES resumes(id) ON DELETE CASCADE,
                start_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                end_time TIMESTAMP,
                current_question_index INTEGER DEFAULT 0,
                total_questions INTEGER DEFAULT 10,
                status VARCHAR(20) DEFAULT 'in_progress'
            );
        `);
        console.log('✅ Sessions table ready');

        // Create answers table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS answers (
                id SERIAL PRIMARY KEY,
                session_id INTEGER REFERENCES interview_sessions(id) ON DELETE CASCADE,
                question_id INTEGER REFERENCES generated_questions(id),
                answer_text TEXT,
                feedback TEXT,
                score INTEGER,
                keywords_matched TEXT[],
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log('✅ Answers table ready');

        console.log('\n🎉 All database tables are ready!');
        console.log('Your application is now fully set up!');
        
    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        pool.end();
    }
}

setup();