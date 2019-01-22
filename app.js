const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const matchesRouter = require('./src/routes/matches');
const tournamentsRouter = require('./src/routes/tournaments');
const teamRouter = require('./src/routes/teams');
const userRouter = require('./src/routes/users');
const session = require('express-session');
const passport = require('passport');
const SteamStrategy = require('passport-steam').Strategy;
const User = require('./src/models/user');
const MongoStore = require('connect-mongo')(session);
const cors = require('cors');
const xmpp = require('simple-xmpp');

require('dotenv').config();

xmpp.connect({
    jid: process.env.XMPP_LOGIN,
    password: process.env.XMPP_PWD,
    host: process.env.XMPP_HOST,
    port: 5222
});

mongoose.connect(process.env.DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useCreateIndex: true
});
mongoose.set('useFindAndModify', false);

//Auth
app.use(session({
    store: new MongoStore({
        mongooseConnection: mongoose.connection,
        stringify: false
    }),
    secret: "Tsopa",
    resave: false,
    saveUninitialized: false
}));

app.use(express.urlencoded({extended: true})); // express body-parser
app.use(passport.initialize());
app.use(passport.session());


passport.use(User.createStrategy());
passport.use(new SteamStrategy({
    returnURL: 'http://localhost:3000/api/user/steam/login/return',
    realm: 'http://localhost:3000/',
    apiKey: process.env.STEAM_API_KEY,
    passReqToCallback: true
}, function (req, identifier, profile, done) {
    if (req.isAuthenticated()) {
        console.log(identifier);
        console.log(profile);
        User.findByIdAndUpdate(req.user._id, {
            openid: identifier,
            accountId: profile._json.steamid
        }, {new: true}, (err, user) => {
            return done(err, user);
        });
    } else {
        User.findOne({openid: identifier}, function (err, user) {
            return done(err, user);
        });
    }
}));

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//HTTP request logger
app.use(morgan('dev'));

//parse request body
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Cross-origin resource sharing
const originsWhitelist = [
    'http://localhost:4200',
    'http://playmaker.gq',
    'http://playmaker.gq:4200'
];

const corsOptions = {
    origin: function (origin, callback) {
        const isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
        callback(null, isWhitelisted);
    },
    credentials: true
};

app.use(cors(corsOptions));

app.use('/api/matches', matchesRouter);
app.use('/api/tournaments', tournamentsRouter);
app.use('/api/teams', teamRouter);
app.use('/api/user', userRouter);
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
