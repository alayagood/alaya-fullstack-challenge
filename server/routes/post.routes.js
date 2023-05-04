const express = require("express");
const {jwtAuth} = require("../middleware/auth");

const router = express.Router();
const PostController = require("../controllers/post.controller");

// Get all Posts
router.route("/posts").get(PostController.getPosts);

// Get one post by cuid
router.route("/posts/:cuid").get(PostController.getPost);

// Add a new Post
router.route("/posts").post(jwtAuth, PostController.addPost);

// Delete a post by cuid
router.route("/posts/:cuid").delete(jwtAuth, PostController.deletePost);

module.exports = router;
