const Post = require('../models/post');

class PostRepository {
  /**
   * Fetch all posts from the database
   * @returns {Promise<Array>} - Array of posts
   * @throws {Error} - If failed to fetch posts from the database
   */
  async findAll() {
    try {
      return await Post.find().sort('-dateAdded').exec();
    } catch (error) {
      throw new Error('Failed to fetch posts from the database');
    }
  }

  /**
   * Fetch a post by its cuid from the database
   * @param {string} cuid - The cuid of the post
   * @returns {Promise<Object|null>} - The found post or null if not found
   * @throws {Error} - If failed to fetch the post from the database
   */
  async findByCuid(cuid) {
    try {
      return await Post.findOne({cuid}).exec();
    } catch (error) {
      throw new Error('Failed to fetch the post from the database');
    }
  }

  /**
   * Save a new post to the database
   * @param {Object} postData - The data of the post to be saved
   * @returns {Promise<Object>} - The newly saved post
   * @throws {Error} - If failed to save the post to the database
   */
  async save(postData) {
    try {
      const newPost = new Post(postData);
      return await newPost.save();
    } catch (error) {
      throw new Error('Failed to save the post to the database');
    }
  }

  /**
   * Delete a post by its cuid from the database
   * @param {string} cuid - The cuid of the post to be deleted
   * @returns {Promise<Object|null>} - The deleted post or null if not found
   * @throws {Error} - If failed to delete the post from the database
   */
  async deleteByCuid(cuid) {
    try {
      return await Post.findOneAndDelete({cuid}).exec();
    } catch (error) {
      throw new Error('Failed to delete the post from the database');
    }
  }

  /**
   * Find a post by its title
   * @param {string} title - The title of the post
   * @returns {Promise<Object|null>} - The found post or null if not found
   * @throws {Error} - If failed to find post by title
   */
  async findByTitle(title) {
    try {
      return await Post.findOne({title}).exec();
    } catch (error) {
      throw new Error('Failed to find post by title');
    }
  }

  /**
   * Update a post by its ID
   * @param {string} postId - The ID of the post to be updated
   * @param {Object} data - The data to update the post
   * @returns {Promise<Object|null>} - The updated post or null if not found
   * @throws {Error} - If failed to update post
   */
  async updatePost(postId, data) {
    try {
      return await Post.findByIdAndUpdate(postId, data, {new: true}).exec();
    } catch (error) {
      throw new Error('Failed to update post');
    }
  }

  /**
   * Delete a post by its ID
   * @param {string} postId - The ID of the post to be deleted
   * @throws {Error} - If failed to delete post
   */
  async delete(postId) {
    try {
      return await Post.findByIdAndDelete(postId).exec();
    } catch (error) {
      throw new Error('Failed to delete post');
    }
  }

  /**
   * Find posts by user ID
   * @param {string} userId - The ID of the user
   * @returns {Promise<Array>} - Array of posts by the user
   */
  async findByUser(userId) {
    return Post.find({ createdBy: userId });
  }
}

module.exports = PostRepository;