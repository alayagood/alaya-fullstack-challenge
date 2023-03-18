const express = require("express");
const router = express.Router();
const passport = require("passport");
const PostController = require("../controllers/post.controller");
const PhotoController = require("../controllers/photo.controller");
const { uploadImage } = require("../middleware/image_upload");

// Get all Posts
router.route("/posts").get(PostController.getPosts);

// Get one post by cuid
router.route("/posts/:cuid").get(PostController.getPost);

// Add a new Post
router
  .route("/posts")
  .post(
    passport.authenticate("jwt", { session: false }),
    PostController.addPost
  );

// Delete a post by cuid
router
  .route("/posts/:cuid")
  .delete(
    passport.authenticate("jwt", { session: false }),
    PostController.deletePost
  );

// Get photos for a given post
router.route("/posts/:cuid/photos").get(PhotoController.getPhotos);

// Add photo to a post
router
  .route("/posts/:cuid/photos")
  .post(
    passport.authenticate("jwt", { session: false }),
    uploadImage,
    PhotoController.addPhoto
  );

module.exports = router;
