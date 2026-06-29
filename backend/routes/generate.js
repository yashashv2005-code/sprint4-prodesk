const express = require('express');
const router = express.Router();

const { generateCoverLetter } = require('../controllers/generateController');

router.post('/generate', generateCoverLetter);

module.exports = router;

