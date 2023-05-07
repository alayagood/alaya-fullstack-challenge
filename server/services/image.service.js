const Image = require('../models/image');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');


// configure cloudinary with your account credentials
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

/**
 * Uploads the files to the provider and creates their corresponding Images on the database
 * @async
 * @param {Array} images - the images to be uploaded
 * @param {string} userId
 * @returns {Promise<Array>} An array containing all the saved images
 */
async function uploadAndSaveImages(images, userId) {
    const uploadOptions = { 
        resource_type: 'image',
        transformation: {
        width: 500,
        height: 500,
        crop: 'limit'
        }
    }

    const savedImages = [];
    for (const image of images) {
        const result = await new Promise((resolve, reject) => {
            let uploadStream = cloudinary.uploader.upload_stream(uploadOptions, (error, result) => {
                if (result) {
                    resolve(result);
                } else {
                    reject(error);
                }
            });
            // Create readable stream from file buffer
            streamifier.createReadStream(image.buffer).pipe(uploadStream);
        });

        const newImage = new Image();
        newImage.url = result.secure_url;
        newImage.publicId = result.public_id;
        newImage.user = userId;
        const savedImage = await new Promise((resolve, reject) => {
            newImage.save((err, saved) => {
            if (err) {
                reject(err);
            }
            resolve(saved);
            });
        });
        savedImages.push(savedImage);
    }
    
    return savedImages;
}

/**
 * Finds the image by publicId and deletes it
 * @async
 * @param {string} publicId - The image publicId
 * @param {string} userId
 * @returns void
 */
async function deleteImageById(publicId, userId){
    await new Promise((resolve, reject) => {
        Image.findOne({ publicId }).exec(async (err, image) => {
            if (err) {
                let error = new Error('Internal Server Error');
                return reject(error);
            }
            // Check if it belongs to user
            if (!image) {
                let error = new Error('Image not found');
                error.statusCode = 404;
                return reject(error);
            }
            // Check if it belongs to user
            if (image.user != userId) {
                let error = new Error("Image doesn't belong to user");
                error.statusCode = 403;
                return reject(error);
            }
            try{
                await deleteImage(image);
                resolve();
            }catch(err){
                let error = new Error('Internal Server Error');
                return reject(error);
            }
        });
    });
}

/**
 * Removes the Image from the database and deletes it on the provider
 * @async
 * @param {object} image - The image object 
 * @returns void
 */
async function deleteImage(image){
    // Remove image
    await new Promise((resolve, reject) => {
        image.remove((err) => {
            if (err) {
                let error = new Error('Internal Server Error');
                return reject(error);
            }
            // Remove image from provider
            cloudinary.uploader.destroy(image.publicId);
            resolve();
        });
    }); 
}

module.exports = { 
    uploadAndSaveImages,
    deleteImageById,
    deleteImage
};