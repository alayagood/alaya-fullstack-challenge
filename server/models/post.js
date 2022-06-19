const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  owner: { type: mongoose.SchemaTypes.ObjectId, ref: "User", required: true },
  title: { type: "String", required: true },
  content: { type: "String", required: true },
  slug: { type: "String", required: true },
  cuid: { type: "String", required: true },
  images: { type: "String" },
  coverImage: { type: "String" },
  dateAdded: { type: "Date", default: Date.now, required: true },
});

PostSchema.post("save", function (doc, next) {
  doc.populate("owner").then(function () {
    next();
  });
});

module.exports = mongoose.model("Post", PostSchema);
