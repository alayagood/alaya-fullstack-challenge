const mongoose = require('mongoose');
const User = require('./user');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    by: {type:mongoose.Types.ObjectId, ref: User},
    title: { type: 'String', required: true },
    content: { type: 'String', required: true },
    slug: { type: 'String', required: true },
    cuid: { type: 'String', required: true },
  },
  {
    timestamps: true
  }
  );

module.exports = mongoose.model('Post', postSchema);
