const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const db = require('./db');
const apiRoutes = require('./routes');
const config = require('./config');
const { errorHandling } = require('./middlewares/errorHandling');

const apiPort = config.app.port;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

app.use('/api', apiRoutes);

app.use(errorHandling);
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
