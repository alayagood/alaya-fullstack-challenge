const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const apiPort = 3000;
const db = require("./db");
const postRoutes = require("./routes/post.routes");
const userRoutes = require("./routes/user.routes");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

app.use("/api", postRoutes);
app.use("/api", userRoutes);

db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
