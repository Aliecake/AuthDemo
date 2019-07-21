const express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    passportLocalMongoose = require('passport-local-mongoose'),
    User = require('./models/user');

mongoose.connect('mongodb://localhost/auth_demo', {useNewUrlParser: true});

app.use(require('express-session')({
    secret: "Lily is the best cat",
    resave: false,
    saveUninitialized: false
}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());

app.set('view engine', 'ejs');

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/secret', (req, res) =>{
    res.render('secret');
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});