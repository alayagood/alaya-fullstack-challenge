const Post = require('../models/post');
const cuid = require('cuid');
const slug = require('limax');
const sanitizeHtml = require('sanitize-html');
const cloudinary = require('cloudinary').v2;

/**
 * Get all posts
 * @param req
 * @param res
 * @returns void
 */
const getPosts = async (req, res) => {
  Post.find().sort('-dateAdded').exec((err, posts) => {
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
  const newPost = new Post(req.body.post);

  // Let's sanitize inputs
  newPost.title = sanitizeHtml(newPost.title);
  newPost.name = sanitizeHtml(newPost.name);
  newPost.content = sanitizeHtml(newPost.content);

  newPost.slug = slug(newPost.title.toLowerCase(), { lowercase: true });
  newPost.cuid = cuid();

  if (req.body.post.media) {
    const res = await cloudinary.uploader.upload(`data:image/jpeg;base64,${req.body.post.media}`, {
      public_id: newPost.cuid,
    });

    newPost.media = res.secure_url;
  }

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
  Post.findOne({ cuid: req.params.cuid }).exec((err, post) => {
    if (err) {
      res.status(500).send(err);
    }

    post.remove(async () => {
      await cloudinary.uploader.destroy(post.cuid);
      res.status(200).end();
    });
  });
};

module.exports = {
  getPosts,
  addPost,
  getPost,
  deletePost
};
