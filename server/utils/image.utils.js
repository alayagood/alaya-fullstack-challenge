const path = require('path');

/**
 * Utility class for image operations.
 */
class ImageUtils {
  /**
   * Validates the image file.
   * @param {Object} file - The image file to validate.
   * @returns {boolean} - True if the image file is valid, otherwise throws an error.
   * @throws {Error} - If the file size exceeds the maximum limit or the file format is invalid.
   */
  static validateImage(file) {
    // Check if the file size is within limits
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      throw new Error('File size exceeds the maximum limit');
    }

    // Check the file format (example: accept only JPEG and PNG)
    const allowedFormats = ['.jpg', '.jpeg', '.png'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (!allowedFormats.includes(ext)) {
      throw new Error('Invalid file format');
    }

    // Perform additional validations as needed
    // ...

    // If all validations pass, return true
    return true;
  }

  /**
   * Generates a unique name for the image file.
   * @param {Object} file - The image file to generate the name for.
   * @returns {string} - The unique name for the image file.
   */
  static generateUniqueName(file) {
    const timestamp = Date.now();
    const ext = path.extname(file.originalname);
    return `${timestamp}_${Math.floor(Math.random() * 10000)}${ext}`;
  }

  /**
   * Processes the image.
   * @param {string} imageUrl - The URL of the image to process.
   * @returns {string} - The processed image URL.
   */
  static processImage(imageUrl) {
    // Add image processing logic here (e.g., resizing, cropping, filtering)
    // ...

    // Return the processed image URL
    return imageUrl;
  }
}

module.exports = ImageUtils;
