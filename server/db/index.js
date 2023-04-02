const mongoose = require('mongoose');

if (process.env.NODE_ENV !== 'test') {
  mongoose
    .connect('mongodb://127.0.0.1:27017/mern-stack', {useNewUrlParser: true, useUnifiedTopology: true})
    .catch(e => {
      console.error('Connection error', e.message)
    });
}

  const db = mongoose.connection;

  module.exports = db;
