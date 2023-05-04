const Post = require("../models/post");
const cuid = require("cuid");
const slug = require("limax");
const sanitizeHtml = require("sanitize-html");

/**
 * Get all posts
 * @param req
 * @param res
 * @returns void
 */
getPosts = async (req, res) => {
  Post.find()
    .sort("-dateAdded")
    .exec((err, posts) => {
      if (err) {
        res.status(500).send(err);
      }
      res.json({posts});
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
    return res.status(400).end();
  }

  const newPost = new Post(req.body.post);

  // Let's sanitize inputs
  newPost.title = sanitizeHtml(newPost.title);
  newPost.content = sanitizeHtml(newPost.content);

  newPost.slug = slug(newPost.title.toLowerCase(), {lowercase: true});
  newPost.cuid = cuid();
  newPost.author = req.user._id;

  newPost.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({post: saved});
  });
};

/**
 * Get a single post
 * @param req
 * @param res
 * @returns void
 */
getPost = async (req, res) => {
  Post.findOne({cuid: req.params.cuid}).exec((err, post) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({post});
  });
};

/**
 * Delete a post
 * @param req
 * @param res
 * @returns void
 */
deletePost = async (req, res) => {
  Post.findOne({cuid: req.params.cuid}).exec((err, post) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (!post) {
      return res.status(404).end();
    }

    if (req.user._id !== post.author.toString()) {
      return res.status(403).end();
    }

    post.remove(() => {
      res.status(200).json({cuid: req.params.cuid});
    });
  });
};

module.exports = {
  getPosts,
  addPost,
  getPost,
  deletePost,
};
