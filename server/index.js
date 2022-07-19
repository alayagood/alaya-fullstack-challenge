require("./module-alias");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const { app: { apiPort } } = require("@configs");
const db = require("@utils/db");
const routes = require("@routes");

// DB
db.connect();

app.use(bodyParser({ limit: "8mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

// Passport middleware
require("@utils/passport")(app);

// Routes
app.use(routes);

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
