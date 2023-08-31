const express = require('express');
const postsRouter = express.Router();
const PostController = require('../../controllers/post.controller');
const isAuthenticated = require('../../middlewares/authentication/auth.middleware');
const multer = require('multer');
const upload = require('../../middlewares/files/file.middleware');

// List all Posts
postsRouter.route('/').get(PostController.getPosts);

// List Posts by user
postsRouter.route('/:userid').get(isAuthenticated, PostController.getPostsByUser);

// Get one post by cuid
postsRouter.route('/post/:cuid').get(PostController.getPost);

// Add a new Post
postsRouter.route('/add').post(isAuthenticated, [upload.upload.array('images'), upload.uploadToCloudinary], PostController.addPost);

// Delete a post by cuid
postsRouter.route('/post/:cuid').delete(isAuthenticated, PostController.deletePost);

module.exports = postsRouter;
