const express = require('express');

const router = express.Router();

const multer = require('multer');

const authMiddleware = require('../middleware/authMiddleware');

const {
    uploadResume
} = require('../controllers/resumeController');

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});

router.post(
    '/upload',
    authMiddleware,
    upload.single('resume'),
    uploadResume
);

module.exports = router;