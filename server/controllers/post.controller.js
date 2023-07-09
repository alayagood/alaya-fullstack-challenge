const Post = require('../models/post');
const cuid = require('cuid');
const slug = require('limax');
const sanitizeHtml = require('sanitize-html');
const token = require('../util/token');

/**
 * Get all posts
 * @param req
 * @param res
 * @returns void
 */
getPosts = async (req, res) => {
  Post.find().sort('-dateAdded').exec((err, posts) => {
    if (err) {
      return res.status(500).send(err);
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
    if (!req.body.post.title || !req.body.post.content) {
      return res.status(403).end();
    }

    const newPost = req.body.post;
    // Let's sanitize inputs
    newPost.name = sanitizeHtml(req.user.username);
    newPost.title = sanitizeHtml(newPost.title);
    newPost.content = sanitizeHtml(newPost.content);

    newPost.slug = slug(newPost.title.toLowerCase(), {lowercase: true});
    newPost.cuid = cuid();
    const saved = await Post.create(newPost);
    return res.json({post: saved});
  } catch(e) {
    return res.status(500).send(e);
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
      return res.status(500).send(err);
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
  try {
    const postToDelete = await Post.findOne({ cuid: req.params.cuid });

    if(!postToDelete) {
      return res.status(404).send({message: 'Post not found.'}).end();
    }

    const decoded = token.decode(req.headers.authorization);
    const loggedUser = decoded.user.username;

    const postAuthor = postToDelete.name;
    if(loggedUser !== postAuthor) {
      return res.status(403).send({message: 'Not allowed to delete post.' }).end();
    }

    await postToDelete.delete();
    return res.status(200).end();

  } catch(e) {
    return res.status(500).send(e);
  }

};

module.exports = {
  getPosts,
  addPost,
  getPost,
  deletePost
};
