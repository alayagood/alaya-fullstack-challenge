const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const modelConstants = require("./constants");
const { collectionNames } = modelConstants;

const postSchema = new Schema({
    name: { type: 'String', required: true },
    title: { type: 'String', required: true },
    content: { type: 'String', required: true },
    slug: { type: 'String', required: true },
    cuid: { type: 'String', required: true },
    dateAdded: { type: 'Date', default: Date.now, required: true },
    image: {
        type: {
            label: {type: String, required: true},
            src: {type: String, required: true},
        },
        required: false,
    },
});

module.exports = mongoose.model(collectionNames.POST, postSchema);
