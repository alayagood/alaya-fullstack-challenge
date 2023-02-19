const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const apiPort = 3000;
const db = require('./db');
const posts = require('./routes/post.routes');
const users = require('./routes/user.routes');

require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

app.use('/api', posts);
app.use('/api', users);

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// 500 Internal Errors
app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        error: err.message
    })
})
app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));