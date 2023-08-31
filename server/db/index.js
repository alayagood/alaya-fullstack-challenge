const mongoose = require('mongoose');
const config = require('../config');

const { mongo_connection_url } = config;

const connectDB = () => mongoose.connect(mongo_connection_url, {
    useNewUrlParser: true,
    useUnifiedTopology:true,
    useFindAndModify: false
});


module.exports = { connectDB };

