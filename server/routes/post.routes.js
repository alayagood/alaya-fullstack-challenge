const express = require('express');
const router = express.Router();
const PostController = require('../controllers/post.controller');
const auth = require('../middleware/auth');

// Get all Posts
router.route('/posts').get(PostController.getPosts);

// Get one post by cuid
router.route('/posts/:cuid').get(PostController.getPost);

// Add a new Post
router.route('/posts').post(auth, PostController.addPost);

// Delete a post by cuid
router.route('/posts/:cuid').delete(auth, PostController.deletePost);

module.exports = router;
