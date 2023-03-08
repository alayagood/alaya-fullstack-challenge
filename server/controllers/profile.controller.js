me = async (req, res) => {
	res.status(200).json({
		user: req.user,
		token: req.headers.authorization,
	});
};

module.exports = {
	me,
};
