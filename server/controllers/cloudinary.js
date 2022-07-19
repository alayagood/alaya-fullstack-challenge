const cloudinary = require("@utils/cloudinary");

const uploadImage = async(image) => {
    if (!image) {
        return;
    }
    try {
        const { public_id } = await cloudinary.uploader.upload(image);
        return public_id;
    } catch (e) {
        console.error(e);
    }
    return "";
};

const removeImage = async(publicId) => {
    if (!publicId) {
        return;
    }
    try {
        await cloudinary.uploader.destroy(publicId);
    } catch (e) {
        console.error(e);
    }
};

module.exports = {
    uploadImage,
    removeImage
};