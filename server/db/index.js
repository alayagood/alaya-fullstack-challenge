const mongoose = require('mongoose');

require('dotenv').config();

mongoose.set('strictQuery', true);

mongoose
    .connect('mongodb://127.0.0.1:27017/mern-stack', { useNewUrlParser: true, useUnifiedTopology: true })
    .catch(e => {
        console.error('Connection error', e.message)
    });

const db = mongoose.connection;

module.exports = db;
