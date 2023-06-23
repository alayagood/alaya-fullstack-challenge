const mongoose = require('mongoose');
const User = require('../models/user');
const fetch = require('isomorphic-fetch')

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

test('it creates a user on successful signup', async () => {
  const user = {
    username: "username",
    password: "password"
  }

  await fetch(`${SERVER}/api/signup`, {
    headers: { 'content-type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(user)
  })

  const userInDatabase = await User.findOne()

  expect(userInDatabase.username).toStrictEqual(user.username)
  expect(userInDatabase.password).toStrictEqual(user.password)
});

test('it does not allow creating a user with an already existing username', async () => {
  const user = {
    username: "username",
    password: "password"
  }
  const userSchema = new User(user)
  await userSchema.save()

  const response = await fetch(`${SERVER}/api/signup`, {
    headers: { 'content-type': 'application/json' },
    method: 'POST',
    body: JSON.stringify({
      username: user.username,
      password: "someOtherPassword"
    })
  })

  expect(response.status).toStrictEqual(500)
});