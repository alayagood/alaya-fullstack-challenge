const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const cuid = require('cuid');

const imageSchema = new Schema({
    cuid: { type: 'String', default: cuid, required: true },
    url: { type: 'String', required: true },
    publicId: { type: 'String', required: true },
    post: { type: 'String', required: true },
    user: { type: 'String', required: true },
    dateAdded: { type: 'Date', default: Date.now, required: true },
});

module.exports = mongoose.model('Image', imageSchema);
