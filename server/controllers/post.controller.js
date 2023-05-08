const Post = require('../models/post');
const cuid = require('cuid');
const slug = require('limax');
const sanitizeHtml = require('sanitize-html');
const sanitizeRequestData = require('../utils/sanitizeRequestData');
const imageService = require('../services/image.service');

/**
 * Get all posts
 * @param req
 * @param res
 * @returns void
 */
getPosts = async (req, res) => {
  Post.find().select('-images -content -user').sort('-dateAdded').exec((err, posts) => {
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

  // Sanitize data
  const postData = sanitizeRequestData(req.body.post);

  const newPost = new Post(postData);
  newPost.slug = slug(newPost.title.toLowerCase(), { lowercase: true });
  newPost.cuid = cuid();
  newPost.user = req.session.userId;

  // Process images
  newPost.images = postData.images?.map(image => image._id);

  // Save Post
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
  Post.findOne({ cuid: req.params.cuid }).populate('images').exec((err, post) => {
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
  Post.findOne({ cuid: req.params.cuid }).populate('images').exec((err, post) => {
    if (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
    // Check if it belongs to user
    if (post.user != req.session.userId) {
      return res.status(403).json({ error: 'Post doesn\'t belong to user' });
    }
    post.remove(() => {
      // Delete post images
      post.images.forEach(image => {
        imageService.deleteImage(image);
      });
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
