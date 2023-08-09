const express = require('express');
const router = express.Router();
const PostController = require('../controllers/post.controller');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
const upload = multer({
  storage,
});

router.post('/cloudinary/upload', upload.single('file'), PostController.imageUpload);

// Get all Posts
router.route('/').get(PostController.getPosts);

// Get one post by cuid
router.route('/:cuid').get(PostController.getPost);

// Add a new Post
router.route('/').post(PostController.addPost);

// Delete a post by cuid
router.route('/:cuid').delete(PostController.deletePost);



module.exports = router;
