const BaseRepository = require('./base.repository');
const Post = require('../models/post');

/**
 * Repository class for interacting with the Post model in the database.
 * @class
 * @extends BaseRepository<Post>
 * @throws {Error} If an invalid model is provided.
 */
class PostRepository extends BaseRepository {
  constructor() {
    super(Post);
  }

  /**
   * Fetch a post by its cuid from the database.
   *
   * @param {string} cuid - The cuid of the post
   * @returns {Promise<Object|null>} - The found post or null if not found
   * @throws {Error} - If failed to fetch the post from the database
   */
  async findByCuid(cuid) {
    try {
      return await this.model.findOne({ cuid }).exec();
    } catch (error) {
      throw new Error('Failed to fetch the post from the database');
    }
  }

  /**
   * Delete a post by its cuid from the database.
   *
   * @param {string} cuid - The cuid of the post to be deleted
   * @returns {Promise<Object|null>} - The deleted post or null if not found
   * @throws {Error} - If failed to delete the post from the database
   */
  async deleteByCuid(cuid) {
    try {
      return await this.model.findOneAndDelete({ cuid }).exec();
    } catch (error) {
      throw new Error('Failed to delete the post from the database');
    }
  }

  /**
   * Find a post by its title.
   *
   * @param {string} title - The title of the post
   * @returns {Promise<Object|null>} - The found post or null if not found
   * @throws {Error} - If failed to find post by title
   */
  async findByTitle(title) {
    try {
      return await this.model.findOne({ title }).exec();
    } catch (error) {
      throw new Error('Failed to find post by title');
    }
  }

  /**
   * Update a post by its ID.
   *
   * @param {string} postId - The ID of the post to be updated
   * @param {Object} data - The data to update the post
   * @returns {Promise<Object|null>} - The updated post or null if not found
   * @throws {Error} - If failed to update post
   */
  async updatePost(postId, data) {
    try {
      return await this.model.findByIdAndUpdate(postId, data, { new: true }).exec();
    } catch (error) {
      throw new Error('Failed to update post');
    }
  }

  /**
   * Find posts by user ID.
   *
   * @param {string} userId - The ID of the user
   * @returns {Promise<Array>} - Array of posts by the user
   */
  async findByUser(userId) {
    return this.model.find({ createdBy: userId });
  }
}

module.exports = PostRepository;
