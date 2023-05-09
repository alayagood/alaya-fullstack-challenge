const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const imageSchema = new Schema({
  path: {type: "String", required: true},
  dateAdded: {type: "Date", default: Date.now, required: true},
  user: {type: Schema.Types.ObjectId, ref: "Author", required: true},
});

module.exports = mongoose.model("Image", imageSchema);
