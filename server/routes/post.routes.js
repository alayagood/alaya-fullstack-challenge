const express = require('express');
const router = express.Router();
const PostController = require('../controllers/post.controller');
const { validationResult } = require('express-validator');
const jwtMiddleware = require('../middlewares/jwt.middleware');
const { validatePostFields } = require('../validators/post.validator');

// Create an instance of PostController
const postController = new PostController();

// Get all posts
router.get('/posts', postController.getPosts);

// Get a specific post
router.get('/posts/:cuid', postController.getPost);

// Create a new post
router.post('/posts', jwtMiddleware, validatePostFields, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}, postController.addPost);

// Delete a post
router.delete('/posts/:cuid', jwtMiddleware, postController.deletePost);

module.exports = router;
