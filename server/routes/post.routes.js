const express = require('express');
const router = express.Router();
const PostController = require('../controllers/post.controller');
const authMiddleware = require('../middlewares/auth');
const postOwnership = require('../middlewares/validate.post.ownership');

// Get all Posts
router.route('/posts').get(PostController.getPosts);

// Get one post by cuid
router.route('/posts/:cuid').get(PostController.getPost);

// Add a new Post
router.route('/posts').post(authMiddleware.authenticateToken, PostController.addPost);

// Delete a post by cuid
router.route('/posts/:cuid').delete(authMiddleware.authenticateToken, postOwnership.validate, PostController.deletePost);

module.exports = router;
