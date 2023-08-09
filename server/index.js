const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');
const postsRoutes = require('./routes/post.routes');
const usersRoutes = require('./routes/user.routes');
const path = require('path');
require('dotenv').config();
const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});
const app = express();
const apiPort = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.REACT_APP_API_URL);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use('/api/posts', postsRoutes);
app.use('/api/users', usersRoutes);

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
