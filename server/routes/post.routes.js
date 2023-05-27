const express = require('express');
const router = express.Router();
const PostController = require('../controllers/post.controller');
const { validationResult } = require('express-validator');
const jwtMiddleware = require('../middlewares/jwt.middleware');
const { validatePostFields } = require('../validators/post.validator');

// Create an instance of PostController
const postController = new PostController();

/**
 * Get all posts
 *
 * @route GET /api/posts
 * @returns {Array<Object>} - Array of posts
 */
router.get('/posts', postController.getPosts);

/**
 * Get a specific post
 *
 * @route GET /api/posts/:cuid
 * @param {string} cuid - The cuid of the post to fetch
 * @returns {Object} - The requested post
 */
router.get('/posts/:cuid', postController.getPost);

/**
 * Create a new post
 *
 * @route POST /api/posts
 * @middleware jwtMiddleware - JWT authentication middleware
 * @middleware validatePostFields - Express validator middleware to validate post fields
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function
 * @returns {Object} - The newly created post
 */
router.post(
    '/posts',
    jwtMiddleware,
    validatePostFields,
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    postController.addPost
);

/**
 * Delete a post
 *
 * @route DELETE /api/posts/:cuid
 * @middleware jwtMiddleware - JWT authentication middleware
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {void}
 */
router.delete('/posts/:cuid', jwtMiddleware, postController.deletePost);

module.exports = router;
