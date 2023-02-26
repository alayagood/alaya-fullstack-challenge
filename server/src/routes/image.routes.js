const express = require('express');
const router = express.Router();
const ImageController = require('../controllers/image.controller');
const authMiddleware = require('../middleware/authentication')
const imageUploadMiddleware = require('../middleware/imageUpload')

router.route('/image').post(authMiddleware, imageUploadMiddleware, ImageController.addImage);

module.exports = router;
