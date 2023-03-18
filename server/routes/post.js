const express = require('express');
const router = express.Router();
const PostController = require('../controllers/post');
const authenticateToken = require('../middlware/verifyToken');

// Get all Posts
router.route('/posts').get(PostController.getPosts);

// Get one post by cuid
router.route('/posts/:cuid').get(PostController.getPost);

// Add a new Post
router.route('/posts').post(authenticateToken, PostController.addPost);

// Delete a post by cuid
router.route('/posts/:cuid').delete(authenticateToken, PostController.deletePost);

module.exports = router;

