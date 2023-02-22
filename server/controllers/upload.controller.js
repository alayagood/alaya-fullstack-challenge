uploadImage = async (req, res) => {
    try {
        res.json({
            src: req.file.path,
            label: req.file.originalname
        });
    } catch (e) {
        // Todo - error handling
        console.log("ERROR", e)
    }
}

module.exports = {
    uploadImage
}
