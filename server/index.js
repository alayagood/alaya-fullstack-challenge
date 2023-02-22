const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '.env') })
const app = express();
const apiPort = 3000;
const db = require('./db');
const posts = require('./routes/post.routes');
const upload = require('./routes/upload.routes');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

const base_url = '/api'
app.use(base_url, posts);
app.use(base_url, upload);

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
