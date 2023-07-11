const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.REACT_APP_CLOUDINARY_API_KEY,
    api_secret: process.env.REACT_APP_CLOUDINARY_API_SECRET
});

removeImages = async (images) => {
    images.map(image => cloudinary.uploader.destroy(image.name))
};

module.exports = {
    removeImages
};