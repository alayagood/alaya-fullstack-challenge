const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    ownedBy: { type: 'String', required: true },
    name: { type: 'String', required: true },
    title: { type: 'String', required: true },
    content: { type: 'String', required: true },
    imgURL: {type: 'String'},
    slug: { type: 'String', required: true },
    cuid: { type: 'String', required: true },
    dateAdded: { type: 'Date', default: Date.now, required: true },
});

module.exports = mongoose.model('Post', postSchema);
