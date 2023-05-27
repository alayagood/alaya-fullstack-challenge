const fs = require('fs');
const cloudinary = require('cloudinary').v2;
const ImageUtils = require('../utils/image.utils');
require('dotenv').config();

class CloudinaryProvider {
    constructor() {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });

        this.imageUtils = new ImageUtils();
        this.tempDirectory = 'temp';
        this.createTempDirectoryIfNotExists();
    }

    createTempDirectoryIfNotExists() {
        if (!fs.existsSync(this.tempDirectory)) {
            fs.mkdirSync(this.tempDirectory);
        }
    }

    async uploadImage(file) {
        try {
            // Validate the image file
            ImageUtils.validateImage(file);

            // Generate a unique image file name
            const imageFileName = ImageUtils.generateUniqueName(file);

            // Set the path for the temporary file
            const tempFilePath = `./${this.tempDirectory}/${imageFileName}`;

            // Save the image to the temporary file
            await fs.promises.writeFile(tempFilePath, file.buffer);

            // Upload the image from the temporary file to Cloudinary
            const result = await cloudinary.uploader.upload(tempFilePath, {
                public_id: imageFileName,
                folder: process.env.CLOUDINARY_FOLDER || '',
            });

            // Get the public URL of the uploaded image
            const imageUrl = result.secure_url;

            // Remove the temporary file
            await fs.promises.unlink(tempFilePath);

            return imageUrl;
        } catch (error) {
            console.log(error);
            throw new Error('Failed to upload image to Cloudinary');
        }
    }

    async deleteImage(imageUrl) {
        try {
            // Extract the public ID from the image URL
            const publicId = imageUrl.replace(/^.*\//, '').replace(/\..*$/, '');

            // Delete the image from Cloudinary
            await cloudinary.uploader.destroy(publicId);
        } catch (error) {
            throw new Error('Failed to delete image from Cloudinary');
        }
    }
}

module.exports = CloudinaryProvider;
