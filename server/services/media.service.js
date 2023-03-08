const cloudinary = require('cloudinary').v2;

configure = function (config) {
	cloudinary.config({
		cloud_name: config.cloudinaryCloudName,
		api_key: config.cloudinaryApiKey,
		api_secret: config.cloudinaryApiSecret,
	});
};

// TODO: Create a logger
upload = async function (file, metadata) {
	try {
		const id = `${Object.values(metadata).join('/')}/${Date.now()}`;
		const response = await cloudinary.uploader.upload(file.tempFilePath, {
			public_id: id,
		});

		return response;
	} catch (error) {
		throw error;
	}
};

module.exports = {
	upload,
	configure,
};
