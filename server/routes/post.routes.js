const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("../middleware/multer");
const PostController = require('../controllers/post.controller');


// Get all Posts
router.route('/posts').get(auth, PostController.getPosts);

// Get one post by cuid
router.route('/posts/:cuid').get(auth, PostController.getPost);

// Add a new Post
router.route('/posts').post(auth, multer.upload.single("my_file") , PostController.addPost);

// Delete a post by cuid
router.route('/posts/:cuid').delete(auth, PostController.deletePost);

module.exports = router;
