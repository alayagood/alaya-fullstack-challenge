const path = require('path');

class ImageUtils {
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

  static generateUniqueName(file) {
    const timestamp = Date.now();
    const ext = path.extname(file.originalname);
    const uniqueName = `${timestamp}_${Math.floor(Math.random() * 10000)}${ext}`;
    return uniqueName;
  }

  static processImage(imageUrl) {
    // Add image processing logic here (e.g., resizing, cropping, filtering)
    // ...

    // Return the processed image URL
    return imageUrl;
  }
}

module.exports = ImageUtils;