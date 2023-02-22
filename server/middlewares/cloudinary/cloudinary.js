const cloudinary = require('cloudinary').v2
const {CloudinaryStorage} = require('multer-storage-cloudinary');
const multer = require('multer');
const {readEnv} = require("../../util/util");

cloudinary.config({
  cloud_name: readEnv('CLOUDINARY_NAME'),
  api_key: readEnv('CLOUDINARY_KEY'),
  api_secret: readEnv('CLOUDINARY_SECRET'),
})

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'alaya-challenge',
        allowedFormats: ['jpg', 'png'],
        public_id: (req, file) => file.originalname,
    },
});
const parser = multer({storage: storage});

module.exports = parser;
