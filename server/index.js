require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const apiPort = process.env.API_PORT || 3000;
const db = require('./db');
const posts = require('./routes/post.routes');
const users = require('./routes/user.routes');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

app.use('/api', posts);
app.use('/api', users);
// routes for static files
const defaultPath = path.join(process.cwd(), 'uploads');
const uploadsPath = process.env.UPLOADS_PATH ? path.join(process.cwd(), process.env.UPLOADS_PATH) : defaultPath;
app.use('/uploads', express.static(uploadsPath));

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const server = app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
module.exports = server;
