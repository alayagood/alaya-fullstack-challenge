const cuid = require('cuid');
const slug = require('limax');
const sanitizeHtml = require('sanitize-html');

const Post = require('../models/post');
const asyncHandler = require('../middlewares/asyncHandler');

/**
 * Get all posts
 * @param req
 * @param res
 * @returns void
 */
getPosts = asyncHandler(async (req, res) => {
    const posts = await Post.find().sort('-dateAdded');
    res.json({ posts });
});

/**
 * Save a post
 * @param req
 * @param res
 * @returns void
 */
addPost = asyncHandler(async (req, res) => {
    if (!req.body.post.name || !req.body.post.title || !req.body.post.content) {
        res.status(403).end();
    }

    const newPost = new Post(req.body.post);

    // Let's sanitize inputs
    newPost.authorId = req.userId;
    newPost.title = sanitizeHtml(newPost.title);
    newPost.name = sanitizeHtml(newPost.name);
    newPost.content = sanitizeHtml(newPost.content);

    newPost.slug = slug(newPost.title.toLowerCase(), { lowercase: true });
    newPost.cuid = cuid();
    const saved = await newPost.save();
    res.json({ post: saved });
});

/**
 * Get a single post
 * @param req
 * @param res
 * @returns void
 */
getPost = asyncHandler(async (req, res) => {
    const post = await Post.findOne({ cuid: req.params.cuid });
    if(post === null)
        return res.status(404).end();

    res.json({ post });
});

/**
 * Delete a post
 * @param req
 * @param res
 * @returns void
 */
deletePost = asyncHandler(async (req, res) => {
    const post = await Post.findOne({ cuid: req.params.cuid });

    if(post === null)
        return res.status(404).end();

    if(post.authorId !== req.userId)
        return res.status(401).send({ error: `Only author (id: ${post.authorId}) can delete his own posts` });

    await post.remove();
    res.status(200).end();
});

module.exports = {
  getPosts,
  addPost,
  getPost,
  deletePost
};
