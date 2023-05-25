const express = require('express');
const router = express.Router();
const PostController = require('../controllers/post.controller');
const { validatePostFields } = require('../validators/post.validator');

const jwtMiddleware = require('../middlewares/jwtMiddleware');

// Post Routes
router.get('/posts', PostController.getPosts);
router.get('/posts/:cuid', jwtMiddleware, PostController.getPost);
router.post('/posts', jwtMiddleware, validatePostFields, PostController.addPost);
router.delete('/posts/:cuid', jwtMiddleware, PostController.deletePost);

module.exports = router;
