const express = require('express');
const router = express.Router();
const PostController = require('../controllers/post.controller');
const Post = require('../models/post');
const { authenticate } = require('../middlewares/authenticate');
const { getResourceAuthorizer } = require('../middlewares/authorize');
const registerRouter = require('./register_router');
const { getBodyValidator } = require('../middlewares/bodyValidator');
const postSchema = require('../schemas/post');

// Get all Posts
router.route('/').get(registerRouter(PostController.getPosts));

// Get one post by cuid
router.route('/:cuid').get(registerRouter(PostController.getPost));

// Add a new Post
router.route('/').post(authenticate, getBodyValidator(postSchema), registerRouter(PostController.addPost));

// Delete a post by cuid
router
  .route('/:cuid')
  .delete(
    authenticate,
    getResourceAuthorizer(Post),
    registerRouter(PostController.deletePost)
  );

module.exports = router;
