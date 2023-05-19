const jwt = require("jsonwebtoken");
const express = require("express");
const { getUser } = require("../controllers/user.controller");

const router = express.Router();

router.post("/login", async (req, res) => {
  const user = getUser();

  // Create JWT token
  const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1h" });

  res.json({
    message: 'Authenticated! Use this token in the "Authorization" header',
    token: token,
  });
});

module.exports = router;
