const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const db = require('./db');
const posts = require('./routes/post.routes');
const auth = require('./routes/auth.routes');
require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use('/api/auth', auth);
app.use('/api/posts', posts);

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
