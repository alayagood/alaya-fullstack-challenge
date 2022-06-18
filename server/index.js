const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const passport = require("./utils/passport");
const app = express();
const db = require("./db");
const usersRoute = require("./routes/user.routes");
const postsRoute = require("./routes/post.routes");

const apiPort = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(passport.initialize());

app.use("/api", postsRoute, usersRoute);

db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
