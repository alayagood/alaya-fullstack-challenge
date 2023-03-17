const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./db');
const posts = require('./routes/post');
const auth = require('./routes/auth');

require('dotenv').config();

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', auth);
app.use('/api', posts);

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const apiPort =  process.env.API_PORT || 3000;
app.listen(apiPort, () => console.log(`Server running on port http://localhost:${apiPort}`));
