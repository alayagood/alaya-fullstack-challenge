const request = require('supertest');

const Post = require('../models/post');
require('../db')
const baseURL = 'http://localhost:3000/api';

describe('Post Routes', () => {
  beforeEach((done) => {
    Post.deleteMany({}, done);
    done()
  });

  it('should fetch all posts', (done) => {
    const newPost = new Post({ title: 'test', name: 'test', content: 'test', cuid: '1', slug: 'test' });

    newPost.save(async (err, saved) => {
      if (err) done(err);
      const response = await request(baseURL).get('/posts');
      expect(response.statusCode).toBe(200);
      expect(response.body.posts.length).toBe(1);
      expect(response.body.posts[0].title).toBe('test');
      done();
    });
  });

  it('should fetch a single post', async () => {
    const newPost = new Post({ title: 'Single Post', name: 'test', content: 'test', cuid: '2', slug: 'test' });
    newPost.save(async (err, saved) => {
      if (err) done(err);

      const response = await request(baseURL).get(`/posts/2`);
      expect(response.statusCode).toBe(200);
      expect(response.body.title).toBe('Single Post');
      done();
    });

  });



  it('should add a new post', async () => {
    const post = {
      title: 'Test',
      content: 'This is a test post.',
      name: 'miguel',

    };
    const response = await request(baseURL).post('/posts').send({post});
    expect(response.statusCode).toBe(200);  

    Post.findOne({ name: post.name }).exec((err, postInDb) => {
      expect(postInDb).toBeTruthy();
      expect(postInDb.title).toBe('Test');
      done()
    });
  });

  it('should delete a post', async () => {
    const newPost = new Post({ title: 'test', name: 'test', content: 'test', cuid: '3', slug: 'test' });

    newPost.save(async (err, saved) => {
      if (err) done(err);
      const response = await request(baseURL).delete(`/posts/${post.cuid}`);
      expect(response.statusCode).toBe(200);  
      Post.findOne({ name: post.name }).exec((err, postInDb) => {
        expect(postInDb).toBeNull();
        done()
      });
    });
  });
});




