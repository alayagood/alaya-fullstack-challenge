const ImageStorageFactory = require('../factories/image.storage.factory');

/**
 * Service for managing images.
 */
class ImageService {
  constructor(providerName= 'default') {
    this.imageStorageProvider = ImageStorageFactory.createProvider(providerName);
  }

  /**
   * Save an image.
   * @param {Object} file - The image file object.
   * @returns {Promise<string>} - The URL of the saved image.
   * @throws {Error} - If no image file provided or failed to save the image.
   */
  async saveImage(file) {
    if (!file) {
      throw new Error('No image file provided');
    }

    try {
      return await this.imageStorageProvider.uploadImage(file);
    } catch (error) {
      console.log('saveImage', error);
      throw new Error('Failed to save image');
    }
  }

  /**
   * Delete an image.
   * @param {string} imageUrl - The URL of the image to delete.
   * @throws {Error} - If no image URL provided or failed to delete the image.
   */
  async deleteImage(imageUrl) {
    if (!imageUrl) {
      throw new Error('No image URL provided');
    }

    try {
      await this.imageStorageProvider.deleteImage(imageUrl);
    } catch (error) {
      throw new Error('Failed to delete image');
    }
  }
}

module.exports = ImageService;
