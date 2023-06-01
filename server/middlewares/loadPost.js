const Post = require('../models/post');

const loadPostByCuid = async (req, res, next) => {
  try {
    const post = await Post.findOne({ cuid: req.params.cuid });

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    req.post = post;

    next();
  } catch (error) {
    console.error('Error loading post:', error);
    return res.status(500).json({ error: 'Failed to load post' });
  }
};

module.exports = { loadPostByCuid };