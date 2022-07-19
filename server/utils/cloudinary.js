const cloudinary = require("cloudinary").v2;
const { cloudinary: { cloud_name, api_key, api_secret } } = require("@configs");

cloudinary.config({ cloud_name, api_key, api_secret });

module.exports = cloudinary;