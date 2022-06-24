upload = async (req, res, next) => {
  try {
    console.log(req.files, "files");
    if (!req.files || Object.keys(req.files)?.length <= 0) {
      throw new Error("No images uploaded");
    }
    const response = Object.entries(req.files).map(([name, file]) => ({
      name,
      // url: file.tempFilePath,
      url: "https://cnnespanol.cnn.com/wp-content/uploads/2022/04/220408125025-2-the-simpsons-sound-of-bleeding-gums-exlarge-169-1.jpeg?resize=1024,575",
    }));
    res.json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  upload,
};
