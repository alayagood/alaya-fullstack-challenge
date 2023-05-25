const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const db = require('./db');
const postsRoute = require('./routes/post.routes');
const userRoutes = require('./routes/user.routes');
const secureRoute = require('./routes/secure-routes');
require('./middlewares/auth');

const app = express();
const apiPort = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

app.use('/api', postsRoute);
app.use('/api/user', userRoutes);

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({ error: err });
});

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
