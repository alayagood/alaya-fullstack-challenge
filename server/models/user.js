const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const cuid = require('cuid');

const userSchema = new Schema({
    cuid: { type: 'String', required: true },
    firstname: { type: 'String', required: true },
    lastname: { type: 'String', required: true },
    username: { type: 'String', required: true, unique: true },
    password: { type: 'String', required: true },
    dateAdded: { type: 'Date', default: Date.now, required: true },
});

module.exports = mongoose.model('User', userSchema);
