const Post = require('../models/post');

const validate = async (req, res, next) => {
    const cuid = req.params.cuid;
    const userId = req.user._id;

    try {
        const post = await Post.findOne({cuid});
        if (!post) {
            return res.status(404).json({message: 'Post not found'});
        }

        if (post.userId.toString() !== userId.toString()) {
            return res.status(403).json({message: 'Unauthorized'});
        }

        next();
    } catch (err) {
        console.log(err);
        return res.status(500).json({message: 'An error occurred trying to validate the post'});
    }
};

module.exports = {validate};