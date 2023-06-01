const express = require('express')
const router = express.Router()
const { loadPostByCuid } = require('../middlewares/loadPost')
const { loadImageByAssetId } = require('../middlewares/loadImage')
const ImageController = require('../controllers/post.image.controller')

router.route('/posts/:cuid/images').
  post(loadPostByCuid, ImageController.addImageToPost)

router.route('/posts/:cuid/images/:assetId').
  delete(loadPostByCuid, loadImageByAssetId,
    ImageController.deleteImageFromPost)

router.route('/posts/:cuid/images/:assetId').
  get(loadPostByCuid, loadImageByAssetId, ImageController.getImage)

router.route('/posts/:cuid/images').get(loadPostByCuid, ImageController.getImagesFromPost)

module.exports = router