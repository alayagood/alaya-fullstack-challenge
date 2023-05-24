const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    usersname: { type: 'String', required: true, unique: true },
    password: { type: 'String', required: true },
});

module.exports = mongoose.model('Users', usersSchema);
