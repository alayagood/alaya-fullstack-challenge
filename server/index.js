require('./init/paths').init();
require('dotenv').config({path: '../.env'});

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const config = require('config');
const db = require('db');
const router = require('routes');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

app.use('/api', router);

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.listen(config.port, () => console.log(`Server running on port ${config.port}`));
