const cuid = require('cuid');
const slug = require('limax');
const sanitizeHtml = require('sanitize-html');
const User = require('../models/user');
const Post = require('../models/post');
const verifyToken = require('../utils/tokenOpt');

/**
 * Get all posts
 * @param req
 * @param res
 * @returns void
 */
const getPosts = async (req, res) => {
  Post.find()
    .sort('-dateAdded')
    .exec((err, posts) => {
      if (err) {
        res.status(500).send(err);
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
const addPost = async (req, res) => {
  if (!req.body.post.name || !req.body.post.title || !req.body.post.content) {
    res.status(403).end();
  }

  const token = req.cookies.jwt;
  const newPost = new Post(req.body.post);

  if (token) {
    try {
      const decodedToken = await verifyToken(token);
      const user = await User.findById(decodedToken.id);

      newPost.ownedBy = user.id;
      newPost.title = sanitizeHtml(newPost.title);
      newPost.name = sanitizeHtml(newPost.name);
      newPost.content = sanitizeHtml(newPost.content);
      newPost.imgUrl = sanitizeHtml(newPost.imgUrl);

      newPost.slug = slug(newPost.title.toLowerCase(), { lowercase: true });
      newPost.cuid = cuid();

      newPost.save((saveErr, saved) => {
        if (saveErr) {
          return res.status(500).send(saveErr);
        }
        res.json({ post: saved });
      });
    } catch (err) {
      res.status(403).end();
    }
  } else {
    res.status(403).json({ error: 'Please login first' });
  }
};

/**
 * Get a single post
 * @param req
 * @param res
 * @returns void
 */
const getPost = async (req, res) => {
  Post.findOne({ cuid: req.params.cuid }).exec((err, post) => {
    if (err) {
      res.status(500).send(err);
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
const deletePost = async (req, res) => {
  const token = req.cookies.jwt;

  if (token) {
    try {
      const decodedToken = await verifyToken(token);
      const user = await User.findById(decodedToken.id);
      const post = await Post.findOne({ cuid: req.params.cuid });

      if (user && post && user.id === post.ownedBy) {
        post.remove(() => res.status(200).end());
      } else {
        return res.status(401).json({ error: 'Unauthorized to delete' });
      }
    } catch (err) {
      return res.status(403).end();
    }
  } else {
    res.status(403).json({ error: 'Please login first' });
  }
};

module.exports = {
  getPosts,
  addPost,
  getPost,
  deletePost
};
