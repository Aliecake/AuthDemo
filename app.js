const express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    passportLocalMongoose = require('passport-local-mongoose');

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost/auth_demo', {useNewUrlParser: true});

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/secret', (req, res) =>{
    res.render('secret');
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});