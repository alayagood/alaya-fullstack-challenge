const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const fileUpload = require("express-fileupload");
const passport = require("./utils/passport");
const app = express();
const db = require("./db");
const usersRoute = require("./routes/user.routes");
const postsRoute = require("./routes/post.routes");
const imagesRoute = require("./routes/images.routes");

const apiPort = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(fileUpload({ useTempFiles: true }));
app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(passport.initialize());

app.use("/api", postsRoute, usersRoute, imagesRoute);

db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
