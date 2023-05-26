const { validationResult } = require('express-validator');
const PostRepository = require('../repositories/post.repository');
const Post = require('../models/post');
const cuid = require('cuid');
const slug = require('limax');
const sanitizeHtml = require('sanitize-html');
const PostImageService = require('../services/post-image.service');

class PostController {
  constructor() {
    this.postRepository = new PostRepository();
    this.postImageService = new PostImageService();
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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const { name, title, content, image } = req.body.post;
  
    const newPost = new Post(req.body.post);
  
    // Let's sanitize inputs
    newPost.title = sanitizeHtml(title);
    newPost.name = sanitizeHtml(name);
    newPost.content = sanitizeHtml(content);
  
    newPost.slug = slug(title.toLowerCase(), { lowercase: true });
    newPost.cuid = cuid();
  
    try {
      // Set the createdBy value to the logged-in user
      newPost.createdBy = req.user;
  
      // Check if an image was passed
      if (image) {
        // Save the image using the PostImageService
        const imageUrl = await this.postImageService.saveImage(image, 'provider');
        newPost.images.push({ url: imageUrl });
      }
  
      const saved = await this.postRepository.savePost(newPost);
      res.json({ post: saved });
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
      const post = await this.postRepository.getPostByCuid(req.params.cuid);
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
      const post = await this.postRepository.getPostByCuid(req.params.cuid);
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

module.exports = new PostController();
