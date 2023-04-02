const Post = require('../models/post');
const cuid = require('cuid');
const slug = require('limax');
const sanitizeHtml = require('sanitize-html');

const uploader = require('../services/uploader')


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
  if (!req.body.name || !req.body.title || !req.body.content) {
    return res.status(400).end();
  }

  const newPost = new Post(req.body);

  // Let's sanitize inputs
  newPost.title = sanitizeHtml(newPost.title);
  newPost.name = sanitizeHtml(newPost.name);
  newPost.content = sanitizeHtml(newPost.content);

  newPost.slug = slug(newPost.title.toLowerCase(), {lowercase: true});
  newPost.cuid = cuid();
  newPost.picture = null;
  newPost.author = req.context.user.email;

  if (req.file?.path) {
    const file = await uploader.uploads(req.file.path, 'images');
    newPost.picture = file.url;
  }

   newPost.save((err, saved) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.json({post: saved});
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

    if(post.author !== req.context.user.email){
      return res.status(403).end();
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
