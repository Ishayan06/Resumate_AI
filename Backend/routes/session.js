const express = require('express');
const router  = express.Router();
const { markSessionDone } = require('../controllers/sessionController');

router.post('/complete', markSessionDone);

module.exports = router;