const express = require('express');
const router = express.Router();
const PostController = require('../controllers/post.controller');
const passport = require("passport");
require('../services/passport.service')(passport);
const multer = require('multer');
const {GridFsStorage} = require('multer-gridfs-storage');
const url = 'mongodb://localhost:2717/mymongo';

const storage = new GridFsStorage({
    url,
    file: (req, file) => {
        //If it is an image, save to photos bucket
        if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
            return {
                bucketName: "photos",
                filename: `${Date.now()}_${file.originalname}`,
            }
        } else {
            //if not save to default bucket
            // TODO this could be used to store other files such as pdf
            return `${Date.now()}_${file.originalname}`
        }
    },
})

const upload = multer({ storage })

// Get all Posts
router.route('/').get(PostController.getPosts);

// Get one post by cuid
router.route('/:cuid').get(PostController.getPost);

router.route('/:cuid').delete(
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        PostController.deletePost(req, res)
    }
);


router.route('/').post(
    passport.authenticate('jwt', { session: false }),
    upload.single('image'),
    (req, res) => PostController.addPost(req, res, req.file?.id)
);



module.exports = router;
