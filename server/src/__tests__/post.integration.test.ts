import request from 'supertest';
import Post from '../models/post';
import '../db';

const baseURL = 'http://localhost:5000/api';

describe('Post Routes', () => {
  beforeEach(async () => {
    await Post.deleteMany({});
  });

  it('should fetch all posts', async () => {
    const newPost = new Post({ title: 'test', name: 'test', content: 'test', cuid: '1', slug: 'test' });
    await newPost.save();
    const response = await request(baseURL).get('/posts');
    expect(response.statusCode).toBe(200);
    expect(response.body.posts.length).toBe(1);
    expect(response.body.posts[0].title).toBe('test');

  });

  it('should fetch a single post', async () => {
    const newPost = new Post({ title: 'Single Post', name: 'test', content: 'test', cuid: '2', slug: 'test' });
    try {
      await newPost.save();
      const response = await request(baseURL).get(`/posts/2`);
      expect(response.statusCode).toBe(200);
      expect(response.body.post.title).toBe('Single Post');
    } catch (error: any) {
      throw new Error(error);


    }
  });

  it('should add a new post', async () => {
    const post = {
      title: 'Test',
      content: 'This is a test post.',
      name: 'miguel',
    };

    const response = await request(baseURL).post('/posts').send({ post });
    expect(response.statusCode).toBe(200);

    const postInDb = await Post.findOne({ name: post.name }).exec();
    expect(postInDb).toBeTruthy();
    expect(postInDb!.title).toBe('Test');
  });

  it('should delete a post', async () => {
    const newPost = new Post({ title: 'test', name: 'test', content: 'test', cuid: '3', slug: 'test' });

    try {
      await newPost.save();
      const response = await request(baseURL).delete(`/posts/${newPost.cuid}`);
      expect(response.statusCode).toBe(200);

      const postInDb = await Post.findOne({ name: newPost.name }).exec();
      expect(postInDb).toBeNull();
    } catch (error: any) {
      console.log(error);

    }
  });
});
