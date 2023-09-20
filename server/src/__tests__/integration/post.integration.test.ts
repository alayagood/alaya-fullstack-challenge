import request from 'supertest';
import Post from '../../models/post';
import User from '../../models/user';

import '../../db';
import { createPost, createPostRequest, createPostWithUser, createUser, deletePostRequest, loginUser, waitForServerToStart } from './helpers';

const PORT = process.env.PORT;
const baseURL = `http://localhost:${PORT}/api`;


describe('Post Routes', () => {
  beforeAll(async () => {
    await waitForServerToStart(baseURL, 30000);
  });

  beforeEach(async () => {
    await Post.deleteMany({});
    await User.deleteMany({});
  });

  describe('Fetching Posts', () => {
    it('should fetch all posts', async () => {
      await createPost('test', 'test', 'test');
      const response = await request(baseURL).get('/posts');
      expect(response.statusCode).toBe(200);
      expect(response.body.posts.length).toBe(1);
      expect(response.body.posts[0].title).toBe('test');
    });

    it('should fetch a single post', async () => {
      const post = await createPost('Single Post', 'test', 'test');
      const response = await request(baseURL).get(`/posts/${post.cuid}`);
      expect(response.statusCode).toBe(200);
      expect(response.body.post.title).toBe('Single Post');
    });

    it('returns 404 when post not found', async () => {
      const response = await request(baseURL).get(`/posts/223`);
      expect(response.statusCode).toBe(404);
      expect(response.body.message).toBe('Post Not Found');
    });
  });

  describe('Adding Posts', () => {
    it('should not allow UNAUTHORIZED users to add post', async () => {
      const undefinedToken = undefined
      const response = await createPostRequest('Test', 'miguel', 'This is a test post.', undefinedToken);
      expect(response.statusCode).toBe(401);
      expect(response.body.message).toBe('Unauthorized');
    });

    it('Should allow AUTHORIZED users to add post', async () => {
      await createUser('testpost@example.com', 'correctPassword');
      const { accessToken } = await loginUser('testpost@example.com', 'correctPassword');
      const response = await createPostRequest('Test', 'miguel', 'This is a test post.', accessToken);
      expect(response.statusCode).toBe(201);
    });
  });

  describe('Deleting Posts', () => {
    it('should not allow UNAUTHORIZED USERS to delete a post', async () => {
      const undefinedToken = undefined

      const post = await createPost('test', 'UNAUTHORIZED', 'test');
      const response = await deletePostRequest(post.cuid, undefinedToken);
      expect(response.statusCode).toBe(401);
      expect(response.body.message).toBe("Unauthorized");

      const postInDb = await Post.findOne({ name: post.name }).exec();
      expect(postInDb).not.toBeNull();
    });

    it('should not allow Wrong User to delete a post', async () => {
      const post = await createPost('test', 'Wrong User', 'test');
      await createUser('testpost2@example.com', 'correctPassword');
      const { accessToken } = await loginUser('testpost2@example.com', 'correctPassword');
      const response = await deletePostRequest(post.cuid, accessToken);
      expect(response.statusCode).toBe(403);

      const postInDb = await Post.findOne({ name: post.name }).exec();
      expect(postInDb).not.toBeNull();
    });

    it('should allow Post Owner to delete a post', async () => {
      const user = await createUser('test2@example.com', 'correctPassword');
      const post = await createPostWithUser('test', 'test', 'test', user._id);
      const { accessToken } = await loginUser('test2@example.com', 'correctPassword');
      const response = await deletePostRequest(post.cuid, accessToken);
      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe("1 Post deleted");

      const postInDb = await Post.findOne({ name: post.name }).exec();
      expect(postInDb).toBeNull();
    });

    it('Return 404 when trying to delete an unexisting post', async () => {
      await createUser('test3@example.com', 'correctPassword');
      const { accessToken } = await loginUser('test3@example.com', 'correctPassword');
      const response = await deletePostRequest('3434', accessToken);
      expect(response.statusCode).toBe(404);
      expect(response.body.message).toBe('Post Not Found');
    });
  });
});
