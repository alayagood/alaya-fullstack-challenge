const mongoose = require('mongoose');

mongoose
  .connect('mongodb://root:example@localhost:27017', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    createIndex: true,
  })
  .catch((e) => {
    console.error('Connection error', e.message);
  });

const db = mongoose.connection;

module.exports = db;
