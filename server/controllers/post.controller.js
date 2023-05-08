const Post = require('../models/post');
const cuid = require('cuid');
const slug = require('limax');
const sanitizeHtml = require('sanitize-html');

/**
 * Get all posts
 * @param req
 * @param res
 * @returns void
 */
getPosts = async (req, res) => {
  Post.find().sort('-dateAdded').exec((err, posts) => {
    if (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
    res.json({ posts });
  });
};

/**
 * Save a post
 * @param req
 * @param res
 * @returns void
 */
addPost = async (req, res) => {
  if (!req.body.post || !req.body.post.name || !req.body.post.title || !req.body.post.content) {
    res.status(400).json({ error: 'Invalid request data' });
  }

  const newPost = new Post(req.body.post);

  // Let's sanitize inputs
  newPost.title = sanitizeHtml(newPost.title);
  newPost.name = sanitizeHtml(newPost.name);
  newPost.content = sanitizeHtml(newPost.content);

  newPost.slug = slug(newPost.title.toLowerCase(), { lowercase: true });
  newPost.cuid = cuid();
  newPost.user = req.session.userId;
  newPost.save((err, saved) => {
    if (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
    res.json({ post: saved });
  });
};

/**
 * Get a single post
 * @param req
 * @param res
 * @returns void
 */
getPost = async (req, res) => {
  Post.findOne({ cuid: req.params.cuid }).exec((err, post) => {
    if (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
    res.json({ post });
  });
};

/**
 * Delete a post
 * @param req
 * @param res
 * @returns void
 */
deletePost = async (req, res) => {
  Post.findOne({ cuid: req.params.cuid }).exec((err, post) => {
    if (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
    // Check if it belongs to user
    if (post.user != req.session.userId) {
      return res.status(403).json({ error: 'Post doesn\'t belong to user' });
    }
    post.remove(() => {
      res.status(200).json({ message: 'Post deleted' });
    });
  });
};

module.exports = {
  getPosts,
  addPost,
  getPost,
  deletePost
};
