const express = require('express');
const multer = require('multer');
const { extractResumeText } = require('../controllers/extractResumeController');

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 2 * 1024 * 1024 } });

router.post('/extract-resume', upload.single('resume'), extractResumeText);

module.exports = router;

