const imageService = require('../services/image.service');


/**
 * Uploads one or multiple images
 * @param req
 * @param res
 * @returns void
 */
uploadImages = async (req, res) => {
  await imageService.uploadAndSaveImages(req.files, req.session.userId)
    .then(savedImages => {
      const response = {
        images: savedImages
      };
      res.status(200).json(response);
    })
    .catch(error => {
      return res.status(500).json({ error: 'Error uploading image' });
    });
};

/**
 * Deletes an Image
 * @param req
 * @param res
 * @returns void
 */
deleteImage = async (req, res) => {
  await imageService.deleteImageById(req.params.imageId, req.session.userId)
  .then(() => {
    res.status(200).json({ message: 'Image deleted' });
  }).catch(error => {
    res.status(error.statusCode ? error.statusCode : 500).json({ error: error.message });
  });
};

module.exports = {
  uploadImages,
  deleteImage
};
