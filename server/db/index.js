const mongoose = require('mongoose');

mongoose
    .connect('mongodb://127.0.0.1:2717/mymongo', { useNewUrlParser: true, useUnifiedTopology: true })
    .catch(e => {
        console.error('Connection error', e.message)
    });

const db = mongoose.connection;

module.exports = db;
