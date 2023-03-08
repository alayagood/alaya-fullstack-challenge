const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mediaSchema = new Schema({
	cuid: { type: 'String', required: true },
	originalFilename: { type: 'String', required: true },
	key: { type: 'String', required: true },
	url: { type: 'String', required: true },
	postCuid: { type: 'String', required: true },
	dateAdded: { type: 'Date', default: Date.now, required: true },
});

module.exports = mongoose.model('Media', mediaSchema);
