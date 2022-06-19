const Post = require("../models/post");
const { validationResult } = require("express-validator");
const cuid = require("cuid");
const slug = require("limax");

/**
 * Get all posts
 * @param req
 * @param res
 * @returns void
 */
getPosts = async (_req, res, next) => {
  try {
    const posts = await Post.find().populate("owner").sort("-dateAdded");
    res.json({ posts });
  } catch (error) {
    next(error);
  }
};

/**
 * Save a post
 * @param req
 * @param res
 * @returns void
 */
addPost = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(403).json({ errors: errors.array() });
    }

    const newPost = new Post(req.body);

    newPost.owner = req.user.id;
    newPost.slug = slug(newPost.title.toLowerCase(), { lowercase: true });
    newPost.cuid = cuid();

    // const coverURL = await post;

    const newPostAdded = await newPost.save();
    return res.json({ post: newPostAdded });
  } catch (error) {
    next(error);
  }
};

/**
 * Get a single post
 * @param req
 * @param res
 * @returns void
 */
getPost = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(403).json({ errors: errors.array() });
    }

    const post = await Post.findOne({ cuid: req.params.cuid });
    res.json({ post });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete a post
 * @param req
 * @param res
 * @returns void
 */
deletePost = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(403).json({ errors: errors.array() });
    }

    const post = await Post.findOne({ cuid: req.params.cuid }).populate(
      "owner"
    );

    if (req.user.id === post?.owner?.id) {
      await post.remove();
      res.status(200).end();
    } else {
      return res
        .status(401)
        .json({ message: "You are not authorized to delete the post" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPosts,
  addPost,
  getPost,
  deletePost,
};
