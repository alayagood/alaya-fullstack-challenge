const express = require('express');
const router = express.Router();
const PostController = require('../controllers/post.controller');

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.route('/posts').get(PostController.getPosts);
router.route('/posts/:cuid').get(PostController.getPost);
router
	.route('/posts/:cuid/upload')
	.post(upload.single('file'), PostController.uploadPostPhoto);
router.route('/posts').post(PostController.addPost);
router.route('/posts/:cuid').delete(PostController.deletePost);

module.exports = router;
