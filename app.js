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

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/secret', (req, res) =>{
    res.render('secret');
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});