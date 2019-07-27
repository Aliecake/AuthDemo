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

app.get('/secret', isLogged, (req, res) => {
    res.render('secret');
});

//=====AUTH ROUTES=======//

app.get('/register', (req, res) => {
    res.render('register');
});

//handle sign up
app.post('/register', (req, res) => {
    User.register(new User({username: req.body.username}), req.body.password, (err, user) => {
        if (err) {
            console.log(err);
            res.redirect('/register');
        } else {
            passport.authenticate('local')(req, res, () => {
                res.redirect('/secret');
            });
        }
    });
});

//====LOGIN===//
app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', passport.authenticate('local', {
    successRedirect: '/secret',
    failureRedirect: '/login'
}), (req, res) => {
    //callback
});

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

function isLogged(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    } else {
        res.redirect('/login');
    }
}
app.listen(3000, () => {
    console.log('Listening on port 3000');
});