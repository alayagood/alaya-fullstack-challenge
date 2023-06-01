const multer = require('multer');

const storage = multer.diskStorage({});

// Create the Multer instance
const upload = multer({ storage });

module.exports = { upload };