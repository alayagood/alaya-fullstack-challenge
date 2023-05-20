const express = require("express");
const UserController = require("../controllers/user.controller");

const router = express.Router();

router.post("/users/authenticate", UserController.authenticate);

router.post("/users/create", UserController.createUser);

module.exports = router;
