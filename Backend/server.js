const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import routes
const testRoutes = require('./routes/testRoutes');
const questionRoutes = require('./routes/questionRoutes');
const authRoutes = require('./routes/authRoutes');
const resumeRoutes = require('./routes/resumeRoutes');
const interviewRoutes = require('./routes/interviewRoutes'); // Add this

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', testRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/interview', interviewRoutes); // Add this

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});