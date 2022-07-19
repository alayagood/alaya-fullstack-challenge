const cuid = require("cuid");
const slug = require("limax");
const sanitizeHtml = require("sanitize-html");
const { SUCCESS, BAD_REQUEST, INTERNAL_ERROR } = require("@constants");
const Post = require("@models/post");
const User = require("@models/user");
const { uploadImage, removeImage } = require("@services/cloudinary");

/**
 * Get all posts
 * @param req
 * @param res
 * @returns void
 */
const getPosts = async(req, res) => {
    try {
        const posts = await Post.find().populate("author").sort("-dateAdded").exec();
        res.json({ posts });
    } catch (err) {
        res.status(INTERNAL_ERROR).send(err);
    }
};

/**
 * Save a post
 * @param req
 * @param res
 * @returns void
 */
const addPost = async(req, res) => {
    const { title, content, image: imageBase64 } = req.body.post;
    if (!title || !content) {
        return res.status(BAD_REQUEST);
    }

    const image = await uploadImage(imageBase64);

    try {
        const newPost = new Post({
            title,
            content,
            image
        });

        newPost.author = await User.findById(req.user._id, { password: 0 });

        // Let's sanitize inputs
        newPost.title = sanitizeHtml(newPost.title);
        newPost.content = sanitizeHtml(newPost.content);

        newPost.slug = slug(newPost.title.toLowerCase(), { lowercase: true });
        newPost.cuid = cuid();
        const savedPost = await newPost.save();
        res.json({ post: savedPost });
    } catch (err) {
        res.status(INTERNAL_ERROR).send(err);
    }
};

/**
 * Get a single post
 * @param req
 * @param res
 * @returns void
 */
const getPost = async(req, res) => {
    try {
        const post = await Post.findOne({ cuid: req.params.cuid, author: req.user._id }).populate("author").exec();
        res.json({ post });
    } catch (err) {
        res.status(INTERNAL_ERROR).send(err);
    }
};

/**
 * Delete a post
 * @param req
 * @param res
 * @returns void
 */
const deletePost = async(req, res) => {
    const userId = req.user._id;
    try {
        const post = await Post.findOneAndDelete({ cuid: req.params.cuid, author: userId }).exec();
        removeImage(post.image);
        res.status(SUCCESS).end();
    } catch (err) {
        res.status(INTERNAL_ERROR).send(err);
    }
};

module.exports = {
    getPosts,
    addPost,
    getPost,
    deletePost
};
