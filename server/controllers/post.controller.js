const Post = require('../models/post');
const Media = require('../models/media');
const cuid = require('cuid');
const slug = require('limax');
const sanitizeHtml = require('sanitize-html');
const MediaService = require('../services/media.service');

/**
 * Get all posts
 * @param req
 * @param res
 * @returns void
 */
getPosts = async (req, res) => {
	Post.find()
		.sort('-dateAdded')
		.exec((err, posts) => {
			if (err) {
				res.status(500).send(err);
			}
			res.json({ posts });
		});
};

/**
 * Save a post
 * @param req
 * @param res
 * @returns void
 */
addPost = async (req, res) => {
	if (!req.body.post.name || !req.body.post.title || !req.body.post.content) {
		res.status(403).end();
	}

	const newPost = new Post(req.body.post);

	newPost.title = sanitizeHtml(newPost.title);
	newPost.name = sanitizeHtml(newPost.name);
	newPost.content = sanitizeHtml(newPost.content);

	newPost.slug = slug(newPost.title.toLowerCase(), { lowercase: true });
	newPost.cuid = cuid();
	newPost.save((err, saved) => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.json({ post: saved });
		}
	});
};

uploadPostPhoto = async (req, res) => {
	try {
		if (!req.files) {
			res.status(400);
		} else {
			const { cuid: postId } = req.params;
			const metadata = {
				postId,
			};

			const file = req.files[Object.keys(req.files)[0]];
			const { public_id, secure_url } = await MediaService.upload(
				file,
				metadata
			);

			const newMedia = new Media({
				originalFilename: file.name,
				key: public_id,
				url: secure_url,
				postCuid: postId,
			});

			newMedia.cuid = cuid();
			newMedia.save((err, saved) => {
				if (err) {
					res.status(500).send(err);
				} else {
					res.json({ media: saved });
				}
			});
		}
	} catch (err) {
		res.status(500).send(err);
	}
};

/**
 * Get a single post
 * @param req
 * @param res
 * @returns void
 */
getPost = async (req, res) => {
	Post.findOne({ cuid: req.params.cuid }).exec((err, post) => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.json({ post });
		}
	});
};

/**
 * Delete a post
 * @param req
 * @param res
 * @returns void
 */
deletePost = async (req, res) => {
	Post.findOne({ cuid: req.params.cuid }).exec((err, post) => {
		if (err) {
			res.status(500).send(err);
		}

		post.remove(() => {
			res.status(200).end();
		});
	});
};

module.exports = {
	getPosts,
	addPost,
	uploadPostPhoto,
	getPost,
	deletePost,
};
