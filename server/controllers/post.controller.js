const Post = require('../models/post');
const cuid = require('cuid');
const slug = require('limax');
const sanitizeHtml = require('sanitize-html');

require('dotenv').config();
const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});


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
  if (!req.body.post.email || !req.body.post.title || !req.body.post.content) {
    res.status(403).end();
  }

  const newPost = new Post(req.body.post);

  // Let's sanitize inputs
  newPost.title = sanitizeHtml(newPost.title);
  newPost.email = sanitizeHtml(newPost.email);
  newPost.content = sanitizeHtml(newPost.content);
  
  newPost.slug = slug(newPost.title.toLowerCase(), { lowercase: true });
  newPost.cuid = cuid();
  newPost.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
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


/**
 * Upload image to cloudinary
 * @param req
 * @param res
 * @returns string
 */
imageUpload = async (req, res) => {
  const cloudinaryImage = await cloudinary.uploader
  .upload(req.file.path);
  
  res.json({ cloudinaryImage });

};

module.exports = {
  getPosts,
  addPost,
  getPost,
  deletePost,
  imageUpload
};
