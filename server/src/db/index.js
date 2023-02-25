const mongoose = require('mongoose');

require('dotenv').config();

mongoose.set('strictQuery', true);

mongoose
    .connect(process.env.MONGO_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
    .catch(e => {
        console.error('Connection error', e.message)
    });

const db = mongoose.connection;

module.exports = db;
