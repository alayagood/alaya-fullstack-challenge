const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fileupload = require('express-fileupload');
const app = express();

const posts = require('./routes/post.routes');
const auth = require('./routes/auth.routes');
const profile = require('./routes/profile.routes');

const config = require('./config')();
const db = require('./db')(config);

require('./auth');
require('./services/media.service').configure(config);

process.on('uncaughtException', (err, _origin) => {
	console.log(err);
});
process.on('unhandledRejection', (reason, promise) => {
	console.log('Unhandled Rejection at:', promise, 'reason:', reason);
});

app.use(
	fileupload({
		useTempFiles: true,
		tempFileDir: '/tmp',
		abortOnLimit: true,
	})
);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', posts, auth, profile);

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.listen(config.port, () =>
	console.log(`Server running on port ${config.port}`)
);
