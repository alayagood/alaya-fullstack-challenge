const express = require('express');
const router = express.Router();
const UploadController = require('../controllers/upload.controller');
const parser = require('./../middlewares/cloudinary/cloudinary');

// Add a new Post
router.route('/upload').post(parser.single('image'), UploadController.uploadImage);


module.exports = router;
