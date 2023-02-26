const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const db = require('./db');
const posts = require('./routes/post.routes');
const auth = require('./routes/auth.routes');
const image = require('./routes/image.routes');
const helmet = require('helmet');
const morgan = require('morgan');

require('dotenv').config();
const apiPort = process.env.API_PORT;

app.use(helmet());
app.use(morgan("common"))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

app.use('/api', posts);
app.use('/api', auth);
app.use('/api', image);

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
