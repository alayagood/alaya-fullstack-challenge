const { Storage } = require('@google-cloud/storage');
const ImageUtils = require('../utils/image.utils');
require('dotenv').config();
const path = require('path');

class GCSProvider {
  constructor() {
    // Initialize the GCS client
    this.storage = new Storage();
    const projectId = process.env.GCS_PROJECT_ID;
    const keyFilePath = path.resolve(process.env.GCS_KEYFILE_PATH);
    this.storage = new Storage({ projectId, keyFilename: keyFilePath });
    this.bucketName = process.env.GCS_BUCKET_NAME;
    this.imageUtils = new ImageUtils();
  }

  validateConfig() {
    if (!process.env.GCS_PROJECT_ID || !process.env.GCS_KEYFILE_PATH || !process.env.GCS_BUCKET_NAME) {
      throw new Error('GCS configuration is missing or incomplete');
    }
  }

  async uploadImage(file) {
    try {
      // Validate the image file
      this.imageUtils.validateImage(file);

      // Generate a unique image file name
      const imageFileName = this.imageUtils.generateUniqueName(file);

      // Set the image file path in GCS
      const imagePath = `${this.bucketName}/${imageFileName}`;

      // Create a write stream to GCS bucket
      const bucket = this.storage.bucket(this.bucketName);
      const fileStream = bucket.file(imagePath).createWriteStream();

      // Pipe the file buffer to the write stream
      await new Promise((resolve, reject) => {
        fileStream
          .on('finish', resolve)
          .on('error', reject)
          .end(file.buffer);
      });

      // Get the public URL of the uploaded image
      const imageUrl = `https://storage.googleapis.com/${imagePath}`;
      return imageUrl;
    } catch (error) {
      throw new Error('Failed to upload image to GCS');
    }
  }

  async deleteImage(imageUrl) {
    try {
      // Extract the image path from the URL
      const imagePath = imageUrl.replace('https://storage.googleapis.com/', '');

      // Delete the image file from GCS bucket
      const bucket = this.storage.bucket(this.bucketName);
      await bucket.file(imagePath).delete();
    } catch (error) {
      throw new Error('Failed to delete image from GCS');
    }
  }
}

module.exports = GCSProvider;
