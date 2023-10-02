const express = require('express');
const router = express.Router();
const postRoutes = require('./post.routes');
const identityRoutes = require('./identity.routes');

router.use('/posts', postRoutes);
router.use('/id', identityRoutes);

module.exports = router;
