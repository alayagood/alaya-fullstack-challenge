const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PhotoType = require("./photo_type.enum");

const photoSchema = new Schema({
  postId: { type: "String", required: true },
  type: { type: "String", enum: Object.values(PhotoType), required: true },
  image: { data: Buffer, contentType: String },
  dateAdded: { type: "Date", default: Date.now, required: true },
});

module.exports = mongoose.model("Photo", photoSchema);
