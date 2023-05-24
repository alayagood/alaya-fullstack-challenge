const express = require('express');
const router = express.Router();
const PostController = require('../controllers/post.controller');
const jwt = require('jsonwebtoken');
const Post = require('../models/post');

// Get all Posts
router.route('/posts').get(PostController.getPosts);

// Get one post by cuid
router.route('/posts/:cuid').get(PostController.getPost);

router.use((req, res, next)  => {

    const token = req.headers['authorization'];
    console.log(token);
    if (token=='null') {
        return res.sendStatus(403) ;
    } else {

        const validUser =  jwt.verify(token, "TOP_SECRET");
        if (!validUser.validUser) {
            return res.sendStatus(403);
        } 
        return next();
    }
    return next();
});

// Add a new Post
router.route('/posts').post(PostController.addPost);

// Delete a post by cuid
router.route('/posts/:cuid').delete(PostController.deletePost);

module.exports = router;
