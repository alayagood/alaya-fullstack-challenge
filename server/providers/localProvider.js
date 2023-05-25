const fs = require('fs');
const path = require('path');
const ImageUtils = require('../utils/ImageUtils');

class LocalProvider {
  constructor() {
    this.basePath = path.join(__dirname, 'uploads');
    this.imageUtils = new ImageUtils();
  }

  async uploadImage(file) {
    try {
      // Validate the image file
      this.imageUtils.validateImageFile(file);

      // Generate a unique image file name
      const imageFileName = this.imageUtils.generateUniqueName(file);

      // Set the image file path
      const imagePath = path.join(this.basePath, imageFileName);

      // Save the image file
      await fs.promises.writeFile(imagePath, file.buffer);

      // Get the image URL
      const imageUrl = `/uploads/${imageFileName}`;
      return imageUrl;
    } catch (error) {
      throw new Error('Failed to save image');
    }
  }

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