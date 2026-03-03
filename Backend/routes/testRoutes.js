const express = require('express');
const router = express.Router();
const { testServer, testDatabase } = require('../controllers/testController');

router.get('/test', testServer);
router.get('/test-db', testDatabase);

module.exports = router;