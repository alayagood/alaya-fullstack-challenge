const AWS = require('aws-sdk');
const ImageUtils = require('../utils/image.utils');
require('dotenv').config();

class AwsProvider {
  constructor() {
    // Initialize the AWS S3 client
    const awsConfig = {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    };
    this.s3 = new AWS.S3(awsConfig);
    this.bucketName = process.env.AWS_BUCKET_NAME;
    this.imageUtils = new ImageUtils();
  }

  validateConfig() {
    if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY || !process.env.AWS_BUCKET_NAME) {
      throw new Error('AWS configuration is missing or incomplete');
    }
  }

  async uploadImage(file) {
    try {
      // Validate the image file
      this.imageUtils.validateImage(file);

      // Generate a unique image file name
      const imageFileName = this.imageUtils.generateUniqueName(file);

      // Set the image file path in AWS S3
      const imagePath = `${imageFileName}`;

      // Prepare the upload parameters
      const uploadParams = {
        Bucket: this.bucketName,
        Key: imagePath,
        Body: file.buffer,
      };

      // Upload the file to AWS S3
      await this.s3.upload(uploadParams).promise();

      // Get the public URL of the uploaded image
      const imageUrl = this.s3.getSignedUrl('getObject', { Bucket: this.bucketName, Key: imagePath });
      return imageUrl;
    } catch (error) {
      throw new Error('Failed to upload image to AWS S3');
    }
  }

  async deleteImage(imageUrl) {
    try {
      // Extract the image path from the URL
      const imagePath = imageUrl.split('.com/')[1];

      // Prepare the delete parameters
      const deleteParams = {
        Bucket: this.bucketName,
        Key: imagePath,
      };

      // Delete the image file from AWS S3
      await this.s3.deleteObject(deleteParams).promise();
    } catch (error) {
      throw new Error('Failed to delete image from AWS S3');
    }
  }
}

module.exports = AwsProvider;
