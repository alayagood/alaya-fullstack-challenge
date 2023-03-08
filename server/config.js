require('dotenv').config();

module.exports = () => {
	const { PORT, DB_PATH } = process.env;

	const port = PORT || 3000;
	const dbPath = DB_PATH;

	return {
		port,
		dbPath,
		cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
		cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
		cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
		jwtSecretKey: process.env.JWT_SECRET_KEY,
	};
};
