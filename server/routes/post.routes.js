const express = require("express");
const router = express.Router();
const { param, body } = require("express-validator");
const passport = require("passport");
const PostController = require("../controllers/post.controller");

// Get all Posts
router.route("/posts").get(PostController.getPosts);

// Get one post by cuid
router
  .route("/posts/:cuid")
  .get(param("cuid").notEmpty().trim(), PostController.getPost);

// Add a new Post
router
  .route("/posts")
  .post(
    body("title").trim().escape(),
    body("content").trim().escape(),
    body("owner").notEmpty(),
    body("coverImage").optional(),
    body("images").optional().isArray(),
    passport.authenticate("jwt", { session: false }),
    PostController.addPost
  );

// Delete a post by cuid
router
  .route("/posts/:cuid")
  .delete(
    param("cuid").notEmpty().trim(),
    passport.authenticate("jwt", { session: false }),
    PostController.deletePost
  );

module.exports = router;
