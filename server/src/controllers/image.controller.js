addImage = async (req, res) => {
    if (!req.file?.path) {
        res.status(500).send("Unable to upload file");
        return;
    }

    res.json({
        image: req.file.path,
    });
}

module.exports = {
    addImage
}
