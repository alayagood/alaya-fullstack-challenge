const Post = require('../models/post');

class PostRepository {
  // Fetch all posts from the database
  async findAll() {
    try {
      const posts = await Post.find().sort('-dateAdded').exec();
      return posts;
    } catch (error) {
      throw new Error('Failed to fetch posts from the database');
    }
  }

  // Fetch a post by its cuid from the database
  async findById(cuid) {
    try {
      const post = await Post.findOne({ cuid }).exec();
      return post;
    } catch (error) {
      throw new Error('Failed to fetch the post from the database');
    }
  }

  // Save a new post to the database
  async save(postData) {
    try {
      const newPost = new Post(postData);
      const savedPost = await newPost.save();
      return savedPost;
    } catch (error) {
      throw new Error('Failed to save the post to the database');
    }
  }

  // Delete a post by its cuid from the database
  async deleteById(cuid) {
    try {
      const deletedPost = await Post.findOneAndDelete({ cuid }).exec();
      return deletedPost;
    } catch (error) {
      throw new Error('Failed to delete the post from the database');
    }
  }

  // Find a post by its title
  async findByTitle(title) {
    try {
      const post = await Post.findOne({ title }).exec();
      return post;
    } catch (error) {
      throw new Error('Failed to find post by title');
    }
  }

  // Update a post by its ID
  async updatePost(postId, data) {
    try {
      const updatedPost = await Post.findByIdAndUpdate(postId, data, { new: true }).exec();
      return updatedPost;
    } catch (error) {
      throw new Error('Failed to update post');
    }
  }

  // Delete a post by its ID
  async deletePost(postId) {
    try {
      await Post.findByIdAndDelete(postId).exec();
    } catch (error) {
      throw new Error('Failed to delete post');
    }
  }
}

module.exports = PostRepository;
