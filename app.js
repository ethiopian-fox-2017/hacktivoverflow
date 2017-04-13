const express           = require('express');
const bodyParser        = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/hacktivoverflow');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

var index = require('./routes/index');
var question = require('./routes/question');
var answer = require('./routes/answer');

app.use('/', index);
app.use('/question', question);
app.use('/answer', answer);

// app.use('/', (req,res,next) => {
//     res.send('hello');
// })

app.listen(3000);