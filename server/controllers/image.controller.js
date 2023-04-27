const Image = require('../models/image');

/**
 * Get images of a post
 * @param req
 * @param res
 * @returns void
 */
getImages = async (req, res) => {
  if (!req.params || !req.params.post) {
    return res.status(403).end();
  }

  const images = await Image.find({ post: req.params.post });
  res.json({ images });
};

module.exports = {
  getImages
};
