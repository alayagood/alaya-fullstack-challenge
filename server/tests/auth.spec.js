const app = require('../index');
const db = require('./db');
const supertest = require('supertest')
const request = supertest(app)

describe('Auth', () => {
  beforeAll(async () => {
    await db.connect()
  });
  afterAll(async () => {
    await db.closeDatabase()
  });

  test('It should create a user', async () => {
    const res = await request.post('/api/auth/signup')
      .set('Content-type', 'application/json')
      .send({name: 'name', email: 'email', password:'password'})


    const body = res.body;
    const message = body.message;
    expect(res.statusCode).toBe(201);
    expect(message).toBe('success');
  });

  test('It should not create a user', async () => {
    const res = await request.post('/api/auth/signup')
      .set('Content-type', 'application/json')
      .send({name: 'name',  password:'password'})


    const body = res.body;
    expect(res.statusCode).toBe(400);
  });

  test('It should not create when user exists', async () => {
    const res = await request.post('/api/auth/signup')
      .set('Content-type', 'application/json')
      .send({name: 'name', email: 'email', password:'password'})

    expect(res.statusCode).toBe(409);
  });

  test('It should login a user', async () => {
    const res = await request.post('/api/auth/login')
      .set('Content-type', 'application/json')
      .send({email: 'email',  password:'password'})

    expect(res.statusCode).toBe(200);
  });

  test('It should not let create a post', async () => {
    const res = await request.post('/api/posts')
      .set('Content-type', 'application/json')
      .send({})

    expect(res.statusCode).toBe(401);
  });

  test('It should let create a post', async () => {
    const login = await request.post('/api/auth/login')
      .set('Content-type', 'application/json')
      .send({email: 'email',  password:'password'})


    const res = await request.post('/api/posts')
      .set('Content-type', 'application/json')
      .set('Cookie', login.headers['set-cookie'])
      .send({})

    expect(res.statusCode).toBe(400);
  });
})