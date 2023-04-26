const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const cuid = require('cuid');

const postSchema = new Schema({
    cuid: { type: 'String', default: cuid, required: true },
    name: { type: 'String', required: true },
    title: { type: 'String', required: true },
    content: { type: 'String', required: true },
    user: { type: 'String', required: true },
    slug: { type: 'String', required: true },
    dateAdded: { type: 'Date', default: Date.now, required: true },
});

module.exports = mongoose.model('Post', postSchema);
