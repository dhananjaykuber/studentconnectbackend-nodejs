const express = require('express');
const { generateQuiz } = require('../../../controllers/gptQuiz/quiz');
const authMiddleware = require('../../../middleware/auth');

const router = express.Router();

router.get('/quiz', generateQuiz);

module.exports = router;
