const express = require('express');
const router = express.Router();
const multer = require('multer')

const PostController = require('../controllers/post.controller');
const UserController = require('../controllers/auth.controller');
const path = require("path");


const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, path.join(__dirname, '../uploads'));
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  }
});

const uploadPicture = multer({storage});

// Get all Posts
router.route('/posts').get(PostController.getPosts);

// Get one post by cuid
router.route('/posts/:cuid').get(PostController.getPost);


// Add a new Post
router.route('/posts').post(UserController.validateUserToken, uploadPicture.single('picture'), PostController.addPost);

// Delete a post by cuid
router.route('/posts/:cuid').delete(UserController.validateUserToken, PostController.deletePost);


module.exports = router;
