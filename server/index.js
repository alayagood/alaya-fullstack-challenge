require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const apiPort = process.env.API_PORT;
const db = require("./db");
const posts = require("./routes/post.routes");
const access = require("./routes/access.routes");

app.use(bodyParser.urlencoded({extended: true}));
app.use(cors({credentials: true, origin: process.env.APP_SERVER}));

app.use(cookieParser());
app.use(bodyParser.json());
app.get("/status", (req, res) => {
  return res.status(200).json({status: "ok"});
});

app.use("/api", posts);
app.use("/api", access);

db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
