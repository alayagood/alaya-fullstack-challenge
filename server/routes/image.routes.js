const express = require('express');
const router = express.Router();
const ImageController = require('../controllers/image.controller');

// Get images
router.route('/images/:post').get(ImageController.getImages);

module.exports = router;
