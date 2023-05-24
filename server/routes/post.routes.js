const express = require('express');
const router = express.Router();
const PostController = require('../controllers/post.controller');
const { validatePostFields } = require('../validators/postValidator');

// Route for getting all posts
router.get('/posts', PostController.getPosts);

// Route for getting a single post by cuid
router.get('/posts/:cuid', PostController.getPost);

// Route for adding a new post
router.post('/posts', validatePostFields, PostController.addPost);

// Route for deleting a post by cuid
router.delete('/posts/:cuid', PostController.deletePost);

module.exports = router;