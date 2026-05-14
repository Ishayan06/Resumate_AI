const express = require('express');
const cors = require('cors');
const testAll = require('./startupTest');
require('dotenv').config();
const cron = require('node-cron');
const https = require('https');
const { sendDailyReminders } = require('./controllers/reminderController');

// Import routes
const sessionRoutes = require('./routes/session');
const testRoutes      = require('./routes/testRoutes');
const questionRoutes  = require('./routes/questionRoutes');
const authRoutes      = require('./routes/authRoutes');
const resumeRoutes    = require('./routes/resumeRoutes');
const interviewRoutes = require('./routes/interviewRoutes');
const streakRoutes    = require('./routes/streak');
const telegramRoutes  = require('./routes/telegramRoutes');
const reminderRoutes  = require('./routes/reminderRoutes');
const dsaPlanRoutes   = require('./routes/dsaPlan');
const communicationRoutes = require('./routes/communicationRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        status: '🚀 Resumate AI Backend is Live!',
        endpoints: {
            test:      '/api/test',
            auth:      '/api/auth',
            resume:    '/api/resume',
            interview: '/api/interview',
            questions: '/api/questions',
            streak:    '/api/streak',
            telegram:  '/api/telegram',
            reminder:  '/api/reminder',
            dsaPlan:   '/api/dsa-plan',
        }
    });
});

// Routes
app.use('/api/communication', communicationRoutes);
app.use('/api/test',      testRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/auth',      authRoutes);
app.use('/api/resume',    resumeRoutes);
app.use('/api/interview', interviewRoutes);
app.use('/api/telegram',  telegramRoutes);
app.use('/api/reminder',  reminderRoutes);
app.use('/api/streak',    streakRoutes);
app.use('/api/dsa-plan',  dsaPlanRoutes);
app.use('/api/session',   sessionRoutes);

// ─── Cron Job: Daily Reminders at 10pm IST ───────────────────────────────────
cron.schedule('0 22 * * *', () => {
    console.log('⏰ Running daily reminders...');
    sendDailyReminders().catch(console.error);
}, {
    timezone: "Asia/Kolkata"
});

// ─── Keep-Alive Ping (prevents Render from sleeping) ─────────────────────────
const RENDER_URL = process.env.RENDER_URL || 'https://your-app-name.onrender.com';

setInterval(() => {
    https.get(RENDER_URL, (res) => {
        console.log(`✅ Keep-alive ping sent: ${res.statusCode}`);
    }).on('error', (e) => {
        console.error(`❌ Keep-alive ping failed: ${e.message}`);
    });
}, 10 * 60 * 1000); // every 10 minutes

// ─── Start Server ─────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3001;
app.listen(PORT, async () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    setTimeout(() => {
        testAll();
    }, 1000);
});