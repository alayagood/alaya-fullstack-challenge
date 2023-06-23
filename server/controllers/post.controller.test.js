const mongoose = require('mongoose');
const Post = require('../models/post');
const fetch = require('isomorphic-fetch')
const User = require('../models/user');

beforeAll(async () => {
  await mongoose.connect('mongodb://127.0.0.1:27017/mern-stack', { useNewUrlParser: true, useUnifiedTopology: true })
  await clearDB()
})

clearDB = async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany();
  }
}

afterAll(async () => {
  await clearDB()
  mongoose.connection.close()
})

afterEach(async () => {
  await clearDB()
})

const SERVER = 'http://localhost:3000'

test('it retrieves the existing posts', async () => {
  const post1 = {
    name: "name1",
    title: "title1",
    content: "content1",
    slug: "slug1",
    cuid: "cuid1",
    dateAdded: Date.now()
  }
  const post2 = {
    name: "name2",
    title: "title2",
    content: "content2",
    slug: "slug2",
    cuid: "cuid2",
    dateAdded: Date.now()
  }
  const postSchema1 = new Post(post1)
  const postSchema2 = new Post(post2)
  await postSchema1.save()
  await postSchema2.save()

  const response = await fetch(`${SERVER}/api/posts`, {
    headers: { 'content-type': 'application/json' },
    method: 'GET'
  })

  const jsonResponse = await response.json()

  // @todo order of posts is not guaranteed, review this test
  expect(jsonResponse.posts.length).toStrictEqual(2)
  expect(jsonResponse.posts[0].name).toStrictEqual(post1.name)
  expect(jsonResponse.posts[0].title).toStrictEqual(post1.title)
  expect(jsonResponse.posts[0].content).toStrictEqual(post1.content)
  expect(jsonResponse.posts[0].slug).toStrictEqual(post1.slug)
  expect(jsonResponse.posts[0].cuid).toStrictEqual(post1.cuid)

  expect(jsonResponse.posts[1].name).toStrictEqual(post2.name)
  expect(jsonResponse.posts[1].title).toStrictEqual(post2.title)
  expect(jsonResponse.posts[1].content).toStrictEqual(post2.content)
  expect(jsonResponse.posts[1].slug).toStrictEqual(post2.slug)
  expect(jsonResponse.posts[1].cuid).toStrictEqual(post2.cuid)
});

test('it adds a post when logged in', async () => {
  const user = {
    username: "username",
    password: "password"
  }
  const userSchema = new User(user)
  await userSchema.save()
  const loginResponse = await fetch(`${SERVER}/api/login`, {
    headers: { 'content-type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(user)
  })
  const jsonResponse = await loginResponse.json()

  const post = {
    name: "name",
    title: "title",
    content: "content",
  }
  const response = await fetch(`${SERVER}/api/posts`, {
    headers: { 'content-type': 'application/json', 'authorization': 'Bearer ' + jsonResponse.jwt },
    method: 'POST',
    body: JSON.stringify({ post })
  })

  const foundPost = await Post.findOne({ name: post.name })

  expect(foundPost.name).toStrictEqual(post.name)
  expect(foundPost.title).toStrictEqual(post.title)
  expect(foundPost.content).toStrictEqual(post.content)
  // slug is the title in lowercase separated by dashes instead of spaces
  const slug = post.title
  expect(foundPost.slug).toStrictEqual(slug)
});

test('it fails to add a post when not logged in', async () => {
  const post = {
    name: "name",
    title: "title",
    content: "content",
  }
  const response = await fetch(`${SERVER}/api/posts`, {
    headers: { 'content-type': 'application/json' },
    method: 'POST',
    body: JSON.stringify({ post })
  })

  expect(response.status).toStrictEqual(401)
});

test('it fails to add a post when JWT invalid', async () => {
  const post = {
    name: "name",
    title: "title",
    content: "content",
  }
  const response = await fetch(`${SERVER}/api/posts`, {
    headers: { 'content-type': 'application/json', 'authorization': 'Bearer invalidToken' },
    method: 'POST',
    body: JSON.stringify({ post })
  })

  expect(response.status).toStrictEqual(401)
});

test('it retrieves a post', async () => {
  const post = {
    name: "name",
    title: "title",
    content: "content",
    slug: "slug",
    cuid: "cuid",
    dateAdded: Date.now()
  };
  const postSchema = new Post(post)
  await postSchema.save()

  const response = await fetch(`${SERVER}/api/posts/${post.cuid}`, {
    headers: { 'content-type': 'application/json' },
    method: 'GET'
  })

  const jsonResponse = await response.json()

  expect(jsonResponse.post.name).toStrictEqual(post.name)
  expect(jsonResponse.post.title).toStrictEqual(post.title)
  expect(jsonResponse.post.content).toStrictEqual(post.content)
  expect(jsonResponse.post.slug).toStrictEqual(post.slug)
  expect(jsonResponse.post.cuid).toStrictEqual(post.cuid)
});

test('it deletes a post', async () => {
  const post = {
    name: "name",
    title: "title",
    content: "content",
    slug: "slug",
    cuid: "cuid",
    dateAdded: Date.now()
  };
  const postSchema = new Post(post)
  await postSchema.save()

  await fetch(`${SERVER}/api/posts/${post.cuid}`, {
    headers: { 'content-type': 'application/json' },
    method: 'DELETE'
  })

  const response = await fetch(`${SERVER}/api/posts`, {
    headers: { 'content-type': 'application/json' },
    method: 'GET'
  })

  const jsonResponse = await response.json()

  expect(jsonResponse.posts.length).toStrictEqual(0)
});