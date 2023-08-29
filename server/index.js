const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const session = require('express-session');
const db = require('./db');
const config = require('./config');
const passport = require('passport')

const { port } = config;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

//handle sessions
const MongoSessionStore = require('connect-mongo');

//sessions config
app.use( session({ 
    secret:'BenevetyTest',
    resave: false, 
    saveUninitialized: false, 
    cookie: {
        maxAge: 3600000 
    },
    store: MongoSessionStore.create({
        mongoUrl: config.mongo_connection_url
    })
}) );

require('./authentication/passport');
app.use( passport.initialize() );
app.use( passport.session() );

const postsRouter = require('./routes/posts/posts.routes');
const usersRouter = require('./routes/user/users.routes');

//users router
app.use('/api/users', usersRouter);
//posts router
app.use('/api/posts', postsRouter);

//if a non existing route is inserted then a 404 will be send
app.use('*', (req, res, next) => {
    const error = {
        status: 404,
        message: 'Route not found'
    }
    return next(error)  
});

//global error handler
app.use((err, _req, res, _next) => {
    return res
            .status(err.status ?? 500)
            .json(err.message ?? 'Unexpected server error')
});

db.connectDB()
    .then( _ => {
        console.log('Connection to DB successfull');
        app.listen(port, () => {
            console.log(`Server initiated at port: ${port}`)
        })
    }).catch( (e) => {
        console.error(`There has been an error with the database connection: ${e}`)
    })


