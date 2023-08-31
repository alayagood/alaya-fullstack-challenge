const path = require('path');
const multer = require('multer');

const fs = require('fs');
const cloudinary = require('cloudinary').v2;

const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../public/uploads'))
    },
});

const VALID_FILE_TYPES = ['image/png', 'image/jpg', 'image/jpeg'];

const fileFilter = (req, file, cb) => {
    if (!VALID_FILE_TYPES.includes(file.mimetype)) {
        const error = new Error("Invalid file type");
        cb(error)
    } else {
        cb(null, true);
    }
};

const upload = multer({
    storage,
    fileFilter,
});

const uploadToCloudinary = async (req, res, next) => {
    const uploadImageToClodinary = async (filePath) => {
        cloudinary.image(filePath, {quality: 70});
        return await cloudinary.uploader.upload(filePath);
    }
    const uploadPromises = [];
    let filesUrl = [];
	if (req.files) {
        req.files.forEach(file => {
            const filePath = file.path;
            uploadPromises.push(uploadImageToClodinary(filePath));
            
        });
        Promise.all(uploadPromises).then( resImg => {
            //delete local files afer upload
            req.files.forEach(file => {
                fs.unlinkSync(file.path);
            });
            //save cloud images urls
            filesUrl = resImg.map( img => img.secure_url);
            req.files_url = filesUrl;
            return next();
        }).catch( err => next());

  } else {
    return next();
  }
};

module.exports = { upload: upload, uploadToCloudinary };