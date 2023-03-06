require('dotenv').config();

module.exports = () => {
	const { PORT, DB_PATH } = process.env;

	const port = PORT || 4000;
	const dbPath = DB_PATH;

	return {
		port,
		dbPath,
	};
};
