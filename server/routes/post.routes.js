const express = require('express');
const router = express.Router();
const PostController = require('../controllers/post.controller');
const { validatePostFields } = require('../validators/postValidator');
const jwtMiddleware = require('../middlewares/jwtMiddleware');
const UserController = require('../controllers/user.controller');
const { validateUserFields } = require('../validators/userValidator');

// Route for getting all posts
router.get('/posts', jwtMiddleware, PostController.getPosts);

// Route for getting a single post by cuid
router.get('/posts/:cuid', jwtMiddleware, PostController.getPost);

// Route for adding a new post
router.post('/posts', jwtMiddleware, validatePostFields, PostController.addPost);

// Route for deleting a post by cuid
router.delete('/posts/:cuid', jwtMiddleware, PostController.deletePost);

// Route for user registration
router.post('/register', validateUserFields, UserController.register);

// Route for user login
router.post('/login', UserController.login);

module.exports = router;