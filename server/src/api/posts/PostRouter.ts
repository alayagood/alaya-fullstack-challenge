import { Router } from 'express';

import PostController from './PostController';
import authenticate from '../../middlewares/authenticate';
import multerCloudinary from '../../middlewares/multerCloudinary';
import { BaseRouter } from '../BaseRouter';
import DIContainer from '../../di/diContainer';
import DI_TYPES from '../../di/DITypes';
import IPostService from './interfaces/IPostService';


export default class PostRouter extends BaseRouter {
  constructor() {
    // Create path from _dirname (posts)
    super(__dirname)
  }
  createRouter(): Router {
    const router = Router();
    const postController = new PostController(
      DIContainer.get<IPostService>(DI_TYPES.PostService),
    );
    // Get all Posts
    router.route('/').get(postController.getPosts);

    // Get one post by cuid
    router.route('/:cuid').get(postController.getPost);

    // Add a new Post
    router.route('/').post(authenticate(), multerCloudinary.single('image'), postController.addPost);

    // Delete a post by cuid
    router.route('/:cuid').delete(authenticate(), postController.deletePost);
    return router
  }
}