import express from 'express';

import * as PostController from './post.controller';
import authenticate from '../../middlewares/authenticate';

const router = express.Router();

// Get all Posts
router.route('/posts').get(PostController.getPosts);

// Get one post by cuid
router.route('/posts/:cuid').get(PostController.getPost);

// Add a new Post
router.route('/posts').post(authenticate(), PostController.addPost);

// Delete a post by cuid
router.route('/posts/:cuid').delete(authenticate(), PostController.deletePost);

export default router;
