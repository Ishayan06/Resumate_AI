const express = require('express');
const router = express.Router();
const { testServer, testDatabase } = require('../controllers/testController');

router.get('/', testServer);
router.get('/db', testDatabase);

module.exports = router;