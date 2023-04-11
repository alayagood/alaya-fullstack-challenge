const Post = require('../models/post');
const cuid = require('cuid');
const slug = require('limax');
const sanitizeHtml = require('sanitize-html');
const media = require('../utils/media')


/**
 * Get all posts
 * @param req
 * @param res
 * @returns void
 */
getPosts = async (req, res) => {
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
addPost = async (req, res) => {
  const newPost = new Post(req.body);

  newPost.title = sanitizeHtml(req.body.title);
  newPost.name = sanitizeHtml(req.body.name);
  newPost.content = sanitizeHtml(req.body.content);
  newPost.authorCuid = req.body.authorCuid;
  newPost.slug = slug(newPost.title.toLowerCase(), { lowercase: true });
  newPost.cuid = cuid();
  newPost.image = newPost.cuid + newPost.title;

  newPost.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
     media.handleUpload(req.file, newPost.image);
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
deletePost = async (req, res) => {
  Post.findOne({ cuid: req.params.cuid }).exec((err, post) => {
    if (err) {
      res.status(500).send(err);
    }

    post.remove(() => {
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
