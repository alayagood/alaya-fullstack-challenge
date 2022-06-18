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
    .populate("owner")
    .sort("-dateAdded")
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
addPost = async (req, res) => {
  try {
    if (!req.body.title || !req.body.content) {
      res.status(403).end();
    }

    const newPost = new Post(req.body);

    // Let's sanitize inputs
    newPost.title = sanitizeHtml(newPost.title);
    newPost.content = sanitizeHtml(newPost.content);

    newPost.owner = req.user.id;
    newPost.slug = slug(newPost.title.toLowerCase(), { lowercase: true });
    newPost.cuid = cuid();
    newPost.save((err, saved) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.json({ post: saved });
    });
  } catch (error) {
    res.status(400).send();
  }
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
  Post.findOne({ cuid: req.params.cuid })
    .populate("owner")
    .exec((err, post) => {
      if (err) {
        res.status(500).send(err);
      }

      if (req.user.id === post.owner.id) {
        post.remove(() => {
          res.status(200).end();
        });
      } else {
        return res
          .status(401)
          .json({ message: "You are not authorized to delete the post" });
      }
    });
};

module.exports = {
  getPosts,
  addPost,
  getPost,
  deletePost,
};
