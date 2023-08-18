const mongoose = require('mongoose');

const { db: { mongoUser, mongoPass, mongoDatabase } } = require('config');

mongoose.connect(`mongodb://${mongoUser}:${mongoPass}@localhost:27017/${mongoDatabase}`, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
	.catch(e => {
		console.error('Connection error', e.message)
	});

const db = mongoose.connection;

module.exports = db;
