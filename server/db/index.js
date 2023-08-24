const mongoose = require('mongoose');
const mongoConnectString = process.env.MONGO_CONNECT_STRING

mongoose
    .connect(mongoConnectString, { useNewUrlParser: true, useUnifiedTopology: true })
    .catch(e => {
        console.error('Connection error', e.message)
    });

module.exports = mongoose.connection;
