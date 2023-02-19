const express = require('express');
const router = express.Router();
const PostController = require('../controllers/post.controller');
const protect = require("../middlewares/protect");

// Get all Posts
router.route('/posts').get(protect, PostController.getPosts);

// Get one post by cuid
router.route('/posts/:cuid').get(protect, PostController.getPost);

// Add a new Post
router.route('/posts').post(protect, PostController.addPost);

// Delete a post by cuid
router.route('/posts/:cuid').delete(protect, PostController.deletePost);

module.exports = router;
