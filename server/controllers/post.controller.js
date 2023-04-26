const Post = require('../models/post');
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
      res.status(500).send(err);
    }

    // handle delete permissions
    posts = posts.map(post => {
      let canBeDeleted = false;
      if (post.user == req.session.cuid) canBeDeleted = true;

      return { ...post.toJSON(), canBeDeleted };
    });

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
  if (!req.body.post || !req.body.post.title || !req.body.post.content) {
    return res.status(403).end();
  }

  const newPost = new Post(req.body.post);

  // Let's sanitize inputs
  newPost.title = sanitizeHtml(newPost.title);
  newPost.content = sanitizeHtml(newPost.content);

  newPost.user = req.session.cuid;
  newPost.name = `${req.session.firstname} ${req.session.lastname}`;
  newPost.slug = slug(newPost.title.toLowerCase(), { lowercase: true });
  newPost.save((err, saved) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ post: { ...saved.toJSON(), canBeDeleted: true } });
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

    // validate if it can be deleted by user
    if (post.user != req.session.cuid) {
      return res.status(400).end();
    }

    post.remove(() => {
      res.status(200).send({ cuid: req.params.cuid });
    });
  });
};

module.exports = {
  getPosts,
  addPost,
  getPost,
  deletePost
};
