const express = require('express');

const PostController = require('../controllers/post.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

// Get all Posts
router.route('/posts').get(PostController.getPosts);

// Get one post by cuid
router.route('/posts/:cuid').get(PostController.getPost);

// Add a new Post
router.post('/posts', authMiddleware, PostController.addPost);

// Delete a post by cuid
router.delete('/posts/:cuid', authMiddleware, PostController.deletePost);

module.exports = router;
