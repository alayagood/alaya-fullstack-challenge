const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const { JWTAuthenticationStrategy } = require('./middleware');
const postRoutes = require('./routes/post.routes');
const authRoutes = require('./routes/auth.routes');

const app = express();
const apiPort = 3000;
const db = require('./db');

passport.use(JWTAuthenticationStrategy);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());

app.use('/api', authRoutes, postRoutes);

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
