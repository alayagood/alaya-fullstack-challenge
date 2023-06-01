const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,
  },
  postId: {
    type: String,
    required: true,
  },
  assetId: {
    type: String
  },
  publicId: {
    type: String
  },
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
