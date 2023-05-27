const fs = require('fs');
const path = require('path');
const ImageUtils = require('../utils/image.utils');

/**
 * Local provider for saving and deleting images.
 */
class LocalProvider {
  /**
   * Creates an instance of LocalProvider.
   */
  constructor() {
    // Set the base directory for saving images
    const defaultPath = path.join(process.cwd(), 'uploads');
    this.basePath = process.env.UPLOADS_PATH ? path.join(process.cwd(), process.env.UPLOADS_PATH) : defaultPath;

    // Get the server URL from environment variables
    this.serverUrl = process.env.SERVER_URL || 'http://localhost:3000';

    // Create the base directory if it doesn't exist
    if (!fs.existsSync(this.basePath)) {
      fs.mkdirSync(this.basePath);
    }
  }

  /**
   * Uploads an image.
   * @param {Object} file - The image file object.
   * @returns {Promise<string>} - The URL of the saved image.
   * @throws {Error} - If the image is invalid or fails to save.
   */
  async uploadImage(file) {
    try {
      // Validate the image file
      if (!ImageUtils.validateImage(file)) {
        throw new Error('Invalid image');
      }

      // Generate a unique image file name
      const imageFileName = ImageUtils.generateUniqueName(file);

      // Set the image file path
      const imagePath = path.join(this.basePath, imageFileName);

      // Save the image file
      await fs.promises.writeFile(imagePath, file.buffer);

      // Get the full URL of the image
      return `${this.serverUrl}/uploads/${imageFileName}`;
    } catch (error) {
      console.log(error);
      throw new Error('Failed to save image');
    }
  }

  /**
   * Deletes an image.
   * @param {string} imageUrl - The URL of the image to delete.
   * @throws {Error} - If it fails to delete the image.
   */
  async deleteImage(imageUrl) {
    try {
      // Get the image file name from the URL
      const imageFileName = path.basename(imageUrl);

      // Set the image file path
      const imagePath = path.join(this.basePath, imageFileName);

      // Delete the image file
      await fs.promises.unlink(imagePath);
    } catch (error) {
      throw new Error('Failed to delete image');
    }
  }
}

module.exports = LocalProvider;
