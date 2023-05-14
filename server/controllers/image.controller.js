const Image = require("../models/image");

/**
 * Get all images
 * @param req
 * @param res
 * @returns void
 */
getImages = async (req, res) => {
  Image.find({user: req.user._id})
    .sort("-dateAdded")
    .exec((err, images) => {
      if (err) {
        res.status(500).send(err);
      }
      res.json({images});
    });
};

/**
 * Save an image
 * @param req
 * @param res
 * @returns void
 */
addImage = async (req, res) => {
  if (!req.body.image || !req.body.image.path) {
    return res.status(400).end();
  }

  const newImage = new Image(req.body.image);

  newImage.user = req.user._id;

  newImage.save((err, saved) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({images: saved});
  });
};

module.exports = {
  getImages,
  addImage,
};
