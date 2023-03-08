const Post = require('../models/post');
const Media = require('../models/media');
const cuid = require('cuid');
const slug = require('limax');
const sanitizeHtml = require('sanitize-html');
const MediaService = require('../services/media.service');

getPosts = async (req, res) => {
	const { _id: owner } = req.user;

	Post.find({ owner })
		.sort('-dateAdded')
		.exec((err, posts) => {
			if (err) {
				res.status(500).send(err);
			} else {
				res.json({ posts });
			}
		});
};

addPost = async (req, res) => {
	if (!req.body.post.name || !req.body.post.title || !req.body.post.content) {
		res.status(403).end();
	}

	const { _id: owner } = req.user;
	const newPost = new Post({
		...req.body.post,
		owner,
	});

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
			const { _id: owner } = req.user;
			const { cuid: postId } = req.params;
			const metadata = {
				postId,
			};

			const post = await Post.findOne({ cuid: postId });

			if (!post) {
				return res.status(404).send(new Error('Not found'));
			}

			if (post.owner !== owner) {
				return res.status(403).send(new Error('Permission denied'));
			}

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
				owner,
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

getPost = async (req, res) => {
	Post.findOne({ cuid: req.params.cuid }).exec((err, post) => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.json({ post });
		}
	});
};

getPostMedia = async (req, res) => {
	Media.find({
		postCuid: req.params.cuid,
	})
		.sort('-dateAdded')
		.exec((err, media) => {
			if (err) {
				res.status(500).send(err);
			} else {
				res.json({ media });
			}
		});
};

deletePost = async (req, res) => {
	const { _id: owner } = req.user;

	Post.findOne({ cuid: req.params.cuid }).exec(async (err, post) => {
		if (err) {
			res.status(500).send(err);
		} else {
			if (!post) {
				return res.status(404).send(new Error('Not found'));
			}

			if (post.owner !== owner) {
				return res.status(403).send(new Error('Permission denied'));
			}

			post.remove(() => {
				res.status(200).end();
			});
		}
	});
};

module.exports = {
	getPosts,
	addPost,
	uploadPostPhoto,
	getPost,
	getPostMedia,
	deletePost,
};
