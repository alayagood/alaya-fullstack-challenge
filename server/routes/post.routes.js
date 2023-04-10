const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");

const PostController = require('../controllers/post.controller');


// Setting an authorization middleware
router.use('/posts', auth);

// Get all Posts
router.route('/posts').get(PostController.getPosts, auth);

// Get one post by cuid
router.route('/posts/:cuid').get(PostController.getPost);

// Add a new Post
router.route('/posts').post(PostController.addPost);

// Delete a post by cuid
router.route('/posts/:cuid').delete(PostController.deletePost);

module.exports = router;
