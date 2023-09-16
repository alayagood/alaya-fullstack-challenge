import request from 'supertest';
import Post from '../../models/post';

import '../../db';
import { waitForServerToStart } from './helpers';
import bcrypt from 'bcryptjs';
import User from '../../models/user';
const PORT =  process.env.PORT
const baseURL = `http://localhost:${PORT}/api`;


describe('Post Routes', () => {
  beforeAll(async () => {
    await waitForServerToStart(baseURL, 30000);
  })
  beforeEach(async () => {
    await Post.deleteMany({});
    await User.deleteMany({});
  });

  it('should fetch all posts', async () => {
    const newPost = new Post({ title: 'test', name: 'test', content: 'test', cuid: '1', slug: 'test', user_id: '1' });
    await newPost.save();
    const response = await request(baseURL).get('/posts');
    expect(response.statusCode).toBe(200);
    expect(response.body.posts.length).toBe(1);
    expect(response.body.posts[0].title).toBe('test');
  });


  it('should not allow UNAUTHORIZED users to add post', async () => {
    const post = {
      title: 'Test',
      content: 'This is a test post.',
      name: 'miguel',
    };

    const response = await request(baseURL).post('/posts').send({ post })
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe('Unauthorized');
  });
  it('Should allow AUTHORIZED users to add post', async () => {
    const post = {
      title: 'Test',
      content: 'This is a test post.',
      name: 'miguel',
    };
    const user = new User({ email: 'testpost@example.com', password: bcrypt.hashSync('correctPassword', 10) });
    await user.save();
    const loginResponse = await request(baseURL).post('/user/login').send({ email: 'testpost@example.com', password: 'correctPassword' });
    const { accessToken } = loginResponse.body
    const response = await request(baseURL).post('/posts').send({ post }).set('Authorization', `Bearer ${accessToken}`)
    expect(response.statusCode).toBe(201);

  });

  it('should fetch a single post', async () => {
    const newPost = new Post({ title: 'Single Post', name: 'test', content: 'test', cuid: '2', slug: 'test', user_id: '1' });

    await newPost.save();
    const response = await request(baseURL).get(`/posts/2`);
    expect(response.statusCode).toBe(200);
    expect(response.body.post.title).toBe('Single Post');

  });
  it('Return 404 when post not found', async () => {
    const response = await request(baseURL).get(`/posts/223`);
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe('Post Not Found');

  });

  it('should not allow UNAUTHORIZED USERS to delete a post', async () => {
    const newPost = new Post({ title: 'test', name: 'UNAUTHORIZED', content: 'test', cuid: '3', slug: 'test', user_id: '1' });
    await newPost.save();
    const response = await request(baseURL).delete(`/posts/${newPost.cuid}`);
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe("Unauthorized");

    const postInDb = await Post.findOne({ name: newPost.name }).exec();
    expect(postInDb).not.toBeNull();

  });
  it('should not allow Wrong User to delete a post', async () => {
    const newPost = new Post({ title: 'test', name: 'Wrong User', content: 'test', cuid: '3', slug: 'test', user_id: '1' });
    await newPost.save();
    const user = new User({ email: 'testpost2@example.com', password: bcrypt.hashSync('correctPassword', 10) });
    await user.save();
    const loginResponse = await request(baseURL).post('/user/login').send({ email: 'testpost2@example.com', password: 'correctPassword' });
    const { accessToken } = loginResponse.body;
    const response = await request(baseURL).delete(`/posts/${newPost.cuid}`).set('Authorization', `Bearer ${accessToken}`);
    expect(response.statusCode).toBe(403);
    const postInDb = await Post.findOne({ name: newPost.name }).exec();
    expect(postInDb).not.toBeNull();

  });
  it('should allow Post Owner to delete a post', async () => {
    const user = new User({ email: 'test2@example.com', password: bcrypt.hashSync('correctPassword', 10) });
    await user.save();
    const newPost = new Post({ title: 'test', name: 'test', content: 'test', cuid: '3', slug: 'test', user_id: user.id });
    await newPost.save();
    const loginResponse = await request(baseURL).post('/user/login').send({ email: user.email, password: 'correctPassword' });
    const { accessToken } = loginResponse.body;
    const response = await request(baseURL).delete(`/posts/${newPost.cuid}`).set('Authorization', `Bearer ${accessToken}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("1 Post deleted");

    const postInDb = await Post.findOne({ name: newPost.name }).exec();
    expect(postInDb).toBeNull();

  });
  it('Return 404 when trying to delete an unexisting post', async () => {
    const user = new User({ email: 'test3@example.com', password: bcrypt.hashSync('correctPassword', 10) });
    await user.save();
    const loginResponse = await request(baseURL).post('/user/login').send({ email: user.email, password: 'correctPassword' });
    const { accessToken } = loginResponse.body;
    const response = await request(baseURL).delete(`/posts/3434`).set('Authorization', `Bearer ${accessToken}`);
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe('Post Not Found');

  });
});
