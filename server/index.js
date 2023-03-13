require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const db = require('./db');
const postsRoutes = require('./routes/post.routes');
const userRoutes = require('./routes/user.routes');
const authRoutes = require('./routes/auth.routes');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

app.use('/api', postsRoutes);
app.use('/api', userRoutes);
app.use('/api', authRoutes);

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.listen(process.env.API_PORT, () => console.log(`Server running on port ${process.env.API_PORT}`));
