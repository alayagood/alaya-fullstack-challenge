const GCSProvider = require('./services/providers/gcsProvider');
const AWSProvider = require('./services/providers/awsProvider');
const LocalProvider = require('./services/providers/localProvider');

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
      const imageUrl = await storageProvider.uploadImage(file);
      return imageUrl;
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
