const mongoose = require('mongoose');
const MongoServer = require( 'mongodb-memory-server');

const mongod = MongoServer.MongoMemoryServer.create();

const connect = async () => {
  const instance = await mongod;
  const uri = await (instance.getUri());
  await mongoose.connect(uri);
}
const closeDatabase = async () => {
  await mongoose.connection.close();
  const instance = await mongod;
  await (instance.stop());
}
const clearDatabase = async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
}

module.exports = {
  connect,
  closeDatabase,
  clearDatabase
}