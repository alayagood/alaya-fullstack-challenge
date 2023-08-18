const { Router } = require('express');

const auth = require('./auth.routes');
const posts = require('./post.routes');

const router = new Router();

router.use(auth);
router.use(posts);

module.exports = router;