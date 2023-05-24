const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const apiPort = 3000;
const db = require('./db');
const posts = require('./routes/post.routes');
const users = require('./routes/users.routes');
const passport = require('passport');
const session = require('express-session')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

// pass the passport middleware
app.use(passport.initialize());

// load passport strategies
const localRegisterStrategy = require('./passport/local-register');
const localLoginStrategy = require('./passport/local-login');
passport.use('register', localRegisterStrategy);
passport.use('login', localLoginStrategy);

app.use('/api', posts);
app.use('/auth',users);

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
