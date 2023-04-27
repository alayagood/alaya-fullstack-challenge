const cloudinary = require('cloudinary').v2;


// cloudinary Configuration 
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

uploadImages = async (images) => {
    const uploadedImages = [];
    try {
        // upload picture
        if (images && Array.isArray(images) && images.length > 0) {
            for (let i = 0; i < images.length; i++) {
                const savedImage = await cloudinary.uploader.upload(images[i].image);
                uploadedImages.push(savedImage)
            }
        }
    } catch (err) {
        console.log(err);
        throw new Error(err);
    }
    return uploadedImages;
}


module.exports = {
    uploadImages
};