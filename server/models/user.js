const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    created: { type: Date, default: Date.now },
    posts: [{ type: Schema.Types.ObjectId, ref: "Post" }]
});

module.exports = mongoose.model("User", schema);
