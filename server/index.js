const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
const apiPort = 3000;
const db = require('./db');
const posts = require('./routes/post.routes');
const user = require('./routes/user.routes');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:8000'
  ],
  credentials: true,
  exposedHeaders: ['set-cookie']
}));
app.use(cookieParser());
app.use(bodyParser.json());

app.use('/api', posts);
app.use('/user', user);

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
