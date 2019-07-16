const express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');
    //express-session
    //passport
    //passport-local
    //passport-local-mongoose

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
