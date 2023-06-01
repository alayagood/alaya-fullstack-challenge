const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
  },
  assetId: {
    type: String
  },
  publicId: {
    type: String
  },
});

const Image = mongoose.models.Image
  ? mongoose.model('Image')
  : mongoose.model('Image', imageSchema);

module.exports = Image;
