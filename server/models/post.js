const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User');

const postSchema = new Schema({
    name: { type: 'String', required: true },
    title: { type: 'String', required: true },
    content: { type: 'String', required: true },
    slug: { type: 'String', required: true },
    cuid: { type: 'String', required: true },
    dateAdded: { type: 'Date', default: Date.now, required: true },
    author: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: User,
        required: true
    }
});

postSchema.pre('remove', { options: true }, function (next, options) {
    const post = this;
    const userId = options.userId;

    // Check if user is the owner of the post
    if (post.author.toString() !== userId) {
        const error = new Error('Unauthorized');

        error.status = 401;

        return next(error);
    }

    next();
})

module.exports = mongoose.model('Post', postSchema);
