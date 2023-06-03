const GCSProvider = require('../providers/gcs.provider');
const AWSProvider = require('../providers/aws.provider');
const LocalProvider = require('../providers/local.provider');
const CloudinaryProvider = require('../providers/cloudinary.provider');
require('dotenv').config();
/**
 * Factory class for creating image storage providers.
 */
class ImageStorageFactory {
    /**
     * Create an image storage provider based on the provided name.
     * @param {string} providerName - The name of the storage provider.
     * @returns {Object} - The image storage provider instance.
     * @throws {Error} - If the storage provider is invalid.
     */
    static createProvider(providerName) {
        if (providerName === 'default') {
            providerName = process.env.DEFAULT_IMAGE || 'local';
        }
        switch (providerName) {
            case 'gcs':
                return new GCSProvider();
            case 'aws':
                return new AWSProvider();
            case 'local':
                return new LocalProvider();
            case 'cloudinary':
                return new CloudinaryProvider();
            default:
                throw new Error('Invalid storage provider');
        }
    }
}

module.exports = ImageStorageFactory;
