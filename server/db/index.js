const mongoose = require('mongoose');

module.exports = (config) => {
	const { dbPath } = config;

	mongoose
		.connect(dbPath, { useNewUrlParser: true, useUnifiedTopology: true })
		.catch((e) => {
			console.error('Connection error', e.message);
		});

	const db = mongoose.connection;

	return db;
};
