const Post = require('../models/post');
const { createNewPost } = require('../libs/post/create');

/**
 * Get all posts
 * @param req
 * @param res
 * @returns void
 */
const getPosts = async (req, res) => {
  Post.find()
    .sort('-dateAdded')
    .exec((err, posts) => {
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
const addPost = async (req, res) => {
  try {
    const newPost = await createNewPost(req.body.post, req.decodedToken.sub);
    return res.json({ post: newPost });
  } catch (err) {
    throw err;
  }
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

    post.remove(() => {
      res.status(200).end();
    });
  });
};

module.exports = {
  getPosts,
  addPost,
  getPost,
  deletePost,
};
