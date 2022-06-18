const express = require("express");
const { body } = require("express-validator");
const passport = require("passport");
const router = express.Router();
const UserController = require("../controllers/user.controller");

router
  .route("/users/signup")
  .post(
    body("name").optional(),
    body("username"),
    body("password"),
    UserController.signup
  );

router
  .route("/users/login")
  .post(
    body("username"),
    body("password"),
    passport.authenticate("local", { session: false }),
    UserController.login
  );

module.exports = router;
