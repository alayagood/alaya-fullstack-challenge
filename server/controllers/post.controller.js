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
const getPosts = async (req, res) => {
  Post.find().populate('by', 'name').sort('-createdAt').exec((err, posts) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ posts });
  });
};

const getPostsByUser = async (req, res) => {
  const userId = req.params.userid;
  Post.find({ by: userId }).populate('by', 'name').sort('-createdAt').exec((err, posts) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ posts });
  });
}

/**
 * Save a post
 * @param req
 * @param res
 * @returns void
 */
const addPost = async (req, res) => {

  if (!req.body.by || !req.body.title || !req.body.content) {
    res.status(403).end();
  }

  const imagenRuta = req.files_url.length ? req.files_url : undefined;

  const newPost = new Post(req.body);

  // Let's sanitize inputs
  newPost.by = sanitizeHtml(newPost.by);
  newPost.title = sanitizeHtml(newPost.title);
  newPost.name = sanitizeHtml(newPost.name);
  newPost.content = sanitizeHtml(newPost.content);
  newPost.images = imagenRuta;

  newPost.slug = slug(newPost.title.toLowerCase(), { lowercase: true });
  newPost.cuid = cuid();
  newPost.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
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
const getPost = async (req, res) => {
  Post.findOne({ cuid: req.params.cuid }).populate('by', 'name').exec((err, post) => {
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

  Post.findOne({ cuid: req.params.cuid }).exec((err, post) => {
    if (err) {
      res.status(500).send(err);
    }
    if (post === null) {
      res.status(500).json(err);
    } else {
      post.remove(() => {
        res.status(200).json({ deleted: true }).end();
      });
    }
    
  }); 
};

module.exports = {
  getPosts,
  getPostsByUser,
  addPost,
  getPost,
  deletePost
};
