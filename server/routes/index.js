const express = require("express");
const router = express.Router();
const { app: { apiUrl } } = require("@configs");
const { NOT_FOUND } = require("@constants");
const authRoutes = require("@routes/auth");
const postRoutes = require("@routes/post");

const api = `/${apiUrl}`;

router.use(api, authRoutes);
router.use(`${api}/posts`, postRoutes);
router.use(api, (req, res) => res.status(NOT_FOUND).json("No API route found"));

module.exports = router;