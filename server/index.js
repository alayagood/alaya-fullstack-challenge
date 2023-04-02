require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser')

const app = express();
const apiPort = 3000;
const db = require('./db');
const posts = require('./routes/post.routes');
const user = require('./routes/auth.routes');

app.use(bodyParser.urlencoded({extended: true}));
app.use(cors({credentials: true, origin: process.env.CLIENT_ORIGIN}));
app.use(bodyParser.json());
app.use(cookieParser())

app.use('/api', posts);
app.use('/api/auth', user);

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));

module.exports = app;
