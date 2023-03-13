const error = (error) => {
	return {
		reason: error,
	};
};

const httpResponse = {
	error,
};

module.exports = httpResponse;