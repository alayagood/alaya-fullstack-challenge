const Multer = require("multer");

const storage = new Multer.memoryStorage();


module.exports.upload = Multer({
    storage,
});