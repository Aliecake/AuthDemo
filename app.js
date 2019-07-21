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

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.set('view engine', 'ejs');

//=========ROUTES==========//

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/secret', (req, res) => {
    res.render('secret');
});

//=====AUTH ROUTES=======//

app.get('/register', (req, res) => {
    res.render('register');
});

//handle sign up
app.post('/register', (req, res) => {
    User.create({
        username: req.body.username,
        password: req.body.password
    }, (err, user) => {
        if(err) {
            console.log('Error creating user', err);
        } else {
            console.log('user added to DB', user);
        }
    });
    res.redirect('/secret');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/logout', (req, res) => {
    res.render('logout');
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});