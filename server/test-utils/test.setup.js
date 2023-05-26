const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables for the test environment
dotenv.config({ path: '.env.test' });

let isConnected = false;

// Function for setting up the test environment
async function setupTestEnvironment(collection = null, id = null) {
    if (isConnected) {
        return;
    }

    // Connect to the test database
    const dbHost = process.env.DB_HOST;
    const dbPort = process.env.DB_PORT;
    const dbName = process.env.DB_NAME;
    const mongoUri = `mongodb://${dbHost}:${dbPort}/${dbName}`;

    try {
        await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
        isConnected = true;

        if (!collection) {
            // Clear all database collections before each test
            const collections = mongoose.connection.collections;
            for (const key in collections) {
                await collections[key].deleteMany({});
            }
        } else if (id) {
            await collection.deleteOne({ _id: id });
        } else {
            await collection.deleteMany({});
        }

        console.log('Test environment set up successfully.');
    } catch (error) {
        console.error('Error setting up test environment:', error);
        throw error;
    }
}

// Function for tearing down the test environment
async function tearDownTestEnvironment() {
    if (!isConnected) {
        return;
    }

    try {
        // Drop the test database and disconnect from MongoDB
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
        isConnected = false;

        console.log('Test environment torn down successfully.');
    } catch (error) {
        console.error('Error tearing down test environment:', error);
        throw error;
    }
}

// Function for deleting a record by ID from a collection
async function deleteRecord(collection, id) {
    if (id) {
        await collection.deleteOne({ _id: id });
    } else {
        await collection.deleteMany({});
    }
}


// Export the setup and teardown functions for the test environment
module.exports = {
    setupTestEnvironment,
    tearDownTestEnvironment,
    deleteRecord,
};
