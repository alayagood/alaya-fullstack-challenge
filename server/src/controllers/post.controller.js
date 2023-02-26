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
  const posts = await Post.find().sort('-dateAdded') || [];
  res.json({ posts });
};

/**
 * Save a post
 * @param req
 * @param res
 * @returns void
 */
addPost = async (req, res) => {
  const input = req.body.post;

  if (!input || !input.title || !input.content) {
    res.status(403).end();
    return;
  }

  const title = sanitizeHtml(input.title);
  const post = await Post.create({
    name: req.user.name,
    userId: req.user.id,
    title,
    content: sanitizeHtml(input.content),
    slug: slug(title.toLowerCase(), { lowercase: true }),
    cuid: cuid(),
    img: input.img
  })

  if (!post) {
    res.status(500).end();
    return;
  }

  res.json({ post });
};

/**
 * Get a single post
 * @param req
 * @param res
 * @returns void
 */
getPost = async (req, res) => {
  const post = await Post.findOne({ cuid: req.params.cuid });
  if (!post) {
    res.status(404).end();
    return;
  }
  res.json({ post });
};

/**
 * Delete a post
 * @param req
 * @param res
 * @returns void
 */
deletePost = async (req, res) => {
  const post = await Post.findOne({ cuid: req.params.cuid });
  if (!post) {
    res.status(404).end();
    return;
  }
  if (post.userId != req.user.id) {
    res.status(401).end();
    return;
  }
  await post.remove();
  res.status(200).end();
};

module.exports = {
  getPosts,
  addPost,
  getPost,
  deletePost
};
