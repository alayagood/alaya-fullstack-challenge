const { validationResult } = require('express-validator');
const PostService = require('../services/post.service');
const PostRepository = require('../repositories/post.repository');


class PostController {
  constructor() {
    this.postService = new PostService();
    this.postRepository = new PostRepository();

  }

  /**
   * Get all posts
   * @param req - the request object
   * @param res - the response object
   * @returns void
   */
  getPosts = async (req, res) => {
    try {
      const posts = await this.postRepository.findAll();
      res.json({ posts });
    } catch (err) {
      this.handleDBError(err, res);
    }
  }

  /**
   * Save a post
   * @param req - the request object
   * @param res - the response object
   * @returns void
   */
  addPost = async (req, res) => {
    try {
      const { name, title, content, image } = req.body.post;
      console.log(req.body.post)
      console.log(req.user)

      const newPost = {
        name,
        title,
        content,
        image,
        createdBy: req.user._id,
      };

      const savedPost = await this.postService.addPost(newPost);
      res.json({ post: savedPost });
    } catch (err) {
      this.handleDBError(err, res);
    }
  }

  /**
   * Get a single post
   * @param req - the request object
   * @param res - the response object
   * @returns void
   */
  getPost = async (req, res) => {
    try {
      const post = await this.postRepository.findByCuid(req.params.cuid);
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
      res.json({ post });
    } catch (err) {
      this.handleDBError(err, res);
    }
  }

  /**
   * Delete a post
   * @param req - the request object
   * @param res - the response object
   * @returns void
   */
  deletePost = async (req, res) => {
    try {
      const post = await this.postRepository.findByCuid(req.params.cuid);
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
      if (post.createdBy !== req.user._id) {
        return res.status(403).json({ error: 'Unauthorized' });
      }
      await this.postRepository.deletePost(post);
      res.status(200).end();
    } catch (err) {
      this.handleDBError(err, res);
    }
  }

  /**
   * Handler for database errors
   * @param err - the error object
   * @param res - the response object
   * @returns void
   */
  handleDBError = (err, res) => {
    console.error(err);
    res.status(500).send(err);
  }
}

module.exports = PostController;
