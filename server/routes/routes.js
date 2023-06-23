const express = require('express');
const router = express.Router();
const PostController = require('../controllers/post.controller');
const LoginController = require('../controllers/login.controller');
const SignupController = require('../controllers/signup.controller');

// Get all Posts
router.route('/posts').get(PostController.getPosts);

// Get one post by cuid
router.route('/posts/:cuid').get(PostController.getPost);

// Add a new Post
router.route('/posts').post(PostController.addPost);

// Delete a post by cuid
router.route('/posts/:cuid').delete(PostController.deletePost);

// Login
router.route('/login').post(LoginController.login);

// Signup
router.route('/signup').post(SignupController.signup);

module.exports = router;
