const Image = require('../models/image');

const loadImageByAssetId = async (req, res, next) => {
  try {
    const { assetId } = req.params
    
    const image = await Image.findOne(
      { postId: req.post._id, assetId: assetId })

    if (!image) {
      return res.status(404).json({ error: 'Image not found' })
    }

    req.image = image;

    next();
  } catch (error) {
    console.error('Error loading post:', error);
    return res.status(500).json({ error: 'Failed to load post' });
  }
};

module.exports = { loadImageByAssetId };