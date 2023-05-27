const GCSProvider = require('../providers/gcs.provider');
const AWSProvider = require('../providers/aws.provider');
const LocalProvider = require('../providers/local.provider');
const CloudinaryProvider = require('../providers/cloudinary.provider');
require('dotenv').config();

/**
 * Service for managing images.
 */
class ImageService {
  constructor() {
    // Define the storage providers
    this.storageProviders = {
      cloudinary: new CloudinaryProvider(),
      gcs: new GCSProvider(),
      aws: new AWSProvider(),
      local: new LocalProvider(),
    };
  }

  /**
   * Get the storage provider based on the provided name.
   * @param {string} providerName - The name of the storage provider.
   * @returns {Object} - The corresponding storage provider.
   * @throws {Error} - If the storage provider is invalid.
   */
  getProvider(providerName) {
    let provider;
    if (providerName === 'default') {
      provider = process.env.DEFAULT_IMAGE || 'local';
    } else {
      provider = providerName;
    }
    console.log('getProvider',provider);
    if (!this.storageProviders[provider]) {
      throw new Error('Invalid storage provider');
    }

    return this.storageProviders[provider];
  }

  /**
   * Save an image.
   * @param {Object} file - The image file object.
   * @param {string} provider - The name of the storage provider.
   * @returns {Promise<string>} - The URL of the saved image.
   * @throws {Error} - If no image file provided or failed to save the image.
   */
  async saveImage(file, provider) {
    if (!file) {
      throw new Error('No image file provided');
    }
    const storageProvider = this.getProvider(provider);
    try {
      return await storageProvider.uploadImage(file);
    } catch (error) {
      console.log('saveImage',error);
      throw new Error('Failed to save image');
    }
  }

  /**
   * Delete an image.
   * @param {string} imageUrl - The URL of the image to delete.
   * @param {string} provider - The name of the storage provider.
   * @throws {Error} - If no image URL provided or failed to delete the image.
   */
  async deleteImage(imageUrl, provider) {
    if (!imageUrl) {
      throw new Error('No image URL provided');
    }

    const storageProvider = this.getProvider(provider);

    try {
      await storageProvider.deleteImage(imageUrl);
    } catch (error) {
      throw new Error('Failed to delete image');
    }
  }
}

module.exports = ImageService;
