const Photo = require("../models/photo");
const Post = require("../models/post");
const PhotoType = require("../models/photo_type.enum");
const fs = require("fs");
const path = require("path");

getPhotos = async (req, res) => {
  const postId = req.params.cuid;

  const profilePhotos = await Photo.find({ postId, type: PhotoType.profile })
    .sort("-dateAdded")
    .limit(1);

  const mainPhotos = await Photo.find({ postId, type: PhotoType.main })
    .sort("-dateAdded")
    .limit(1);

  res
    .status(200)
    .json({ profilePhoto: profilePhotos[0], mainPhoto: mainPhotos[0] });
};

addPhoto = async (req, res) => {
  if (!(await isValidInput(req, res))) {
    return;
  }

  const filepath = path.join(
    __dirname + "/../uploads/" + req.file.originalname
  );

  const newPhoto = new Photo({
    postId: req.params.cuid,
    type: req.body.type,
    image: {
      data: fs.readFileSync(filepath),
      contentType: "image/png",
    },
  });

  newPhoto.save((err, saved) => {
    if (err) {
      return res.status(500).send(err);
    }

    removeFile(filepath);

    res.status(200).json({ saved: true });
  });
};

isValidInput = async (req, res) => {
  const post = await Post.findOne({ cuid: req.params.cuid });
  if (!post) {
    res.status(400).json({ message: "Invalid post ID" });
    return false;
  }

  if (!Object.values(PhotoType).includes(req.body.type)) {
    res.status(400).json({ message: "Invalid type for image" });
    return false;
  }

  if (!req.file) {
    res.status(400).json({ message: "Image must be provided" });
    return false;
  }

  return true;
};

removeFile = async (filepath) => {
  fs.unlink(filepath, (err) => {
    if (err) {
      // We could send an error to an APM / error monitoring tool
      console.error(err);
      return;
    }
  });
};

module.exports = {
  getPhotos,
  addPhoto,
};
