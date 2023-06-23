const mongoose = require('mongoose');
const User = require('../models/user');
const fetch = require('isomorphic-fetch')
const jwt = require('jsonwebtoken');
const fs = require('fs');

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

test('it returns a JWT on successful login', async () => {
  const user = {
    username: "username",
    password: "password"
  }
  const userSchema = new User(user)
  await userSchema.save()

  const response = await fetch(`${SERVER}/api/login`, {
    headers: { 'content-type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(user)
  })

  const jsonResponse = await response.json()
  const decodedToken = jwt.verify(jsonResponse.jwt, fs.readFileSync('JWT_SECRET'))

  expect(decodedToken.username).toStrictEqual(user.username)
});

test('it returns a 500 on failed login', async () => {
  const user = {
    username: "username",
    password: "incorrectPassword"
  }

  const response = await fetch(`${SERVER}/api/login`, {
    headers: { 'content-type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(user)
  })

  expect(response.status).toStrictEqual(500)
});