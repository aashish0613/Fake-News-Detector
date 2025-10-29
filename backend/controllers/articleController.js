const Article = require('../models/Article');
const crypto = require('crypto');
const axios = require('axios');

const createHash = (text) => crypto.createHash('sha256').update(text, 'utf8').digest('hex');

exports.checkArticle = async (req, res) => {
  const { title, content } = req.body;
  const contentHash = createHash(content);

  try {
    let article = await Article.findOne({ contentHash }).populate('comments.user', 'email');
    if (article) {
      return res.json({ article, source: 'database' });
    }

    // --- ML API CALL START ---
    let prediction = 'fake';
    let probability = 0.5;
    try {
      const mlRes = await axios.post(process.env.ML_API_URL, { title, content });
      prediction = mlRes.data.prediction;
      probability = mlRes.data.probability;
    } catch (mlErr) {
      console.error('ML API error:', mlErr.message);
      // fallback: keep default values
    }
    // --- ML API CALL END ---

    article = new Article({
      title,
      content,
      contentHash,
      prediction,
      probability,
      submittedBy: req.user.id,
    });
    await article.save();
    res.json({ article, source: 'new' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.voteArticle = async (req, res) => {
    const { articleId, voteType } = req.body;
    const userId = req.user.id;
    try {
        const article = await Article.findById(articleId);
        if (!article) return res.status(404).json({ msg: 'Article not found' });

        article.upvotes.pull(userId);
        article.downvotes.pull(userId);

        if (voteType === 'upvote') article.upvotes.push(userId);
        if (voteType === 'downvote') article.downvotes.push(userId);
        
        await article.save();
        res.json(article);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

exports.commentArticle = async (req, res) => {
    const { articleId, text } = req.body;
    try {
        const article = await Article.findById(articleId);
        if (!article) return res.status(404).json({ msg: 'Article not found' });

        const newComment = { user: req.user.id, text };
        article.comments.unshift(newComment);
        await article.save();
        
        const populatedArticle = await Article.findById(articleId).populate('comments.user', 'email');
        res.json(populatedArticle);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

exports.getUserSubmissions = async (req, res) => {
    try {
        const articles = await Article.find({ submittedBy: req.user.id }).sort({ createdAt: -1 });
        res.json(articles);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};