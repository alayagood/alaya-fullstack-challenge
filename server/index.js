const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const apiPort = 3000;

const config = require('./config')();
const db = require('./db')(config);

const posts = require('./routes/post.routes');
const auth = require('./routes/auth.routes');

process.on('uncaughtException', (err, origin) => {
	console.log(err);
});
process.on('unhandledRejection', (reason, promise) => {
	console.log('Unhandled Rejection at:', promise, 'reason:', reason);
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// TODO: Add middleware to add authentication token verification
app.use('/api', posts, auth);

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
