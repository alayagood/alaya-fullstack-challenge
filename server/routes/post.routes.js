const express = require('express');
const passport = require('passport');
const PostController = require('../controllers/post.controller');
const { requireAuthentication } = require('../middleware');

const router = express.Router();

// Get all posts
router.route('/posts').get(PostController.getPosts);

// Get a post by cuid
router.route('/posts/:cuid').get(PostController.getPost);

// Add a new post
router.route('/posts').post(requireAuthentication, PostController.addPost);

// Delete a post by cuid
router.route('/posts/:cuid').delete(requireAuthentication, PostController.deletePost);

module.exports = router;
