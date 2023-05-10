const express = require('express');
const router = express.Router();
const PostController = require('../controllers/post.controller');
const isAuthorized = require('../middlewares/isAuthorized');

// Get all Posts
router.route('/').get(PostController.getPosts);

// Get one post by cuid
router.route('/:cuid').get(PostController.getPost);

// Add a new Post
router.route('/').post(isAuthorized, PostController.addPost);

// Delete a post by cuid
router.route('/:cuid').delete(isAuthorized, PostController.deletePost);

module.exports = router;
