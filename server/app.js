
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const posts = require('./routes/post.routes');
const users = require('./routes/user.routes')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

app.use('/api/posts', posts);
app.use('/api/users', users);

module.exports = app
