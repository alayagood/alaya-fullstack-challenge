const express = require('express');
const router = express.Router();
const PostController = require('../controllers/post.controller');
const passport = require("passport");
require('../services/passport.service')(passport);

// Get all Posts
router.route('/').get(PostController.getPosts);

// Get one post by cuid
router.route('/:cuid').get(PostController.getPost);

router.route('/:cuid').delete(
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        PostController.deletePost(req, res)
    }
);


router.route('/').post(
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        PostController.addPost(req, res)
    }
);



module.exports = router;
