const express = require("express");
const {jwtAuth} = require("../middleware/auth");

const router = express.Router();
const ImageController = require("../controllers/image.controller");

// Get all Images
router.route("/images").get(jwtAuth, ImageController.getImages);

// Add a new Image
router.route("/images").post(jwtAuth, ImageController.addImage);

module.exports = router;
