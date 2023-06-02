const mongoose = require('mongoose');

class BaseRepository {
    /**
     * @param {mongoose.Model} model - Mongoose model
     */
    constructor(model) {
        if (!model || !(model.prototype instanceof mongoose.Model)) {
            throw new Error('Invalid model');
        }

        this.model = model;
    }

    /**
     * Fetch all documents from the database
     * @param {number} pageNo - Current page number
     * @param {number} size - Number of documents per page
     * @returns {Promise<Object>} - An object containing the documents array and the total count of documents
     * @throws {Error} - If failed to fetch documents from the database
     */
    async findAll(pageNo = 1, size = 10) {
        try {
            const skip = size * (pageNo - 1);
            const documents = await this.model.find().skip(skip).limit(size).exec();
            const total = await this.count();

            return {
                documents,
                total,
            };
        } catch (error) {
            throw new Error('Failed to fetch documents from the database');
        }
    }

    /**
     * Count the total number of documents
     * @returns {Promise<number>} - The total number of documents
     * @throws {Error} - If failed to count the documents from the database
     */
    async count() {
        try {
            return await this.model.countDocuments();
        } catch (error) {
            throw new Error('Failed to count the documents from the database');
        }
    }

    /**
     * Fetch a document by its ID from the database
     * @param {string} id - The ID of the document
     * @returns {Promise<Object|null>} - The found document or null if not found
     * @throws {Error} - If failed to fetch the document from the database
     */
    async findById(id) {
        try {
            return await this.model.findById(id).exec();
        } catch (error) {
            throw new Error('Failed to fetch the document from the database');
        }
    }

    /**
     * Save a new document to the database
     * @param {Object} documentData - The data of the document to be saved
     * @returns {Promise<Object>} - The newly saved document
     * @throws {Error} - If failed to save the document to the database
     */
    async save(documentData) {
        try {
            const newDocument = new this.model(documentData);
            return await newDocument.save();
        } catch (error) {
            throw new Error('Failed to save the document to the database');
        }
    }

    /**
     * Update a document by its ID
     * @param {string} id - The ID of the document to be updated
     * @param {Object} data - The data to update the document
     * @returns {Promise<Object|null>} - The updated document or null if not found
     * @throws {Error} - If failed to update the document
     */
    async updateById(id, data) {
        try {
            return await this.model.findByIdAndUpdate(id, data, { new: true }).exec();
        } catch (error) {
            throw new Error('Failed to update the document');
        }
    }

    /**
     * Delete a document by its ID from the database
     * @param {string} id - The ID of the document to be deleted
     * @returns {Promise<Object|null>} - The deleted document or null if not found
     * @throws {Error} - If failed to delete the document from the database
     */
    async deleteById(id) {
        try {
            return await this.model.findByIdAndDelete(id).exec();
        } catch (error) {
            throw new Error('Failed to delete the document from the database');
        }
    }
}

module.exports = BaseRepository;
