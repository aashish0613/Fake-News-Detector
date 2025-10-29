const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/check', authMiddleware, articleController.checkArticle);
router.post('/vote', authMiddleware, articleController.voteArticle);
router.post('/comment', authMiddleware, articleController.commentArticle);
router.get('/me', authMiddleware, articleController.getUserSubmissions);

module.exports = router;