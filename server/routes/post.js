const express = require("express");
const router = express.Router();
const controller = require("@controllers/post");
const auth = require("@middlewares/auth");

// Get all Posts
router.route("/").get(controller.getPosts);

// Get one post by cuid
router.route("/:cuid").get(controller.getPost);

// Add a new Post
router.route("/").post(auth, controller.addPost);

// Delete a post by cuid
router.route("/:cuid").delete(auth, controller.deletePost);

module.exports = router;
