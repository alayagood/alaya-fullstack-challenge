const express = require('express');
const router = express.Router();
const ImageController = require('../controllers/image.controller');
const isAuthorized = require('../middlewares/isAuthorized');
const multer = require('multer');

// configure multer to store uploaded files in memory
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB file size limit
});

// Upload an image
router.route('/').post(isAuthorized, upload.array('file'), ImageController.uploadImages);

// Delete image
router.route('/:imageId').delete(isAuthorized, ImageController.deleteImage);

module.exports = router;
