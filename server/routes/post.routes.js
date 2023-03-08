const express = require('express');
const router = express.Router();
const passport = require('passport');
const PostController = require('../controllers/post.controller');

router
	.route('/posts')
	.get(
		passport.authenticate('jwt', { session: false }),
		PostController.getPosts
	);
router
	.route('/posts')
	.post(
		passport.authenticate('jwt', { session: false }),
		PostController.addPost
	);
router
	.route('/posts/:cuid')
	.get(
		passport.authenticate('jwt', { session: false }),
		PostController.getPost
	);
router
	.route('/posts/:cuid')
	.delete(
		passport.authenticate('jwt', { session: false }),
		PostController.deletePost
	);
router
	.route('/posts/:cuid/media')
	.get(
		passport.authenticate('jwt', { session: false }),
		PostController.getPostMedia
	);
router
	.route('/posts/:cuid/upload')
	.post(
		passport.authenticate('jwt', { session: false }),
		PostController.uploadPostPhoto
	);

module.exports = router;
