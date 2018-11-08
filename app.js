const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const matchesRouter = require('./src/routes/matches');
const tournamentsRouter = require('./src/routes/tournaments');
const teamRouter = require('./src/routes/teams');
const userRouter = require('./src/routes/users');
const rolesRouter = require('./src/routes/roles');
const session = require('express-session');
const passport = require('passport'), LocalStrategy = require('passport-local').Strategy;
const passportLocalMongoose = require('passport-local-mongoose');
const User = require('./src/models/user');
const MongoStore = require('connect-mongo')(session);

require('dotenv').config();


mongoose.connect(process.env.DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useCreateIndex: true
});
mongoose.set('useFindAndModify', false);

//Auth
app.use(session({
    store: new MongoStore({
        mongooseConnection: mongoose.connection
    }),
    secret: "Tsopa",
    resave: false,
    saveUninitialized: false
}));
app.use(express.urlencoded({ extended: true })); // express body-parser
app.use(passport.initialize());
app.use(passport.session());


passport.use(User.createStrategy());

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser())
//HTTP request logger
app.use(morgan('dev'));

//parse request body
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Cross-origin resource sharing
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', '*');
        return res.status(200).json({});
    }
    next();
});

app.use('/api/matches', matchesRouter);
app.use('/api/tournaments', tournamentsRouter);
app.use('/api/teams', teamRouter);
app.use('/api/user', userRouter);
app.use('/api/roles', rolesRouter);
//test helper
app.use('/test', require("./src/routes/test"));

/* ERROR HANDLING */

//
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

// all errors
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        status: "error",
        message: error.message
    })
});

module.exports = app;
