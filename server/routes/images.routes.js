const express = require("express");
const passport = require("passport");
const router = express.Router();
const ImageController = require("../controllers/image.controller");

// router.route("/image/:id").get(param("id").isString(), UserController.login);

router
  .route("/images/upload")
  .post(
    passport.authenticate("jwt", { session: false }),
    ImageController.upload
  );

module.exports = router;
