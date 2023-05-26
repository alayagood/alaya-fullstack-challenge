const GCSProvider = require('../providers/gcsProvider');
const AWSProvider = require('../providers/awsProvider');
const LocalProvider = require('../providers/localProvider');

class ImageService {
  constructor() {
    this.storageProviders = {
      gcs: new GCSProvider(),
      aws: new AWSProvider(),
      local: new LocalProvider(),
    };
  }

  async saveImage(file, provider) {
    const storageProvider = this.storageProviders[provider];
    if (!storageProvider) {
      throw new Error('Invalid storage provider');
    }

    try {
      return await storageProvider.uploadImage(file);
    } catch (error) {
      throw new Error('Failed to save image');
    }
  }

  async deleteImage(imageUrl, provider) {
    const storageProvider = this.storageProviders[provider];
    if (!storageProvider) {
      throw new Error('Invalid storage provider');
    }

    try {
      await storageProvider.deleteImage(imageUrl);
    } catch (error) {
      throw new Error('Failed to delete image');
    }
  }
}

module.exports = ImageService;
