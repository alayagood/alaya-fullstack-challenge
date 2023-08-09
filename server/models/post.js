const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    email:  { type: 'String', required: true },
    title: { type: 'String', required: true },
    content: { type: 'String', required: true },
    slug: { type: 'String', required: true },
    image: { type: 'String', required: false },
    cuid: { type: 'String', required: true },
    dateAdded: { type: 'Date', default: Date.now, required: true },
});

module.exports = mongoose.model('Post', postSchema);
