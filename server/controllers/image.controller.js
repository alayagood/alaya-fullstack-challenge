upload = async (req, res, next) => {
  try {
    console.log(req.files, "files");
    res.send("OK");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  upload,
};
