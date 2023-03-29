const Post = require('../models/post');
const cuid = require('cuid');
const slug = require('limax');
const sanitizeHtml = require('sanitize-html');
const cloudinary = require('../util/cloudinary');

/**
 * Get all posts
 * @param req
 * @param res
 * @returns void
 */
getPosts = async (req, res) => {
  Post.find({ user: req.user._id }).sort('-dateAdded').exec((err, posts) => {
    if (err) {
      res.status(500).send(err);
      return;
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
  if (!req.body.title || !req.body.content) {
    res.status(400).end();
  }


  const newPost = new Post(req.body);

  // Let's sanitize inputs
  newPost.title = sanitizeHtml(newPost.title);
  newPost.name = req.user.name;
  newPost.content = sanitizeHtml(newPost.content);
  newPost.user = req.user._id;

  if (req.body.image) {
    try {
      const imageUploadResult = await cloudinary.uploader.upload(req.body.image, {
        overwrite: true,
        invalidate: true,
        resource_type: "image",
      });
      if (!imageUploadResult?.secure_url) {
        res.status(500).send(err);
        return;
      }
      newPost.image = {
        public_id: imageUploadResult.public_id,
        url: imageUploadResult.secure_url
      }
    } catch(error) {
      res.status(400).json({ error: error.message });
    }
  }

  newPost.slug = slug(newPost.title.toLowerCase(), { lowercase: true });
  newPost.cuid = cuid();
  newPost.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
      return;
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
getPost = async (req, res) => {
  Post.findOne({ cuid: req.params.cuid }).exec((err, post) => {
    if (err) {
      res.status(500).send(err);
      return;
    }

    if (!post) {
      res.status(404).end();
      return;
    }

    if (!post.user._id.equals(req.user._id)) {
      console.log(typeof(post.user._id))
      console.log(typeof(req.user._id))
      res.status(401).end()
      return;
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
      return;
    }

    if (!post) {
      res.status(404).end();
      return;
    }

    if (post.user !== req.user._id) {
      res.status(401).end();
      return;
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
