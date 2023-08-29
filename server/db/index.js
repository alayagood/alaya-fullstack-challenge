const mongoose = require('mongoose');
const config = require('../config');

const { mongo_connection_url } = config;

console.log(mongo_connection_url);

const connectDB = () => mongoose.connect(mongo_connection_url, {
    useNewUrlParser: true,
    useUnifiedTopology:true
});


module.exports = { connectDB };

