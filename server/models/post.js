const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String },
    slug: { type: String, required: true },
    cuid: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    dateAdded: { type: Date, default: Date.now, required: true }
});

module.exports = mongoose.model("Post", schema);
